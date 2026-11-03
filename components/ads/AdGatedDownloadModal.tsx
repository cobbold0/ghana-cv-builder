"use client";

import React, { useEffect } from "react";
import { AdSlot } from "@/components/ads/AdSlot";

interface AdGatedDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void | Promise<void>;
  fileName?: string;
}

export function AdGatedDownloadModal({
  isOpen,
  onClose,
  onDownload,
  fileName = "Resume.pdf",
}: AdGatedDownloadModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 id="ad-modal-title" className="text-xl font-bold text-slate-900 sm:text-2xl">
            Your CV is Ready!
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {fileName} is formatted and ready. Click below to start your direct PDF download.
          </p>
        </div>

        {/* High-Impression In-Modal Ad Slot */}
        <div className="my-5 rounded-xl border border-slate-200 bg-slate-50/60 p-2 overflow-hidden text-center min-h-[250px] flex flex-col items-center justify-center">
          <AdSlot variant="inline" label="Sponsored" className="my-0" />
        </div>

        {/* Final Download Button */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onDownload}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-emerald-700 active:scale-[0.98] transition cursor-pointer"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download CV PDF Now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
