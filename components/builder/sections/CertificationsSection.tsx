"use client";

import { LIMITS, newEntry } from "@/lib/cv/schema";
import { formatCvDate } from "@/lib/cv/dates";
import { EntryList } from "../EntryList";
import { MonthYearField, TextField } from "../fields";
import type { SectionProps } from "./types";

export function CertificationsSection({ cv, update, err, touch, reveal }: SectionProps) {
  return (
    <EntryList
      reveal={reveal}
      items={cv.certifications}
      onChange={(certifications) => update({ certifications })}
      create={newEntry.certifications}
      max={LIMITS.certifications}
      noun="certification"
      addLabel="Add certification"
      emptyText="Professional certificates, licences and short courses, e.g. ICAG, CIMA, Cisco CCNA or a Coursera certificate."
      summarize={(c) => ({ title: c.name, subtitle: [c.issuer, formatCvDate(c.date)].filter(Boolean).join(" · ") })}
      renderItem={(c, set) => {
        const path = (k: string) => `certifications.${c.id}.${k}`;
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField path={path("name")} label="Certification name" value={c.name} onChange={(name) => set({ name })} maxLength={LIMITS.short} className="sm:col-span-2" />
            <TextField path={path("issuer")} label="Issued by" optional value={c.issuer} onChange={(issuer) => set({ issuer })} maxLength={LIMITS.short} />
            <MonthYearField path={path("date")} label="Date" optional value={c.date} onChange={(date) => set({ date })} error={err(path("date"))} />
            <TextField path={path("url")} label="Credential link" optional type="url" inputMode="url" value={c.url} onChange={(url) => set({ url })} onBlur={() => touch(path("url"))} error={err(path("url"))} maxLength={LIMITS.url} className="sm:col-span-2" />
          </div>
        );
      }}
    />
  );
}
