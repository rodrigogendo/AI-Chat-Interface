import type { ReactNode } from 'react'

interface ChatLayoutProps {
  header: ReactNode
  content: ReactNode
  composer: ReactNode
}

export function ChatLayout({ header, content, composer }: ChatLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050d18] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/40 px-4 py-3 shadow-[inset_0_1px_0_rgba(148,163,184,0.12)] backdrop-blur-sm">
          {header}
        </header>

        <main className="mt-5 flex flex-1 flex-col justify-between gap-5">
          <div className="mx-auto w-full max-w-3xl flex-1">{content}</div>
          <div className="mx-auto w-full max-w-3xl">{composer}</div>
        </main>
      </div>
    </div>
  )
}
