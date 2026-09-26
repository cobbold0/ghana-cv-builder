"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { htmlPrimitives } from "@/components/templates/html-primitives";
import { A4 } from "@/components/templates/primitives";
import type { CV } from "@/lib/cv/schema";
import { normalizeCv } from "@/lib/cv/normalize";
import type { TemplateId } from "@/lib/templates/registry";

const PX_PER_PT = 96 / 72;
const PAGE_W = A4.width * PX_PER_PT;
const PAGE_H = A4.height * PX_PER_PT;

/**
 * Live HTML preview scaled to fit its container. Page boundaries are drawn
 * every A4 height; the downloaded PDF may move a heading or entry to the
 * next page to avoid awkward breaks.
 */
export function CvPreview({ cv, templateId }: { cv: CV; templateId: TemplateId }) {
  const deferred = useDeferredValue(cv);
  const data = useMemo(() => normalizeCv(deferred), [deferred]);
  const Template = TEMPLATE_COMPONENTS[templateId];

  const outerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    const page = pageRef.current;
    if (!outer || !page) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, outer.clientWidth / PAGE_W));
      // Measure the natural content height (without our min-height padding).
      const inner = page.firstElementChild as HTMLElement | null;
      const h = inner ? inner.scrollHeight : PAGE_H;
      setPages(Math.max(1, Math.ceil((h - 2) / PAGE_H)));
    });
    ro.observe(outer);
    ro.observe(page.firstElementChild ?? page);
    return () => ro.disconnect();
  }, [templateId]);

  return (
    <div ref={outerRef} className="w-full">
      <div
        className="relative mx-auto"
        style={{ width: PAGE_W * scale, height: pages * PAGE_H * scale, visibility: scale ? "visible" : "hidden" }}
      >
        <div
          ref={pageRef}
          className="absolute top-0 left-0 origin-top-left bg-white shadow-[0_1px_3px_rgba(15,23,42,0.12),0_8px_24px_rgba(15,23,42,0.08)]"
          style={{ width: PAGE_W, minHeight: pages * PAGE_H, transform: `scale(${scale})` }}
          aria-label="CV preview"
          role="img"
        >
          <div style={{ minHeight: PAGE_H }} className="[&>.cv-page]:min-h-0!">
            <Template cv={data} p={htmlPrimitives} />
          </div>
          {Array.from({ length: pages - 1 }, (_, i) => (
            <div key={i} className="pointer-events-none absolute right-0 left-0" style={{ top: (i + 1) * PAGE_H }} aria-hidden="true">
              <div className="border-t-2 border-dashed border-slate-300" />
              <span className="absolute top-1 right-2 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                Page {i + 2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
