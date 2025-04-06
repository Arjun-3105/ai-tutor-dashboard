"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Lightbulb, PlusCircle, Search, Send } from "lucide-react"
import { motion } from "framer-motion"
import { CreateSpaceDialog } from "@/components/dashboard/create-space-dialog"
import { CreateJournalDialog } from "@/components/dashboard/create-journal-dialog"
import { DesmosGraph } from "@/components/dashboard/desmos-graph"

export default function LearningPage() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; includesGraph?: boolean }[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isSpaceDialogOpen, setIsSpaceDialogOpen] = useState(false)
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: query }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""
      let includesGraph = false

      if (query.toLowerCase().includes("quadratic")) {
        response =
          "A quadratic function is a polynomial function of degree 2. The standard form is f(x) = ax² + bx + c, where a, b, and c are constants and a ≠ 0.\n\nThe graph of a quadratic function is called a parabola. The parabola opens upward if a > 0 and downward if a < 0.\n\nLet's look at an example: f(x) = x² - 4x + 3\n\nWe can find the vertex using the formula x = -b/(2a):\nx = -(-4)/(2×1) = 4/2 = 2\n\nSubstituting back:\nf(2) = 2² - 4×2 + 3 = 4 - 8 + 3 = -1\n\nSo the vertex is at (2, -1).\n\nI've included a graph to visualize this function."
        includesGraph = true
      } else if (query.toLowerCase().includes("derivative")) {
        response =
          "The derivative measures the rate of change of a function with respect to a variable. It's denoted as f'(x) or df/dx.\n\nRules for finding derivatives:\n1. Power Rule: If f(x) = xⁿ, then f'(x) = n×xⁿ⁻¹\n2. Sum Rule: (f + g)' = f' + g'\n3. Product Rule: (f×g)' = f'×g + f×g'\n4. Chain Rule: (f(g(x)))' = f'(g(x))×g'(x)\n\nExample: Find the derivative of f(x) = x³ - 2x² + 4x - 7\n\nUsing the power rule and sum rule:\nf'(x) = 3x² - 4x + 4\n\nThis derivative tells us the slope of the tangent line at any point on the original function."
      } else {
        response =
          "I'd be happy to help you learn about this topic! Let me break it down step by step:\n\n1. First, let's understand the basic concepts and definitions.\n\n2. Then, we'll explore the key principles and how they apply in different contexts.\n\n3. Finally, I'll provide some examples to illustrate these concepts in action.\n\nWhat specific aspects of this topic would you like me to elaborate on further?"
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
          <h2 className="text-2xl font-semibold tracking-tight">Learning Section</h2>
          <p className="text-sm text-muted-foreground">Get step-by-step explanations and examples for any topic</p>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="topics">Browse Topics</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle>AI Tutor Chat</CardTitle>
                <CardDescription>Ask any question to get detailed explanations</CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100vh-350px)] overflow-y-auto space-y-4">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Lightbulb className="h-12 w-12 text-blue-400 mb-4 opacity-80" />
                    <h3 className="text-lg font-medium">Start Learning</h3>
                    <p className="text-sm text-muted-foreground max-w-md mt-2">
                      Ask any question about math, science, or other subjects to get step-by-step explanations with
                      examples.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {[
                        "How do I solve quadratic equations?",
                        "Explain derivatives in calculus",
                        "What is Newton's second law?",
                      ].map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="h-auto py-1.5 px-3"
                          onClick={() => setQuery(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
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
                        <div className="whitespace-pre-line">{message.content}</div>
                        {message.includesGraph && (
                          <div className="mt-4 bg-slate-800 p-2 rounded-md">
                            <DesmosGraph equation="y=x^2-4x+3" height={200} xMin={-2} xMax={6} yMin={-2} yMax={6} />
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
                  <Input
                    placeholder="Ask anything about your studies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="topics">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Browse Topics</CardTitle>
                <CardDescription>Explore curated learning materials by subject</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search topics..." className="w-full bg-background pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "Calculus", count: 24, icon: BookOpen },
                    { title: "Linear Algebra", count: 18, icon: BookOpen },
                    { title: "Physics", count: 32, icon: BookOpen },
                    { title: "Chemistry", count: 27, icon: BookOpen },
                    { title: "Statistics", count: 15, icon: BookOpen },
                    { title: "Computer Science", count: 29, icon: BookOpen },
                  ].map((topic, i) => (
                    <Card
                      key={i}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{topic.title}</CardTitle>
                          <topic.icon className="h-4 w-4 text-blue-400" />
                        </div>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Badge variant="secondary">{topic.count} lessons</Badge>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Explore
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
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

