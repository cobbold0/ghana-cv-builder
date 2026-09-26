"use client";

import { useRef, useState } from "react";
import { buttonClass } from "@/lib/ui";

const SIZE = 320;

/** Center-crops and shrinks the photo so it stays small enough to keep in browser storage. */
async function toSquareJpeg(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("no canvas");
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, SIZE, SIZE);
    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function PhotoField({
  value,
  onChange,
  supported,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  supported: boolean;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className={className}>
      <p className="mb-1.5 text-sm font-medium text-slate-800">
        Photo <span className="font-normal text-slate-500">(optional)</span>
      </p>
      <div className="flex items-center gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Your CV photo" className="size-16 rounded-full object-cover ring-1 ring-slate-200" />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500" aria-hidden="true">
            No photo
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonClass("secondary", "sm")} onClick={() => inputRef.current?.click()} disabled={busy}>
            {busy ? "Processing…" : value ? "Change photo" : "Add photo"}
          </button>
          {value ? (
            <button type="button" className={buttonClass("ghost", "sm")} onClick={() => onChange("")}>
              Remove
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            setError("");
            if (!file.type.startsWith("image/")) return setError("Please choose a JPG or PNG image.");
            if (file.size > 15 * 1024 * 1024) return setError("That image is too large. Please choose one under 15 MB.");
            setBusy(true);
            try {
              onChange(await toSquareJpeg(file));
            } catch {
              setError("We couldn't read that image. Please try a different photo.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <p className="mt-1.5 text-sm text-slate-500">
        {supported
          ? "Only add a photo if the job advert asks for one. Your photo stays on this device."
          : "The current template doesn't show photos. Modern and Professional do."}
      </p>
    </div>
  );
}
