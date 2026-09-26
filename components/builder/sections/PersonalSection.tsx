"use client";

import { LIMITS, type Personal } from "@/lib/cv/schema";
import { TextField } from "../fields";
import { PhotoField } from "../PhotoField";
import type { SectionProps } from "./types";

export function PersonalSection({ cv, update, err, touch, photoSupported }: SectionProps & { photoSupported: boolean }) {
  const p = cv.personal;
  const set = (patch: Partial<Personal>) => update({ personal: { ...p, ...patch } });
  const field = (key: keyof Personal) => ({
    path: `personal.${key}`,
    value: p[key],
    onChange: (v: string) => set({ [key]: v }),
    onBlur: () => touch(`personal.${key}`),
    error: err(`personal.${key}`),
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField {...field("fullName")} label="Full name" maxLength={LIMITS.short} autoComplete="name" placeholder="e.g. Ama Serwaa Owusu" className="sm:col-span-2" />
      <TextField
        {...field("title")}
        label="Professional title"
        optional
        maxLength={LIMITS.short}
        placeholder="e.g. Accountant, Graduate Engineer"
        hint="The job you do or want. Keep it short."
        className="sm:col-span-2"
      />
      <TextField {...field("email")} label="Email" optional type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email} placeholder="name@example.com" />
      <TextField {...field("phone")} label="Phone" optional type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} placeholder="+233 24 123 4567" />
      <TextField
        {...field("location")}
        label="Location"
        optional
        maxLength={LIMITS.short}
        placeholder="e.g. Kumasi, Ashanti Region"
        hint="Town or city is enough. You don't need your full address."
        className="sm:col-span-2"
      />
      <TextField {...field("linkedin")} label="LinkedIn" optional type="url" inputMode="url" maxLength={LIMITS.url} placeholder="linkedin.com/in/your-name" />
      <TextField {...field("website")} label="Website or portfolio" optional type="url" inputMode="url" maxLength={LIMITS.url} placeholder="yourname.com" />
      <PhotoField value={p.photo} onChange={(photo) => set({ photo })} className="sm:col-span-2" supported={photoSupported} />
    </div>
  );
}
