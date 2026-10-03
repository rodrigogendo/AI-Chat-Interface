import { useRef, type ChangeEvent } from 'react'

interface AttachmentButtonProps {
  selectedFile: File | null
  onFileSelect: (file: File | null) => void
}

export function AttachmentButton({ selectedFile, onFileSelect }: AttachmentButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onFileSelect(file)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx,.csv"
        onChange={handleChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 text-lg text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
        aria-label="Attach a file"
      >
        +
      </button>

      {selectedFile ? <span className="max-w-30 truncate text-xs text-slate-300">{selectedFile.name}</span> : null}
    </div>
  )
}
