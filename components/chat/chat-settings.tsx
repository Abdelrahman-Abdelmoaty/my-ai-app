import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const settingsSchema = z.object({
  selectedModel: z.enum(["openai", "anthropic", "deepseek"]),
  apiKey: z.string().min(1, "API key is required"),
});

export default function ChatSettings({
  selectedModel,
  setSelectedModel,
  apiKey,
  setApiKey,
}: {
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  apiKey: string;
  setApiKey: (value: string) => void;
}) {
  const validatedSettings = settingsSchema.safeParse({ selectedModel, apiKey });
  const isValid = validatedSettings.success;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Model</h3>
        <Select onValueChange={(value) => setSelectedModel(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">OpenAI</SelectItem>
            <SelectItem value="anthropic">Anthropic</SelectItem>
            <SelectItem value="deepseek">DeepSeek</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Key</h3>
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key..."
        />
        {!isValid && (
          <p className="text-sm text-destructive">API key is required</p>
        )}
      </div>
    </div>
  );
}
