import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import type { FriendRequest, User } from "@/types";
import { Check } from "lucide-react";
import { useAcceptFriendRequestMutation } from "../-mutations";

const Request = ({
  request,
}: {
  request: FriendRequest & { sender: User; receiver: User }
}) => {
  const { mutateAsync: acceptRequest, isPending: isAcceptingRequest } =
    useAcceptFriendRequestMutation(request)
  return (
    <div className="flex items-center justify-between p-3 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50">
      {/* Left side: Avatar and Name */}
      <div className="flex items-center space-x-4">
        <UserAvatar
          username={request.sender.username}
          avatar={request.sender.avatar}
          className="size-10 ring-2 ring-primary ring-offset-2"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium">{request.sender.username}</span>
        </div>
      </div>

      {/* Right side: Button / Icon */}
      <Button
        onClick={async () => {
          await acceptRequest()
        }}
        className="bg-green-400 text-white"
        size="sm"
      >
        {isAcceptingRequest ? <Spinner /> : <Check className="size-6" />}
        Accept
      </Button>
    </div>
  )
}

export default Request
