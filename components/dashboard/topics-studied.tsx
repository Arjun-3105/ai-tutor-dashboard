"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Generate sample data for topics studied
const topicsData = [
  { id: 1, name: "Calculus", progress: 85, lessons: 12, completed: 10 },
  { id: 2, name: "Linear Algebra", progress: 70, lessons: 10, completed: 7 },
  { id: 3, name: "Physics", progress: 60, lessons: 15, completed: 9 },
  { id: 4, name: "Chemistry", progress: 45, lessons: 12, completed: 5 },
  { id: 5, name: "Statistics", progress: 30, lessons: 8, completed: 2 },
]

export function TopicsStudied() {
  const [data] = useState(topicsData)

  return (
    <div className="space-y-4">
      {data.map((topic) => (
        <div key={topic.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-medium">{topic.name}</div>
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">
              {topic.completed}/{topic.lessons} lessons
            </Badge>
          </div>
          <div className="space-y-1">
            <Progress value={topic.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{topic.progress}% complete</span>
              <span>{topic.lessons - topic.completed} lessons remaining</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

