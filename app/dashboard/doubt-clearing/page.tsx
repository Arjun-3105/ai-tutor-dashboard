"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Upload, Send, Image, FileText, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { CreateSpaceDialog } from "@/components/dashboard/create-space-dialog"
import { CreateJournalDialog } from "@/components/dashboard/create-journal-dialog"
import { DesmosGraph } from "@/components/dashboard/desmos-graph"

export default function DoubtClearingPage() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; image?: string; includesGraph?: boolean }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSpaceDialogOpen, setIsSpaceDialogOpen] = useState(false)
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: query }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = "I've analyzed your question and here's the step-by-step solution:\n\n"
      let includesGraph = false

      if (query.toLowerCase().includes("equation") || query.toLowerCase().includes("solve")) {
        response +=
          "1. First, let's identify what type of equation we're dealing with.\n\n2. For this problem, we need to isolate the variable by performing the same operations on both sides.\n\n3. Let's solve it step by step:\n   - Combine like terms\n   - Isolate the variable term\n   - Divide both sides by the coefficient\n\n4. The solution is x = 3\n\nI've included a graph to visualize this solution."
        includesGraph = true
      } else if (query.toLowerCase().includes("integral") || query.toLowerCase().includes("derivative")) {
        response +=
          "1. For this calculus problem, we'll apply the appropriate integration/differentiation rules.\n\n2. Let's break it down:\n   - Identify the function structure\n   - Apply the power rule for each term\n   - Simplify the result\n\n3. The final answer is f'(x) = 2x + 3\n\nWould you like me to explain any specific step in more detail?"
      } else {
        response +=
          "1. I've analyzed your question and identified the key concepts involved.\n\n2. To solve this problem, we need to apply the following principles:\n   - Understand the fundamental concepts\n   - Apply the relevant formulas\n   - Work through the calculations methodically\n\n3. The solution involves several steps which I've outlined above.\n\nIs there a specific part of this solution you'd like me to elaborate on further?"
      }

      setMessages([
        ...messages,
        { role: "user", content: query },
        { role: "assistant", content: response, includesGraph },
      ])
      setIsLoading(false)
      setQuery("")
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a placeholder message with the image
    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result as string
      setMessages([
        ...messages,
        {
          role: "user",
          content: "I need help solving this problem:",
          image: imageUrl,
        },
      ])

      // Simulate AI response
      setIsLoading(true)
      setTimeout(() => {
        const response =
          "I've analyzed the equation in your image. This appears to be a quadratic equation in the form ax² + bx + c = 0.\n\nHere's how to solve it:\n\n1. First, we need to rearrange it into standard form.\n\n2. Then we can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n\n3. Substituting the values:\n   a = 1, b = -3, c = 2\n   x = (3 ± √(9 - 8)) / 2\n   x = (3 ± √1) / 2\n   x = (3 ± 1) / 2\n\n4. This gives us x = 2 or x = 1\n\nI've included a graph to visualize this equation and its solutions."

        setMessages([
          ...messages,
          {
            role: "user",
            content: "I need help solving this problem:",
            image: imageUrl,
          },
          {
            role: "assistant",
            content: response,
            includesGraph: true,
          },
        ])

        setIsLoading(false)
      }, 2000)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <motion.div
        onClick={() => window.location.href = "https://ai-tutor-app-7xytj56czappgh58gkmrf2w.streamlit.app/"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Doubt Clearing Section</h2>
          <p className="text-sm text-muted-foreground">Get step-by-step solutions to your specific questions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setIsSpaceDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span>New Space</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setIsJournalDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span>New Journal</span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => window.location.href = "https://ai-tutor-app-7xytj56czappgh58gkmrf2w.streamlit.app/"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle>Doubt Clearing Assistant</CardTitle>
                <CardDescription>Ask any question to get detailed solutions</CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100vh-350px)] overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Lightbulb className="h-12 w-12 text-blue-400 mb-4 opacity-80" />
                    <h3 className="text-lg font-medium">Ask Your Question</h3>
                    <p className="text-sm text-muted-foreground max-w-md mt-2">
                      Describe your problem or upload an image of your question to get a step-by-step solution.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {["Solve x² - 3x + 2 = 0", "Find the derivative of f(x) = x³ + 2x", "Calculate ∫(2x + 3) dx"].map(
                        (suggestion, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="h-auto py-1.5 px-3"
                            onClick={() => setQuery(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  messages.map((message, i) => (
                    <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"
                        }`}
                      >
                        {message.image && (
                          <div className="mb-2">
                            <img
                              src={message.image || "/placeholder.svg"}
                              alt="Uploaded question"
                              className="max-w-full rounded-md"
                            />
                          </div>
                        )}
                        <div className="whitespace-pre-line">{message.content}</div>
                        {message.includesGraph && (
                          <div className="mt-4 bg-slate-800 p-2 rounded-md">
                            <DesmosGraph equation="y=x^2-3x+2" height={200} xMin={-1} xMax={4} yMin={-1} yMax={4} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 max-w-[80%] bg-slate-700 text-slate-100">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>
                        <div
                          className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Image className="h-4 w-4" />
                    <span className="sr-only">Upload image</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Textarea
                    placeholder="Describe your problem or ask a question..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-[120px]"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="upload">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Upload Question</CardTitle>
                <CardDescription>Upload an image or document with your question</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-12 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                    <Upload className="h-10 w-10 text-blue-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Upload your question</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                    Drag and drop or click to upload an image of your question
                  </p>
                  <div className="mt-6 flex gap-2">
                    <Button variant="outline" className="gap-1">
                      <Image className="h-4 w-4" />
                      <span>Upload Image</span>
                    </Button>
                    <Button variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      <span>Upload Document</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <CreateSpaceDialog open={isSpaceDialogOpen} onOpenChange={setIsSpaceDialogOpen} />
      <CreateJournalDialog open={isJournalDialogOpen} onOpenChange={setIsJournalDialogOpen} />
    </div>
  )
}

