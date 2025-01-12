import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft } from "lucide-react";

const Chat = () => {
  return (
    <div className="p-4 mx-auto w-[50%] min-w-[320px]">
      <form className="relative rounded-lg bg-background p-4 m-2">
        <ChatInput
          placeholder="Why should we unblock this site..."
          className="min-h-12 resize-none rounded-lg bg-background border p-3 shadow-none focus-visible:ring-1"
        />
        <div className="flex items-center p-3 pt-0 mt-4">
          <Button size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;