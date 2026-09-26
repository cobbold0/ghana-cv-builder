"use client";

import { LIMITS, newEntry } from "@/lib/cv/schema";
import { formatDateRange } from "@/lib/cv/dates";
import { EntryList } from "../EntryList";
import { Checkbox, MonthYearField, TextArea, TextField } from "../fields";
import type { SectionProps } from "./types";

export function ExperienceSection({ cv, update, err, touch, reveal }: SectionProps) {
  return (
    <EntryList
      reveal={reveal}
      items={cv.experience}
      onChange={(experience) => update({ experience })}
      create={newEntry.experience}
      max={LIMITS.experience}
      noun="position"
      addLabel="Add experience"
      emptyText="Add jobs, national service, internships, attachments or volunteering. Start with the most recent."
      summarize={(e) => ({
        title: [e.position, e.company].filter(Boolean).join(" · "),
        subtitle: formatDateRange(e.startDate, e.endDate, e.current),
      })}
      renderItem={(e, set) => {
        const path = (k: string) => `experience.${e.id}.${k}`;
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField path={path("position")} label="Job title" value={e.position} onChange={(position) => set({ position })} maxLength={LIMITS.short} placeholder="e.g. Customer Service Officer" />
            <TextField path={path("company")} label="Company or organisation" value={e.company} onChange={(company) => set({ company })} maxLength={LIMITS.short} />
            <TextField path={path("location")} label="Location" optional value={e.location} onChange={(location) => set({ location })} maxLength={LIMITS.short} placeholder="e.g. Takoradi" className="sm:col-span-2" />
            <MonthYearField path={path("startDate")} label="Start date" value={e.startDate} onChange={(startDate) => { set({ startDate }); touch(path("endDate")); }} error={err(path("startDate"))} />
            <div>
              <MonthYearField path={path("endDate")} label="End date" value={e.current ? "" : e.endDate} disabled={e.current} onChange={(endDate) => { set({ endDate }); touch(path("endDate")); }} error={e.current ? undefined : err(path("endDate"))} />
              <div className="mt-2">
                <Checkbox id={`${path("current")}`} label="I currently work here" checked={e.current} onChange={(current) => set({ current })} />
              </div>
            </div>
            <TextArea
              path={path("description")}
              label="Description"
              optional
              value={e.description}
              onChange={(description) => set({ description })}
              maxLength={LIMITS.description}
              rows={2}
              hint="One or two sentences about the role or organisation, if it helps."
              className="sm:col-span-2"
            />
            <TextArea
              path={path("highlights")}
              label="Achievements and responsibilities"
              optional
              value={e.highlights}
              onChange={(highlights) => set({ highlights })}
              maxLength={LIMITS.highlights}
              rows={5}
              placeholder={"Handled 40+ customer enquiries a day by phone and in person\nTrained three new staff on the point-of-sale system"}
              hint="One per line. Each line becomes a bullet point. Start with an action word and include numbers where you honestly can."
              className="sm:col-span-2"
            />
          </div>
        );
      }}
    />
  );
}
