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
      <defs>
        <linearGradient id="codex-switch-mark-top" x1="3" x2="21" y1="7.5" y2="7.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#67E8F9" />
        </linearGradient>
        <linearGradient id="codex-switch-mark-bottom" x1="21" x2="3" y1="16.5" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d="M3 7.5h12.5V4l5.5 3.5-5.5 3.5V8.9H3z" fill="url(#codex-switch-mark-top)" />
      <path d="M21 16.5H8.5V20L3 16.5 8.5 13v2.1H21z" fill="url(#codex-switch-mark-bottom)" />
      <path d="M12 7.75 16.25 12 12 16.25 7.75 12z" fill="#FFFFFF" />
      <rect x="10" y="10" width="4" height="4" rx="1" fill="#7DD3FC" />
    </svg>
  );
}
