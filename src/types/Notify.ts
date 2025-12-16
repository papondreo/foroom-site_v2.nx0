type Type = 'warn' | 'error' | 'success' | 'message'

export interface Notify {
  id?: string
  title: string
  message: string
  type: Type
  duration?: number
  debug?: boolean
}
