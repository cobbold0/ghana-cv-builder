"use client";

import { LANGUAGE_LEVELS, LIMITS, newEntry, type LanguageLevel } from "@/lib/cv/schema";
import { LANGUAGE_LEVEL_LABELS } from "@/lib/cv/normalize";
import { RowList } from "../EntryList";
import { SelectField, TextField } from "../fields";
import type { SectionProps } from "./types";

const options = LANGUAGE_LEVELS.map((v) => ({ value: v, label: v ? LANGUAGE_LEVEL_LABELS[v] : "No level" }));

export function LanguagesSection({ cv, update }: SectionProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">Include local languages too, such as Twi, Ga, Ewe, Dagbani or Hausa. Many jobs value them.</p>
      <RowList
        items={cv.languages}
        onChange={(languages) => update({ languages })}
        create={newEntry.languages}
        max={LIMITS.languages}
        noun="language"
        addLabel="Add language"
        renderRow={(l, set, i, addAfter) => (
          <div className="grid grid-cols-[1fr_9.5rem] gap-2">
            <TextField path={`languages.${l.id}.name`} label={`Language ${i + 1}`} value={l.name} onChange={(name) => set({ name })} maxLength={LIMITS.skill} placeholder="e.g. English" onEnter={addAfter} />
            <SelectField<LanguageLevel> path={`languages.${l.id}.proficiency`} label="Level" value={l.proficiency} onChange={(proficiency) => set({ proficiency })} options={options} />
          </div>
        )}
      />
    </div>
  );
}
