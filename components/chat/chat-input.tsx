import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { z } from "zod";

const chatInputSchema = z.object({
  input: z.string().max(280),
});

export default function ChatInput({
  input,
  handleInputChange,
  handleSend,
}: {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => void;
}) {
  const validatedInput = chatInputSchema.safeParse({ input });
  const isValid = validatedInput.success;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) {
            handleSend();
          }
        }}
        className="flex w-full items-center space-x-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Button type="submit" size="icon" disabled={!isValid}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <div className="text-xs text-muted-foreground self-end">
        {input.length} / 280
      </div>
    </>
  );
}
