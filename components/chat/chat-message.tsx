import { Message } from "ai";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export default function ChatMessage({ message }: { message: Message }) {
  const parsedMessage = messageSchema.safeParse(message);
  if (!parsedMessage.success) {
    console.error("Invalid message format:", parsedMessage.error);
    return null;
  }

  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start space-x-2 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <Avatar>
          <AvatarFallback>
            <Bot size={24} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-lg p-3 max-w-[70%] ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
      {isUser && (
        <Avatar>
          <AvatarFallback>
            <User size={24} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
