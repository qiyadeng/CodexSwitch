type CodexIconProps = {
  className?: string;
  size?: number;
};

export function CodexIcon({ className = '', size = 24 }: CodexIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
    >
      <path d="M3 7.5h12.5V4l5.5 3.5-5.5 3.5V8.9H3z" fill="#38BDF8" />
      <path d="M21 16.5H8.5V20L3 16.5 8.5 13v2.1H21z" fill="#2563EB" />
      <path d="M12 7.75 16.25 12 12 16.25 7.75 12z" fill="#F8FAFC" />
      <rect x="10" y="10" width="4" height="4" rx="1" fill="#0F1F3D" />
    </svg>
  );
}
