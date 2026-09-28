"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CvPreview } from "@/components/cv/CvPreview";
import { track } from "@/lib/analytics";
import { cvSchema, emptyCv, type CV } from "@/lib/cv/schema";
import { slugifyFileName } from "@/lib/cv/text";
import { sectionOf, validateCv } from "@/lib/cv/validation";
import { clearDraft, draftToJson, loadDraft, parseDraft, saveDraft } from "@/lib/storage/draft";
import { DEFAULT_TEMPLATE, getTemplateInfo, isTemplateId, type TemplateId } from "@/lib/templates/registry";
import { buttonClass } from "@/lib/ui";
import { ConfirmDialog } from "./ConfirmDialog";
import { fieldId } from "./fields";
import { Icon } from "./icons";
import { SectionPanel } from "./SectionPanel";
import { TemplatePicker } from "./TemplatePicker";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PersonalSection } from "./sections/PersonalSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ReferencesSection } from "./sections/ReferencesSection";
import { SkillsSection } from "./sections/SkillsSection";
import { SummarySection } from "./sections/SummarySection";
import type { SectionProps } from "./sections/types";

type SaveState = "idle" | "saved" | "failed" | "unavailable";
type Pending = { kind: "new" } | { kind: "replace"; cv: CV; templateId: TemplateId; message: string } | null;

const count = (n: number, one: string, many: string) => (n === 0 ? "" : `${n} ${n === 1 ? one : many}`);

const SECTIONS: { id: string; title: string; status: (cv: CV) => string; Component: (p: SectionProps & { photoSupported: boolean }) => React.ReactNode }[] = [
  { id: "personal", title: "Personal details", status: (cv) => (cv.personal.fullName ? "Started" : ""), Component: PersonalSection },
  { id: "summary", title: "Professional summary", status: (cv) => (cv.summary.trim() ? "Added" : ""), Component: SummarySection },
  { id: "experience", title: "Work experience", status: (cv) => count(cv.experience.length, "entry", "entries"), Component: ExperienceSection },
  { id: "education", title: "Education", status: (cv) => count(cv.education.length, "entry", "entries"), Component: EducationSection },
  { id: "skills", title: "Skills", status: (cv) => count(cv.skills.length, "skill", "skills"), Component: SkillsSection },
  { id: "projects", title: "Projects", status: (cv) => count(cv.projects.length, "project", "projects"), Component: ProjectsSection },
  { id: "certifications", title: "Certifications", status: (cv) => count(cv.certifications.length, "certification", "certifications"), Component: CertificationsSection },
  { id: "languages", title: "Languages", status: (cv) => count(cv.languages.length, "language", "languages"), Component: LanguagesSection },
  {
    id: "references",
    title: "References",
    status: (cv) => (cv.referencesOnRequest ? "On request" : count(cv.references.length, "referee", "referees")),
    Component: ReferencesSection,
  },
];

