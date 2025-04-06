"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, CheckCircle, XCircle, HelpCircle, Eye, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { CreateSpaceDialog } from "@/components/dashboard/create-space-dialog"
import { CreateJournalDialog } from "@/components/dashboard/create-journal-dialog"

export default function TestingPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [expEarned, setExpEarned] = useState(0)
  const [isSpaceDialogOpen, setIsSpaceDialogOpen] = useState(false)
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false)

  // Sample questions
  const questions = [
    {
      id: 1,
      question: "What is the derivative of f(x) = x³ - 2x² + 4x - 7?",
      options: [
        { id: "a", text: "f'(x) = 3x² - 4x + 4" },
        { id: "b", text: "f'(x) = 3x² - 4x - 7" },
        { id: "c", text: "f'(x) = 3x² - 2x + 4" },
        { id: "d", text: "f'(x) = x² - 4x + 4" },
      ],
      correctAnswer: "a",
      explanation:
        "To find the derivative, we apply the power rule to each term:\n- For x³: The derivative is 3x²\n- For -2x²: The derivative is -4x\n- For 4x: The derivative is 4\n- For -7: The derivative is 0\n\nCombining these terms: f'(x) = 3x² - 4x + 4",
      hints: [
        "Remember the power rule: the derivative of xⁿ is n×xⁿ⁻¹",
        "Apply the derivative to each term separately",
      ],
    },
    {
      id: 2,
      question: "Which of the following is a solution to the equation 2x² - 5x - 3 = 0?",
      options: [
        { id: "a", text: "x = 3" },
        { id: "b", text: "x = -1/2" },
        { id: "c", text: "x = 3 and x = -1/2" },
        { id: "d", text: "x = 2 and x = -3/4" },
      ],
      correctAnswer: "c",
      explanation:
        "To solve 2x² - 5x - 3 = 0, we can use the quadratic formula:\nx = (-b ± √(b² - 4ac)) / 2a\nwhere a = 2, b = -5, and c = -3\n\nx = (5 ± √(25 + 24)) / 4\nx = (5 ± √49) / 4\nx = (5 ± 7) / 4\n\nThis gives us x = 3 or x = -1/2",
      hints: ["Try using the quadratic formula", "Double-check your calculations when substituting values"],
    },
    {
      id: 3,
      question: "What is the limit of (sin x) / x as x approaches 0?",
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "1" },
        { id: "c", text: "∞" },
        { id: "d", text: "The limit does not exist" },
      ],
      correctAnswer: "b",
      explanation:
        "This is a famous limit in calculus. While direct substitution gives 0/0 (an indeterminate form), the limit can be evaluated using L'Hôpital's rule or by analyzing the behavior of (sin x)/x near x = 0.\n\nThe limit of (sin x)/x as x approaches 0 is exactly 1, which can be proven using various methods including power series expansion of sin x.",
      hints: ["This is a special limit in calculus", "Think about the behavior of sin x near x = 0"],
    },
    {
      id: 4,
      question: "Which of the following is the correct statement of Newton's Second Law of Motion?",
      options: [
        { id: "a", text: "For every action, there is an equal and opposite reaction" },
        {
          id: "b",
          text: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        },
        { id: "c", text: "Force equals mass times acceleration (F = ma)" },
        { id: "d", text: "Energy can neither be created nor destroyed, only transformed" },
      ],
      correctAnswer: "c",
      explanation:
        "Newton's Second Law states that the force acting on an object is equal to the mass of the object multiplied by its acceleration. Mathematically, it is expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration.\n\nThe other options describe Newton's Third Law, Newton's First Law, and the Law of Conservation of Energy, respectively.",
      hints: [
        "Think about the mathematical relationship between force, mass, and acceleration",
        "Remember that this law gives us a way to calculate the force needed to accelerate an object",
      ],
    },
    {
      id: 5,
      question: "What is the value of the definite integral ∫₀¹ x² dx?",
      options: [
        { id: "a", text: "1/2" },
        { id: "b", text: "1/3" },
        { id: "c", text: "2/3" },
        { id: "d", text: "1" },
      ],
      correctAnswer: "b",
      explanation:
        "To evaluate the definite integral ∫₀¹ x² dx, we first find the antiderivative of x²:\n\n∫ x² dx = x³/3 + C\n\nThen we apply the Fundamental Theorem of Calculus:\n∫₀¹ x² dx = [x³/3]₀¹ = (1³/3) - (0³/3) = 1/3 - 0 = 1/3",
      hints: ["Find the antiderivative of x² first", "Apply the Fundamental Theorem of Calculus using the bounds"],
    },
  ]

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return

    const isAnswerCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    setIsCorrect(isAnswerCorrect)
    setShowExplanation(true)

    // Calculate exp based on correctness and hints used
    if (isAnswerCorrect) {
      let pointsEarned = 0
      if (hintsUsed === 0) pointsEarned = 5
      else if (hintsUsed === 1) pointsEarned = 3
      else if (hintsUsed === 2) pointsEarned = 1

      setExpEarned(pointsEarned)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setHintsUsed(0)
      setIsCorrect(null)
    }
  }

  const handleUseHint = () => {
    if (hintsUsed < 2 && !showExplanation) {
      setHintsUsed(hintsUsed + 1)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between"
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Testing Section</h2>
          <p className="text-sm text-muted-foreground">Test your knowledge with practice questions</p>
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
        <Tabs defaultValue="mcq" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
            <TabsTrigger value="short">Short Answer</TabsTrigger>
          </TabsList>
          <TabsContent value="mcq" className="space-y-4">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      Question {currentQuestion + 1} of {questions.length}
                    </CardTitle>
                    <CardDescription>Select the correct answer</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={hintsUsed === 0 ? "default" : "secondary"}>
                      {hintsUsed === 0 ? "+5 XP" : hintsUsed === 1 ? "+3 XP" : "+1 XP"}
                    </Badge>
                  </div>
                </div>
                <Progress value={(currentQuestion / questions.length) * 100} className="h-1.5" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-lg font-medium">{questions[currentQuestion].question}</div>

                <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer}>
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-center space-x-2 rounded-md border p-3 ${
                          showExplanation && option.id === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-500/10"
                            : showExplanation &&
                                option.id === selectedAnswer &&
                                option.id !== questions[currentQuestion].correctAnswer
                              ? "border-red-500 bg-red-500/10"
                              : "border-slate-700"
                        }`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} disabled={showExplanation} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                        {showExplanation && option.id === questions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {showExplanation &&
                          option.id === selectedAnswer &&
                          option.id !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {hintsUsed > 0 && !showExplanation && (
                  <div className="rounded-md bg-blue-500/10 border border-blue-500/20 p-3">
                    <div className="flex items-center gap-2 text-blue-400 font-medium mb-1">
                      <Lightbulb className="h-4 w-4" />
                      <span>Hint {hintsUsed}:</span>
                    </div>
                    <p className="text-sm text-blue-300">{questions[currentQuestion].hints[hintsUsed - 1]}</p>
                  </div>
                )}

                {showExplanation && (
                  <div className="rounded-md bg-slate-700/50 p-4 border border-slate-600">
                    <div className="flex items-center gap-2 text-white font-medium mb-2">
                      <span>Explanation:</span>
                      {isCorrect ? (
                        <Badge className="bg-green-500 hover:bg-green-600">+{expEarned} XP</Badge>
                      ) : (
                        <Badge variant="destructive">+0 XP</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 whitespace-pre-line">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUseHint}
                    disabled={hintsUsed >= 2 || showExplanation}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Use Hint
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExplanation(true)}
                    disabled={showExplanation}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Show Solution
                  </Button>
                </div>
                {!showExplanation ? (
                  <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    Next Question
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="short">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle>Short Answer Questions</CardTitle>
                <CardDescription>Type your answer in the text area below</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-lg font-medium">
                    Explain the concept of integration and how it relates to differentiation.
                  </div>
                  <Textarea placeholder="Type your answer here..." className="min-h-[150px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Use Hint
                </Button>
                <Button>Submit Answer</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <CreateSpaceDialog open={isSpaceDialogOpen} onOpenChange={setIsSpaceDialogOpen} />
      <CreateJournalDialog open={isJournalDialogOpen} onOpenChange={setIsJournalDialogOpen} />
    </div>
  )
}

