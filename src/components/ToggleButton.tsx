interface ToggleButtonProps {
  label: string
  enabled: boolean
  onToggle: () => void
}

export function ToggleButton({ label, enabled, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-600"
      aria-pressed={enabled}
    >
      <span
        className={[
          'relative h-5 w-9 rounded-full border transition-colors',
          enabled ? 'border-cyan-400/80 bg-cyan-500/20' : 'border-slate-600 bg-slate-800',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform',
            enabled ? 'left-5' : 'left-0.5',
          ].join(' ')}
        />
      </span>
      {label}
    </button>
  )
}
