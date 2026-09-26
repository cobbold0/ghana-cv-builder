"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GH">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>If you were working on your CV, it is still saved on this device.</p>
        <button type="button" onClick={reset} style={{ marginTop: "1rem", padding: "0.75rem 1.25rem" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
