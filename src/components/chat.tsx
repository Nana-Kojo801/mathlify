import { cn } from '@/lib/utils'
import type React from 'react'
import { Input } from './ui/input'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import Spinner from './spinner'
import { Send } from 'lucide-react'

type ChatProps<T> = {
  messages: T[]
  render: (message: T) => React.JSX.Element
  className?: string
  handleSendMessage: (message: string) => Promise<void>
  isSendingMessage: boolean
}

export default function Chat<T>({
  messages,
  isSendingMessage,
  handleSendMessage,
  render,
  className,
}: ChatProps<T>) {
  const [message, setMessage] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  return (
    <>
      <div className="flex-grow overflow-y-auto px-4 py-4">
        <div className={cn('space-y-5 pb-4', className)}>
          {messages.map((message) => render(message))}
        </div>
        <div ref={bottomRef}></div>
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-background rounded-lg shadow-sm">
          <div className="flex-grow w-full">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
            />
          </div>

          <Button
            variant="default"
            size="sm"
            className="h-8 px-3 mr-3"
            disabled={isSendingMessage || message.length === 0}
            onClick={async () => {
              await handleSendMessage(message)
              setMessage('')
            }}
          >
            {isSendingMessage ? <Spinner /> : <Send className="h-4 w-4 mr-1" />}
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </>
  )
}
