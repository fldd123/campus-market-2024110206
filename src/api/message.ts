import http from './http'

export interface MessageItem {
  id: number
  sender: string
  avatar: string
  content: string
  time: string
  unread: boolean
}

export function getMessages() {
  return http.get<MessageItem[]>('/messages')
}
