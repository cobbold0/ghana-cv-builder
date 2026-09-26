"use client";

import { LIMITS, newEntry } from "@/lib/cv/schema";
import { formatDateRange } from "@/lib/cv/dates";
import { EntryList } from "../EntryList";
import { MonthYearField, TextArea, TextField } from "../fields";
import type { SectionProps } from "./types";

export function EducationSection({ cv, update, err, touch, reveal }: SectionProps) {
  return (
    <EntryList
      reveal={reveal}
      items={cv.education}
      onChange={(education) => update({ education })}
      create={newEntry.education}
      max={LIMITS.education}
      noun="qualification"
      addLabel="Add education"
      emptyText="Add your university, college or senior high school. Start with the most recent."
      summarize={(e) => ({
        title: [e.degree, e.institution].filter(Boolean).join(" · "),
        subtitle: formatDateRange(e.startDate, e.endDate),
      })}
      renderItem={(e, set) => {
        const path = (k: string) => `education.${e.id}.${k}`;
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField path={path("institution")} label="School, college or university" value={e.institution} onChange={(institution) => set({ institution })} maxLength={LIMITS.short} placeholder="e.g. KNUST" className="sm:col-span-2" />
            <TextField path={path("degree")} label="Degree or certificate" value={e.degree} onChange={(degree) => set({ degree })} maxLength={LIMITS.short} placeholder="e.g. BSc, HND, WASSCE" />
            <TextField path={path("field")} label="Field of study" optional value={e.field} onChange={(field) => set({ field })} maxLength={LIMITS.short} placeholder="e.g. Computer Science" />
            <TextField path={path("location")} label="Location" optional value={e.location} onChange={(location) => set({ location })} maxLength={LIMITS.short} className="sm:col-span-2" />
            <MonthYearField path={path("startDate")} label="Start date" optional value={e.startDate} onChange={(startDate) => { set({ startDate }); touch(path("endDate")); }} error={err(path("startDate"))} />
            <MonthYearField path={path("endDate")} label="End date (or expected)" optional value={e.endDate} onChange={(endDate) => { set({ endDate }); touch(path("endDate")); }} error={err(path("endDate"))} />
            <TextArea
              path={path("description")}
              label="Details"
              optional
              value={e.description}
              onChange={(description) => set({ description })}
              maxLength={LIMITS.description}
              rows={3}
              hint="Class of degree, relevant courses, project title, awards or leadership roles."
              className="sm:col-span-2"
            />
          </div>
        );
      }}
    />
  );
}
