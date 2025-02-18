import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model, apiKey } = await req.json();

  let result;

  switch (model) {
    case "openai":
      result = streamText({
        model: openai("gpt-4", apiKey),
        messages,
      });
      break;
    case "anthropic":
      result = streamText({
        model: anthropic("claude-3-opus", apiKey),
        messages,
      });
      break;
    case "deepseek":
      result = streamText({
        model: deepseek("deepseek-chat", apiKey),
        messages,
      });
      break;
    default:
      throw new Error("Invalid model selected");
  }

  return result.toDataStreamResponse();
}
