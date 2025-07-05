import UserAvatar from '@/components/user-avatar'
import type { FriendMessage } from '@/types'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'

const Message = ({
  message,
  isOwn,
  setIsDeleteConfirmationOpen,
  setSelectedMessageId,
  setEditingMessageId,
}: {
  message: FriendMessage
  isOwn: boolean
  setIsDeleteConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedMessageId: React.Dispatch<
    React.SetStateAction<FriendMessage['_id'] | null>
  >
  setEditingMessageId: React.Dispatch<
    React.SetStateAction<FriendMessage['_id'] | null>
  >
}) => {
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
        {/* Edit/Delete Menu */}
        {isOwn && (
          <div className="absolute top-2 right-2 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-1 rounded hover:bg-primary/10 focus:outline-none"
                  title="More actions"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4} className="w-32">
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
                  onClick={() => setEditingMessageId(message._id)}
                >
                  <Edit className="w-4 h-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10"
                  onClick={() => {
                    setSelectedMessageId(message._id)
                    setIsDeleteConfirmationOpen(true)
                  }}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
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
        <div className="space-y-1">
          <div key={message._id} className="text-sm min-w-0">
            <p className="break-words">{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message