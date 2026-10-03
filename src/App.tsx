import { useState } from 'react'
import { ChatComposer } from './components/ChatComposer'
import { ChatLayout } from './components/ChatLayout'
import { MessageList } from './components/MessageList'
import { ModeTabs } from './components/ModeTabs'
import { getAssistantReply, initialMessages, modeDetails } from './mockData'
import type { AttachmentMeta, Message, Mode } from './types'

function App() {
  const [activeMode, setActiveMode] = useState<Mode>('Fast')
  const [draft, setDraft] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [deepThinking, setDeepThinking] = useState(false)
  const [smartSearch, setSmartSearch] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSend = () => {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft && !selectedFile) {
      return
    }

    const attachment: AttachmentMeta | undefined = selectedFile
      ? {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type || 'application/octet-stream',
        }
      : undefined

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedDraft || `Shared file: ${selectedFile?.name ?? 'attachment'}`,
      createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      attachment,
    }

    const assistantReply: Message = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      text: getAssistantReply(
        activeMode,
        trimmedDraft || selectedFile?.name || 'your request',
        Boolean(selectedFile),
        deepThinking,
        smartSearch,
      ),
      createdAt: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    }

    setMessages((current) => [...current, userMessage, assistantReply])
    setDraft('')
    setSelectedFile(null)
  }

  return (
    <ChatLayout
      header={
        <>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-600 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
              C
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Project</div>
              <div className="text-lg font-semibold text-white">Chronos</div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500"
          >
            New chat
          </button>
        </>
      }
      content={
        <>
          <div className="mb-5 flex flex-col gap-3">
            <ModeTabs activeMode={activeMode} onSelect={setActiveMode} />

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/30 px-3 py-2 text-xs text-slate-400">
              <span className="font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                {modeDetails[activeMode].eyebrow}
              </span>
              <span>{modeDetails[activeMode].helper}</span>
            </div>
          </div>

          <MessageList messages={messages} />
        </>
      }
      composer={
        <ChatComposer
          draft={draft}
          deepThinking={deepThinking}
          smartSearch={smartSearch}
          selectedFile={selectedFile}
          onDraftChange={setDraft}
          onToggleDeepThinking={() => setDeepThinking((value) => !value)}
          onToggleSmartSearch={() => setSmartSearch((value) => !value)}
          onFileSelect={setSelectedFile}
          onSend={handleSend}
        />
      }
    />
  )
}

export default App
