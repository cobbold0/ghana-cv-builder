"use client";

import { LIMITS, newEntry, SKILL_LEVELS, type SkillLevel } from "@/lib/cv/schema";
import { SKILL_LEVEL_LABELS } from "@/lib/cv/normalize";
import { RowList } from "../EntryList";
import { SelectField, TextField } from "../fields";
import type { SectionProps } from "./types";

const options = SKILL_LEVELS.map((v) => ({ value: v, label: v ? SKILL_LEVEL_LABELS[v] : "No level" }));

export function SkillsSection({ cv, update }: SectionProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-slate-600">
        List skills that match the jobs you&apos;re applying for, such as software, tools, languages or techniques. Levels are optional. Press Enter to add another skill.
      </p>
      <RowList
        items={cv.skills}
        onChange={(skills) => update({ skills })}
        create={newEntry.skills}
        max={LIMITS.skills}
        noun="skill"
        addLabel="Add skill"
        renderRow={(s, set, i, addAfter) => (
          <div className="grid grid-cols-[1fr_8.5rem] gap-2">
            <TextField path={`skills.${s.id}.name`} label={`Skill ${i + 1}`} value={s.name} onChange={(name) => set({ name })} maxLength={LIMITS.skill} placeholder="e.g. Microsoft Excel" onEnter={addAfter} />
            <SelectField<SkillLevel> path={`skills.${s.id}.level`} label="Level" value={s.level} onChange={(level) => set({ level })} options={options} />
          </div>
        )}
      />
    </div>
  );
}