export function Builder() {
  const [ready, setReady] = useState(false);
  const [cv, setCv] = useState<CV>(emptyCv);
  const [templateId, setTemplateId] = useState<TemplateId>(DEFAULT_TEMPLATE);
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set(["personal"]));
  const [touched, setTouched] = useState<Set<string>>(() => new Set());
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState<{ tone: "info" | "error" | "success"; text: string } | null>(null);
  const [pending, setPending] = useState<Pending>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reveal, setReveal] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  // ---- Load the saved draft (and handle ?template= / ?example= links) ----
  // Runs once after mount: localStorage isn't available during server rendering.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const result = loadDraft();
    let initialCv = emptyCv();
    let initialTemplate: TemplateId = DEFAULT_TEMPLATE;
    if (result.status === "loaded" || result.status === "recovered") {
      initialCv = result.draft.cv;
      initialTemplate = result.draft.templateId;
      if (result.status === "recovered") setMessage({ tone: "info", text: "Some saved details couldn't be read and were reset. Please check your CV." });
    }
    if (result.status === "unavailable") setSaveState("unavailable");

    const params = new URLSearchParams(window.location.search);
    const t = params.get("template");
    if (isTemplateId(t)) initialTemplate = t;
    const example = params.get("example");
    if (params.has("template") || params.has("example")) window.history.replaceState(null, "", window.location.pathname);

    setCv(initialCv);
    setTemplateId(initialTemplate);
    setReady(true);
    track("builder_started", { returning: result.status === "loaded" });

    if (example) {
      import("@/lib/examples").then(({ getExample }) => {
        const ex = getExample(example);
        if (!ex) return;
        const hasWork = JSON.stringify(initialCv) !== JSON.stringify(emptyCv());
        if (hasWork) {
          setPending({ kind: "replace", cv: ex.cv, templateId: isTemplateId(t) ? t : ex.templateId, message: `Replace your current CV with the “${ex.title}” example? Your current CV will be lost unless you save a backup first.` });
        } else {
          setCv(ex.cv);
          setTemplateId(isTemplateId(t) ? t : ex.templateId);
          setOpenSections(new Set(["personal"]));
          setMessage({ tone: "info", text: `Loaded the “${ex.title}” example. Replace the details with your own.` });
          track("example_loaded", { example });
        }
      });
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // ---- Autosave (debounced) ----
  useEffect(() => {
    if (!ready || saveState === "unavailable") return;
    const timer = setTimeout(() => setSaveState(saveDraft(cv, templateId) ? "saved" : "failed"), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cv, templateId, ready]);

  // Save immediately if the page is being hidden/closed mid-debounce.
  useEffect(() => {
    if (!ready) return;
    const flush = () => saveDraft(cv, templateId);
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [cv, templateId, ready]);

  const update = useCallback((patch: Partial<CV>) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("cv_started");
    }
    setCv((c) => ({ ...c, ...patch }));
  }, []);

  const errors = useMemo(() => validateCv(cv, { forExport: showAllErrors }), [cv, showAllErrors]);
  const touch = useCallback((path: string) => setTouched((t) => (t.has(path) ? t : new Set(t).add(path))), []);
  const err = useCallback((path: string) => (showAllErrors || touched.has(path) ? errors[path] : undefined), [errors, showAllErrors, touched]);
  const sectionsWithErrors = useMemo(() => new Set(Object.keys(errors).filter((p) => showAllErrors || touched.has(p)).map(sectionOf)), [errors, showAllErrors, touched]);

  const toggleSection = (id: string) =>
    setOpenSections((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const chooseTemplate = (id: TemplateId) => {
    setTemplateId(id);
    track("template_selected", { template: id });
  };

  // ---- PDF export ----
  const download = async () => {
    const all = validateCv(cv, { forExport: true });
    const paths = Object.keys(all);
    if (paths.length > 0) {
      setShowAllErrors(true);
      setView("edit");
      const first = paths[0];
      setOpenSections((s) => new Set(s).add(sectionOf(first)));
      setMessage({ tone: "error", text: `Please fix ${paths.length === 1 ? "1 problem" : `${paths.length} problems`} before downloading. ${all[first]}` });
      // Open the section and entry containing the field, then focus it.
      setReveal(first.split(".")[1]);
      setTimeout(() => {
        const el = document.getElementById(fieldId(first));
        el?.focus();
        el?.scrollIntoView({ block: "center" });
      }, 50);
      return;
    }
    setExporting(true);
    setMessage(null);
    try {
      const { generatePdfBlob, downloadBlob } = await import("@/lib/pdf/generate");
      const blob = await generatePdfBlob(cv, templateId);
      downloadBlob(blob, slugifyFileName(cv.personal.fullName));
      setMessage({ tone: "success", text: "Your CV has been downloaded as a PDF." });
      track("pdf_exported", { template: templateId });
    } catch {
      setMessage({
        tone: "error",
        text: "We couldn't create your PDF. Check your internet connection and try again. If it keeps failing, try another template or browser.",
      });
      track("pdf_export_failed", { template: templateId });
    } finally {
      setExporting(false);
    }
  };

  const prefetchPdf = () => void import("@/lib/pdf/generate").catch(() => {});

  // ---- New CV / backups ----
  const confirmPending = () => {
    if (!pending) return;
    if (pending.kind === "new") {
      clearDraft();
      setCv(emptyCv());
      setMessage({ tone: "info", text: "Started a new CV." });
    } else {
      setCv(pending.cv);
      setTemplateId(pending.templateId);
      setMessage({ tone: "info", text: "CV replaced." });
    }
    setTouched(new Set());
    setShowAllErrors(false);
    setOpenSections(new Set(["personal"]));
    setPending(null);
  };

  const saveBackup = async () => {
    setMenuOpen(false);
    const { downloadBlob } = await import("@/lib/pdf/generate");
    downloadBlob(new Blob([draftToJson(cv, templateId)], { type: "application/json" }), slugifyFileName(cv.personal.fullName).replace(/\.pdf$/, "-backup.json"));
  };

  const openBackup = async (file: File) => {
    try {
      const parsed = parseDraft(JSON.parse(await file.text()));
      if (!parsed || !cvSchema.safeParse(parsed.draft.cv).success) throw new Error("invalid");
      setPending({ kind: "replace", cv: parsed.draft.cv, templateId: parsed.draft.templateId, message: "Replace your current CV with the one from this backup file?" });
    } catch {
      setMessage({ tone: "error", text: "That file isn't a Ghana CV Builder backup. Choose the .json file you saved earlier." });
    }
  };

  const templateInfo = getTemplateInfo(templateId);
  const saveLabel: Record<SaveState, string> = {
    idle: "",
    saved: "Saved on this device",
    failed: "Couldn't save — storage may be full",
    unavailable: "Not saved — your browser is blocking storage",
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-4">
          <Link href="/" aria-label="Ghana CV Builder home" className="flex items-center gap-2 font-semibold text-slate-900">
            <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-md bg-brand-700 text-xs font-bold text-white">
              CV
            </span>
            <span className="hidden sm:inline">Ghana CV Builder</span>
          </Link>
          <p className="min-w-0 truncate text-xs text-slate-600 sm:text-sm" aria-live="polite">
            {saveState === "failed" || saveState === "unavailable" ? <span className="text-red-700">{saveLabel[saveState]}</span> : saveLabel[saveState]}
          </p>
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              className={buttonClass("ghost", "sm")}
              aria-expanded={menuOpen}
              aria-controls="builder-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              Menu
            </button>
            {menuOpen && (
              <div id="builder-menu" className="absolute top-full right-0 mt-2 w-60 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                <button type="button" className="block w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-slate-100" onClick={() => { setMenuOpen(false); setPending({ kind: "new" }); }}>
                  Start a new CV
                </button>
                <button type="button" className="block w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-slate-100" onClick={saveBackup}>
                  Save backup file
                </button>
                <button type="button" className="block w-full rounded-md px-3 py-2.5 text-left text-sm hover:bg-slate-100" onClick={() => { setMenuOpen(false); fileRef.current?.click(); }}>
                  Open backup file
                </button>
                <p className="px-3 pt-1 pb-2 text-xs leading-relaxed text-slate-600">Backups let you move your CV to another phone or computer.</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) void openBackup(f);
              }}
            />
            <button type="button" className={buttonClass("primary", "sm", "max-lg:hidden")} onClick={download} onPointerEnter={prefetchPdf} onFocus={prefetchPdf} disabled={!ready || exporting}>
              <Icon name="download" className="size-4" />
              {exporting ? "Preparing PDF…" : "Download PDF"}
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div
          role={message.tone === "error" ? "alert" : "status"}
          className={`border-b px-4 py-3 text-sm ${
            message.tone === "error" ? "border-red-200 bg-red-50 text-red-800" : message.tone === "success" ? "border-brand-200 bg-brand-50 text-brand-900" : "border-slate-200 bg-white text-slate-700"
          }`}
        >
          <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-3">
            <p>{message.text}</p>
            <button type="button" className="shrink-0 text-sm font-medium underline" onClick={() => setMessage(null)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-6 px-3 pt-4 pb-28 sm:px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:pb-8">
        <h1 className="sr-only">Create your CV</h1>
        {/* Editor */}
        <div className={`${view === "preview" ? "hidden lg:block" : ""}`}>
          {!ready ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500" role="status">
              Loading your CV…
            </div>
          ) : (
            <div className="space-y-3">
              {SECTIONS.map(({ id, title, status, Component }) => (
                <SectionPanel key={id} id={id} title={title} status={status(cv)} open={openSections.has(id)} onToggle={() => toggleSection(id)} hasError={sectionsWithErrors.has(id)}>
                  <Component cv={cv} update={update} err={err} touch={touch} reveal={reveal} photoSupported={templateInfo.supportsPhoto} />
                </SectionPanel>
              ))}
              <p className="px-1 pt-2 text-xs leading-relaxed text-slate-600">
                Your CV is saved in this browser only and is never uploaded. Clearing your browser data will remove it — use Menu → Save backup file to keep a copy.
              </p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className={`${view === "edit" ? "hidden lg:block" : ""}`}>
          <div className="lg:sticky lg:top-18">
            <div className="mb-3 flex flex-col gap-2">
              <h2 className="text-sm font-semibold text-slate-700">Template</h2>
              <TemplatePicker value={templateId} onChange={chooseTemplate} />
              <p className="text-xs text-slate-600">{templateInfo.tagline}</p>
            </div>
            {/* Focusable so keyboard users can scroll the preview on desktop. */}
            <div tabIndex={0} role="region" aria-label="CV preview area" className="lg:max-h-[calc(100dvh-11rem)] lg:overflow-y-auto lg:rounded-lg lg:bg-slate-200/60 lg:p-4">
              {ready ? <CvPreview cv={cv} templateId={templateId} /> : null}
            </div>
            <p className="mt-2 text-xs text-slate-600">The PDF may move a heading or entry to the next page to avoid awkward breaks.</p>
          </div>
        </div>
      </main>

      {/* Mobile action bar */}
      <nav aria-label="Builder" className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="flex items-center gap-2">
          <div className="grid flex-1 grid-cols-2 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Edit or preview">
            {(["edit", "preview"] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                className={`min-h-10 rounded-md text-sm font-semibold ${view === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"}`}
                onClick={() => {
                  setView(v);
                  window.scrollTo({ top: 0 });
                  if (v === "preview") track("preview_opened");
                }}
              >
                {v === "edit" ? "Edit" : "Preview"}
              </button>
            ))}
          </div>
          <button type="button" className={buttonClass("primary", "md")} onClick={download} onTouchStart={prefetchPdf} disabled={!ready || exporting}>
            <Icon name="download" className="size-4" />
            {exporting ? "Preparing…" : "PDF"}
          </button>
        </div>
      </nav>

      <ConfirmDialog
        open={pending !== null}
        title={pending?.kind === "new" ? "Start a new CV?" : "Replace your CV?"}
        message={pending?.kind === "new" ? "This clears everything you've entered on this device. Save a backup first if you might need it again." : pending?.message ?? ""}
        confirmLabel={pending?.kind === "new" ? "Clear and start again" : "Replace"}
        onConfirm={confirmPending}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
