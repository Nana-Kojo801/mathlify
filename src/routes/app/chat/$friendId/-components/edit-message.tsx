import UserAvatar from '@/components/user-avatar'
import type { FriendMessage } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useState } from 'react'

const EditMessage = ({
  message,
  isOwn,
  onSave,
  onCancel,
  isSaving,
}: {
  message: FriendMessage
  isOwn: boolean
  onSave: (messageId: FriendMessage['_id'], newContent: string) => Promise<void>
  onCancel: () => void
  isSaving: boolean
}) => {
  const [editedMessage, setEditedMessage] = useState(message.message)

  const handleSave = async () => {
    if (editedMessage.trim() && editedMessage !== message.message) {
      await onSave(message._id, editedMessage.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div
      key={message._id}
      className={`group/message rounded-md p-2 py-3 flex gap-3 items-start ${isOwn ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
    >
      <UserAvatar
        username={message.sender.username}
        avatar={message.sender.avatar}
        className="size-10"
      />
      <div className="flex-1 min-w-0 relative">
        <div className="flex items-center mb-1">
          <span className={`font-medium ${isOwn ? 'text-primary' : ''}`}>
            {message.sender.username}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {new Date(message._creationTime).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        
        {/* Edit Interface */}
        <div className="flex items-center gap-2 bg-background rounded-lg shadow-sm border border-border">
          <div className="flex-grow w-full">
            <Input
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
              placeholder="Edit your message..."
              disabled={isSaving}
            />
          </div>
          
          <div className="flex gap-1 mr-3">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-8 px-3"
              disabled={isSaving || editedMessage.trim().length === 0 || editedMessage === message.message}
              onClick={handleSave}
            >
              <Send className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMessage