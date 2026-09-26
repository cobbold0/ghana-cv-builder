const paths = {
  up: "M10 5.5 4.5 11l1.4 1.4L10 8.3l4.1 4.1 1.4-1.4L10 5.5Z",
  down: "M10 14.5 15.5 9l-1.4-1.4L10 11.7 5.9 7.6 4.5 9l5.5 5.5Z",
  trash: "M7.5 3h5l.7 1.5H16v1.8H4V4.5h2.8L7.5 3ZM5.2 7.5h9.6l-.7 9H5.9l-.7-9Z",
  plus: "M9 4h2v5h5v2h-5v5H9v-5H4V9h5V4Z",
  chevron: "M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z",
  download: "M9 3h2v7.2l2.6-2.6 1.4 1.4-5 5-5-5 1.4-1.4L9 10.2V3ZM4 15h12v2H4v-2Z",
};

export function Icon({ name, className = "size-5" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className}>
      <path fill="currentColor" d={paths[name]} />
    </svg>
  );
}
