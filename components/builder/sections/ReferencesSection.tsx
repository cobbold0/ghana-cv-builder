"use client";

import { LIMITS, newEntry } from "@/lib/cv/schema";
import { EntryList } from "../EntryList";
import { Checkbox, TextField } from "../fields";
import type { SectionProps } from "./types";

export function ReferencesSection({ cv, update, err, touch, reveal }: SectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        References are optional. Always ask people before listing them, and follow the job advert if it asks for a specific number of referees.
      </p>
      <Checkbox
        id="references-on-request"
        label="Just write “References available on request”"
        checked={cv.referencesOnRequest}
        onChange={(referencesOnRequest) => update({ referencesOnRequest })}
      />
      {!cv.referencesOnRequest && (
        <EntryList
          reveal={reveal}
          items={cv.references}
          onChange={(references) => update({ references })}
          create={newEntry.references}
          max={LIMITS.references}
          noun="referee"
          addLabel="Add referee"
          emptyText="No referees added. The References section is hidden from your CV unless you add one or tick the box above."
          summarize={(r) => ({ title: r.name, subtitle: [r.position, r.organization].filter(Boolean).join(", ") })}
          renderItem={(r, set) => {
            const path = (k: string) => `references.${r.id}.${k}`;
            return (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField path={path("name")} label="Name" value={r.name} onChange={(name) => set({ name })} maxLength={LIMITS.short} className="sm:col-span-2" />
                <TextField path={path("position")} label="Position" optional value={r.position} onChange={(position) => set({ position })} maxLength={LIMITS.short} placeholder="e.g. Head of Department" />
                <TextField path={path("organization")} label="Organisation" optional value={r.organization} onChange={(organization) => set({ organization })} maxLength={LIMITS.short} />
                <TextField path={path("phone")} label="Phone" optional type="tel" inputMode="tel" value={r.phone} onChange={(phone) => set({ phone })} onBlur={() => touch(path("phone"))} error={err(path("phone"))} maxLength={LIMITS.phone} />
                <TextField path={path("email")} label="Email" optional type="email" inputMode="email" value={r.email} onChange={(email) => set({ email })} onBlur={() => touch(path("email"))} error={err(path("email"))} maxLength={LIMITS.email} />
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
