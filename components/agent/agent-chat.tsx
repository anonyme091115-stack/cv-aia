"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { CVData } from "@/types/cv"
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileText, 
  Loader2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AgentChatProps {
  initialCV?: CVData
}

export function AgentChat({ initialCV }: AgentChatProps) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/agent",
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          cv: initialCV?.sections,
        },
      }),
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    sendMessage({ text: input })
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Helper to extract text from message parts
  const getMessageText = (msg: typeof messages[0]): string => {
    if (!msg.parts || !Array.isArray(msg.parts)) return ""
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 shrink-0 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold flex items-center gap-2">
                CareerAgent
                <Badge variant="secondary" className="text-xs">IA</Badge>
              </h1>
              <p className="text-sm text-muted-foreground">
                Expert RH - Prêt à optimiser votre CV
              </p>
            </div>
          </div>
          {initialCV && (
            <Link href={`/app/builder/${initialCV.id}`}>
              <Badge variant="outline" className="gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {initialCV.title}
              </Badge>
            </Link>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                Bienvenue ! Je suis CareerAgent
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Je suis votre expert RH personnel. Je peux améliorer votre CV, 
                l&apos;adapter à des offres d&apos;emploi, et vous conseiller sur votre carrière.
              </p>
              
              {!initialCV && (
                <Card className="max-w-md mx-auto border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                  <CardContent className="pt-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-left text-sm">
                      <p className="font-medium text-amber-800 dark:text-amber-200">
                        Aucun CV chargé
                      </p>
                      <p className="text-amber-700 dark:text-amber-300">
                        Créez d&apos;abord un CV pour que je puisse vous aider à l&apos;optimiser.
                      </p>
                      <Link href="/app" className="text-primary hover:underline mt-2 inline-block">
                        Créer un CV
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              {initialCV && (
                <div className="grid gap-3 max-w-md mx-auto">
                  <p className="text-sm text-muted-foreground">
                    Essayez ces questions :
                  </p>
                  {[
                    "Comment puis-je améliorer mon résumé professionnel ?",
                    "Analyse mon CV et donne-moi un score ATS",
                    "J'ai une offre d'emploi, aide-moi à adapter mon CV",
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      className="h-auto py-3 px-4 text-left justify-start text-sm"
                      onClick={() => {
                        sendMessage({ text: suggestion })
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    CareerAgent réfléchit...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez une question ou collez une offre d'emploi..."
              className="min-h-[44px] max-h-[200px] resize-none"
              rows={1}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="shrink-0 h-11 w-11"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Maj+Entrée pour un saut de ligne. Entrée pour envoyer.
          </p>
        </form>
      </div>
    </div>
  )
}
