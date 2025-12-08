import React from 'react';

type LocationButtonProps = {
  label: string;
  subLabel?: string;
  /** alignment of the content inside the box; default is 'right' */
  align?: 'left' | 'right';
  /** compact mode uses the smaller/uppercase date-style typography */
  compact?: boolean;
};

export default function LocationButton({
  label,
  subLabel,
  align = 'right',
  compact = false,
}: LocationButtonProps) {
  const containerAlignClass = align === 'left' ? 'text-left' : 'text-right';
  const mainLabelClass = compact
    ? 'font-geist-sans text-neutral-600/85 tracking-widest uppercase text-sm md:text-base'
    : 'font-geist-sans text-neutral-900 text-3xl md:text-6xl leading-tight';

  return (
    <div
      className={`max-w-3xl rounded-2xl border border-neutral-200 bg-white px-6 py-3 opacity-95 md:px-8 md:py-4 ${containerAlignClass}`}
    >
      <div className={mainLabelClass}>{label}</div>
      {subLabel && (
        <div className="mt-2 text-[10px] text-neutral-500/70 md:text-xs">
          {subLabel}
        </div>
      )}
    </div>
  );
}
