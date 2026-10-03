import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={['flex w-full', isUser ? 'justify-end' : 'justify-start'].join(' ')}>
      <div
        className={[
          'max-w-[85%] rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm sm:max-w-[75%]',
          isUser
            ? 'border-cyan-500/30 bg-cyan-500/10 text-slate-100'
            : 'border-slate-700/80 bg-slate-900/70 text-slate-100',
        ].join(' ')}
      >
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-400">
          <span>{isUser ? 'You' : 'Chronos'}</span>
          <span>{message.createdAt}</span>
        </div>

        {message.text ? <p className="text-sm leading-6 text-slate-100">{message.text}</p> : null}

        {message.attachment ? (
          <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/40 px-3 py-2 text-xs text-slate-300">
            <div className="font-medium text-slate-200">Attached file</div>
            <div className="mt-1 truncate">{message.attachment.name}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
