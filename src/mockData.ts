import type { Message, Mode } from './types'

export const modeDetails: Record<Mode, { helper: string; eyebrow: string }> = {
  Fast: {
    helper: 'Quick answers. Light reasoning. Fast turnarounds.',
    eyebrow: 'Fast mode',
  },
  Specialist: {
    helper: 'Focused analysis. Structured thinking. Deeper detail.',
    eyebrow: 'Specialist mode',
  },
  Imagine: {
    helper: 'Creative ideation. Visual storytelling. New ideas.',
    eyebrow: 'Imagine mode',
  },
}

export const initialMessages: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text:
      'I can help you brainstorm, summarize, or turn ideas into stronger output. Pick a mode and start with a prompt.',
    createdAt: '9:41 AM',
  },
]

export function getAssistantReply(
  mode: Mode,
  input: string,
  hasAttachment: boolean,
  deepThinking: boolean,
  smartSearch: boolean,
): string {
  const base =
    mode === 'Fast'
      ? 'Here is the concise answer:'
      : mode === 'Specialist'
        ? 'I structured this response for clarity and depth:'
        : 'Here is a creative direction for that idea:'

  const context = [
    deepThinking ? 'with deeper reasoning' : 'with a quick pass',
    smartSearch ? 'and relevant context checks' : 'without extra search context',
    hasAttachment ? 'using the attached file as context' : 'using the prompt context only',
  ].join(', ')

  return `${base} “${input || 'Your request'}” is being handled ${context}. This is a UI prototype response, so the flow is mocked locally for the front-end demo.`
}
