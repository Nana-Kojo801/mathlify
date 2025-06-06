import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  ArrowLeft,
  Users,
  Smile,
  Paperclip,
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/app/online/room/$id/chat/')({
  component: ChatComponent,
})

function ChatComponent() {
  const { id } = useParams({ from: '/app/online/room/$id/chat/' })
  const [inputMessage, setInputMessage] = useState('')

  // Mock data - in a real app, you would fetch this from your backend
  const roomData = {
    code: id,
    name: 'Casual Practice Room',
    memberCount: 4,
    messages: [
      {
        id: 1,
        user: 'MathWizard',
        avatar: '',
        content: 'Welcome to the room! Ready for some math challenges?',
        time: '10:15 AM',
        isOwner: true,
        color: 'text-blue-400',
      },
      {
        id: 2,
        user: 'NumberNinja',
        avatar: '',
        content: 'Hey everyone! Excited to play!',
        time: '10:16 AM',
        isOwner: false,
        color: 'text-green-400',
      },
      {
        id: 3,
        user: 'CalculusKing',
        avatar: '',
        content: "Let's play some casual games first to warm up",
        time: '10:17 AM',
        isOwner: false,
        color: 'text-purple-400',
      },
      {
        id: 4,
        user: 'MathWizard',
        avatar: '',
        content: "I've set up some easy rounds to start",
        time: '10:18 AM',
        isOwner: true,
        color: 'text-blue-400',
      },
      {
        id: 5,
        user: 'AlgebraAce',
        avatar: '',
        content: "Can't wait to start! I'm ready whenever you are.",
        time: '10:19 AM',
        isOwner: false,
        color: 'text-orange-400',
      },
      {
        id: 6,
        user: 'NumberNinja',
        avatar: '',
        content: "Same here! I've been practicing my addition speed.",
        time: '10:21 AM',
        isOwner: false,
        color: 'text-green-400',
      },
      {
        id: 7,
        user: 'CalculusKing',
        avatar: '',
        content:
          "I'll be focusing on multiplication today. Hope we get some challenging ones!",
        time: '10:22 AM',
        isOwner: false,
        color: 'text-purple-400',
      },
      {
        id: 8,
        user: 'MathWizard',
        avatar: '',
        content:
          "Great! I'll start the game in a few minutes. Let me know if anyone wants to adjust the difficulty settings before we begin.",
        time: '10:25 AM',
        isOwner: true,
        color: 'text-blue-400',
      },
    ],
    onlineMembers: [
      {
        name: 'MathWizard',
        isOwner: true,
        status: 'online',
        color: 'text-blue-400',
      },
      {
        name: 'NumberNinja',
        isOwner: false,
        status: 'online',
        color: 'text-green-400',
      },
      {
        name: 'CalculusKing',
        isOwner: false,
        status: 'online',
        color: 'text-purple-400',
      },
      {
        name: 'AlgebraAce',
        isOwner: false,
        status: 'idle',
        color: 'text-orange-400',
      },
    ],
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // In a real app, you would send this message to your backend
      console.log('Sending message:', inputMessage)
      setInputMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Group messages by user in sequence (Discord-style)
  const groupedMessages = roomData.messages.reduce(
    (acc: any[], message, index) => {
      const prevMessage = roomData.messages[index - 1]

      if (prevMessage && prevMessage.user === message.user) {
        // If this message is from the same user as the previous one, add it to the last group
        const lastGroup = acc[acc.length - 1]
        lastGroup.messages.push({
          id: message.id,
          content: message.content,
          time: message.time,
        })
        return acc
      } else {
        // Otherwise, create a new group
        acc.push({
          user: message.user,
          avatar: message.avatar,
          isOwner: message.isOwner,
          color: message.color,
          messages: [
            {
              id: message.id,
              content: message.content,
              time: message.time,
            },
          ],
        })
        return acc
      }
    },
    [],
  )

  return (
    <div className="h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 mr-1"
              asChild
            >
              <Link to={`/app/online/room/$id`} params={{ id }}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-xl font-bold text-primary">Room Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Users className="h-3 w-3" />
              <span>{roomData.onlineMembers.length} online</span>
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto px-4 py-4">
        <div className="space-y-5 pb-4">
          {/* Grouped messages (Discord style) */}
          {groupedMessages.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="group/message hover:bg-accent/5 rounded-md p-2"
            >
              <div className="flex">
                <Avatar className="h-10 w-10 mt-0.5 mr-3 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${group.color}`}>
                    {group.user.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1">
                    <span className={`font-medium ${group.color}`}>
                      {group.user}
                    </span>
                    {group.isOwner && (
                      <Badge
                        variant="secondary"
                        className="ml-1.5 h-4 text-[10px] px-1"
                      >
                        Host
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground ml-2">
                      {group.messages[0].time}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {group.messages.map((message: any) => (
                      <div key={message.id} className="text-sm min-w-0">
                        <p className="break-words">{message.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-background rounded-lg p-2 shadow-sm">
          <div className="flex-grow w-full">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground"
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="h-8 px-3"
            >
              <Send className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
