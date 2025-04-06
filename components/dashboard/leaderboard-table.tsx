"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUp, ArrowDown, Minus, Trophy } from "lucide-react"

// Generate sample data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Alex Johnson", xp: 4850, rank: 1, change: "up" },
  { id: 2, name: "Maria Garcia", xp: 4720, rank: 2, change: "same" },
  { id: 3, name: "David Kim", xp: 4680, rank: 3, change: "up" },
  { id: 4, name: "Sarah Williams", xp: 4590, rank: 4, change: "down" },
  { id: 5, name: "James Smith", xp: 4520, rank: 5, change: "up" },
  { id: 6, name: "Emily Chen", xp: 4490, rank: 6, change: "down" },
  { id: 7, name: "Michael Brown", xp: 4350, rank: 7, change: "same" },
  { id: 8, name: "Lisa Taylor", xp: 4280, rank: 8, change: "up" },
  { id: 9, name: "Robert Wilson", xp: 4150, rank: 9, change: "down" },
  { id: 10, name: "Jennifer Lee", xp: 4020, rank: 10, change: "up" },
]

export function LeaderboardTable() {
  const [data] = useState(leaderboardData)

  return (
    <div className="rounded-md border border-slate-700">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 text-center">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="text-right">XP</TableHead>
            <TableHead className="w-12 text-center">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id} className="hover:bg-slate-800/50">
              <TableCell className="text-center font-medium">
                {student.rank <= 3 ? (
                  <div className="flex justify-center">
                    <Trophy
                      className={`h-4 w-4 ${
                        student.rank === 1
                          ? "text-yellow-400"
                          : student.rank === 2
                            ? "text-slate-300"
                            : "text-amber-600"
                      }`}
                    />
                  </div>
                ) : (
                  student.rank
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(0)}`} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{student.xp.toLocaleString()}</TableCell>
              <TableCell className="text-center">
                {student.change === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mx-auto" />
                ) : student.change === "down" ? (
                  <ArrowDown className="h-4 w-4 text-red-500 mx-auto" />
                ) : (
                  <Minus className="h-4 w-4 text-slate-500 mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

