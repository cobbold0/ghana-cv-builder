"use client";

import { useState } from "react";
import { LIMITS } from "@/lib/cv/schema";
import { TextArea } from "../fields";
import type { SectionProps } from "./types";

const EXAMPLES = [
  {
    label: "Graduate",
    text: "Recent BSc Accounting graduate from the University of Cape Coast with national service experience in a district assembly finance office. Accurate with numbers, confident with Excel and eager to start a career in audit or accounts.",
  },
  {
    label: "Experienced",
    text: "Sales supervisor with six years of experience in fast-moving consumer goods across the Ashanti and Bono regions. Led a team of eight field sales representatives and grew distributor accounts by building strong relationships with retailers.",
  },
  {
    label: "Career change",
    text: "Secondary school teacher moving into corporate training. Eight years of planning lessons, assessing learners and presenting to groups of 40 or more, now completing a certificate in human resource management.",
  },
];

export function SummarySection({ cv, update }: SectionProps) {
  const [showExamples, setShowExamples] = useState(false);
  return (
    <div>
      <TextArea
        path="summary"
        label="Professional summary"
        optional
        value={cv.summary}
        onChange={(summary) => update({ summary })}
        maxLength={LIMITS.summary}
        rows={5}
        hint="2–4 sentences: who you are, your strongest skills or experience, and the kind of role you want."
      />
      <button
        type="button"
        className="mt-3 text-sm font-medium text-brand-700 underline underline-offset-2"
        aria-expanded={showExamples}
        aria-controls="summary-examples"
        onClick={() => setShowExamples((v) => !v)}
      >
        {showExamples ? "Hide examples" : "Show example summaries"}
      </button>
      <div id="summary-examples" hidden={!showExamples} className="mt-3 space-y-3">
        <p className="text-sm text-slate-600">Use these for ideas only. Write about your own experience.</p>
        {EXAMPLES.map((e) => (
          <figure key={e.label} className="rounded-lg bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
            <figcaption className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">{e.label}</figcaption>
            {e.text}
          </figure>
        ))}
      </div>
    </div>
  );
}
