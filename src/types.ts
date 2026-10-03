export type Mode = 'Fast' | 'Specialist' | 'Imagine'

export type Role = 'user' | 'assistant'

export interface AttachmentMeta {
  name: string
  size: number
  type: string
}

export interface Message {
  id: string
  role: Role
  text: string
  createdAt: string
  attachment?: AttachmentMeta
}
