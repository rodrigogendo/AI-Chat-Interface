import type { Mode } from '../types'

const tabs: Array<{ id: Mode; label: string }> = [
  { id: 'Fast', label: 'Fast' },
  { id: 'Specialist', label: 'Specialist' },
  { id: 'Imagine', label: 'Imagine' },
]

interface ModeTabsProps {
  activeMode: Mode
  onSelect: (mode: Mode) => void
}

export function ModeTabs({ activeMode, onSelect }: ModeTabsProps) {
  return (
    <div className="flex w-full gap-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
      {tabs.map((tab) => {
        const isActive = activeMode === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={[
              'flex-1 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:px-4',
              isActive
                ? 'bg-slate-800 text-white shadow-[0_0_0_1px_rgba(148,163,184,0.12),0_12px_30px_rgba(15,23,42,0.65)]'
                : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
