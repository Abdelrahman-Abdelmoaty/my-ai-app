"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/chat/chat-message";
import ChatInput from "@/components/chat/chat-input";
import ChatSettings from "@/components/chat/chat-settings";
import ThemeToggle from "@/components/toggle-theme";

export default function Chat() {
  const [selectedModel, setSelectedModel] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      model: selectedModel,
      apiKey: apiKey,
    },
  });
  const [localInput, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const handleSend = () => {
    handleSubmit(new Event("submit"));
    setInput("");
  };

  return (
    <div className="flex justify-center min-h-screen bg-background px-4 md:py-10">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex justify-between items-center">
            AI Chat Assistant
            <ThemeToggle />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="chat"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="chat">
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </ScrollArea>
              <div className="flex flex-col gap-2 mt-4">
                <ChatInput
                  input={input}
                  handleInputChange={handleInputChange}
                  handleSend={handleSend}
                />
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <ChatSettings
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                apiKey={apiKey}
                setApiKey={setApiKey}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
