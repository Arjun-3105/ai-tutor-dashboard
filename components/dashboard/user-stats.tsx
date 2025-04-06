"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Flame, Star, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UserStats() {
  const [expProgress, setExpProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setExpProgress(65), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Level 12</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2 w-48">
              <p className="text-sm font-medium">Experience Points</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>1,250 XP</span>
                  <span>2,000 XP</span>
                </div>
                <Progress value={expProgress} className="h-1.5" />
              </div>
              <p className="text-xs text-muted-foreground">750 XP until Level 13</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">7 Day Streak</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">You've been learning for 7 days in a row!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">+125 XP Today</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">You've earned 125 XP today. Keep it up!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

