import type { ChangeEvent, KeyboardEvent } from 'react'
import { AttachmentButton } from './AttachmentButton'
import { ToggleButton } from './ToggleButton'

interface ChatComposerProps {
  draft: string
  deepThinking: boolean
  smartSearch: boolean
  selectedFile: File | null
  onDraftChange: (value: string) => void
  onToggleDeepThinking: () => void
  onToggleSmartSearch: () => void
  onFileSelect: (file: File | null) => void
  onSend: () => void
}

export function ChatComposer({
  draft,
  deepThinking,
  smartSearch,
  selectedFile,
  onDraftChange,
  onToggleDeepThinking,
  onToggleSmartSearch,
  onFileSelect,
  onSend,
}: ChatComposerProps) {
  const isSendDisabled = !draft.trim() && !selectedFile

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = event.key.toLowerCase()

    if (key === 'enter' && !event.shiftKey) {
      event.preventDefault()
      if (!isSendDisabled) {
        onSend()
      }
    }
  }

  return (
    <div className="rounded-[28px] border border-slate-700/80 bg-slate-950/80 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.6)] backdrop-blur-sm sm:p-4">
      <div className="flex flex-col gap-3">
        <textarea
          value={draft}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onDraftChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="Ask Chronos anything..."
          className="max-h-40 min-h-22 w-full resize-none rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-500/60"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <ToggleButton label="Deep Thinking" enabled={deepThinking} onToggle={onToggleDeepThinking} />
            <ToggleButton label="Smart Search" enabled={smartSearch} onToggle={onToggleSmartSearch} />
          </div>

          <div className="flex items-center justify-end gap-3">
            <AttachmentButton selectedFile={selectedFile} onFileSelect={onFileSelect} />

            <button
              type="button"
              onClick={onSend}
              disabled={isSendDisabled}
              className="flex h-11 items-center justify-center rounded-xl bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
