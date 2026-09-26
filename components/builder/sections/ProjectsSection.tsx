"use client";

import { LIMITS, newEntry } from "@/lib/cv/schema";
import { EntryList } from "../EntryList";
import { TextArea, TextField } from "../fields";
import type { SectionProps } from "./types";

export function ProjectsSection({ cv, update, err, touch, reveal }: SectionProps) {
  return (
    <EntryList
      reveal={reveal}
      items={cv.projects}
      onChange={(projects) => update({ projects })}
      create={newEntry.projects}
      max={LIMITS.projects}
      noun="project"
      addLabel="Add project"
      emptyText="Final-year projects, personal projects, research or community work. Especially useful if you have little work experience."
      summarize={(p) => ({ title: p.name, subtitle: p.tools })}
      renderItem={(p, set) => {
        const path = (k: string) => `projects.${p.id}.${k}`;
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField path={path("name")} label="Project name" value={p.name} onChange={(name) => set({ name })} maxLength={LIMITS.short} className="sm:col-span-2" />
            <TextArea path={path("description")} label="What you did and the result" value={p.description} onChange={(description) => set({ description })} maxLength={LIMITS.description} rows={3} className="sm:col-span-2" />
            <TextField path={path("tools")} label="Tools or technologies" optional value={p.tools} onChange={(tools) => set({ tools })} maxLength={LIMITS.short * 2} placeholder="e.g. Python, SPSS, AutoCAD" />
            <TextField path={path("url")} label="Link" optional type="url" inputMode="url" value={p.url} onChange={(url) => set({ url })} onBlur={() => touch(path("url"))} error={err(path("url"))} maxLength={LIMITS.url} placeholder="github.com/you/project" />
          </div>
        );
      }}
    />
  );
}
