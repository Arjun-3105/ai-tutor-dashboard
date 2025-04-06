"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { BookOpen, ClipboardCheck, HelpCircle, Home, LogOut, Menu, PenTool, Settings, Folder } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  setOpen?: (open: boolean) => void
}

export function DashboardSidebar({ className, open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const [journalsOpen, setJournalsOpen] = useState(true)
  const [spacesOpen, setSpacesOpen] = useState(true)

  const routes = [
    {
      label: "Profile",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Learning",
      icon: BookOpen,
      href: "/dashboard/learning",
      active: pathname === "/dashboard/learning",
    },
    {
      label: "Testing",
      icon: ClipboardCheck,
      href: "/dashboard/testing",
      active: pathname === "/dashboard/testing",
    },
    {
      label: "Doubt Clearing",
      icon: HelpCircle,
      href: "/dashboard/doubt-clearing",
      active: pathname === "/dashboard/doubt-clearing",
    },
    {
      label: "Journals",
      icon: PenTool,
      href: "/dashboard/journals",
      active: pathname === "/dashboard/journals",
    },
    {
      label: "Spaces",
      icon: Folder,
      href: "/dashboard/spaces",
      active: pathname === "/dashboard/spaces",
    },
  ]

  const sidebar = (
    <div className={cn("pb-12 h-full flex flex-col", className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">AI Tutor</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-accent",
                  route.active ? "bg-blue-500/10 text-blue-500" : ""
                )}
              >
                <route.icon className={cn("h-4 w-4", route.active ? "text-blue-500" : "")} />
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <h2
              className="px-2 text-lg font-semibold tracking-tight cursor-pointer flex items-center"
              onClick={() => setJournalsOpen(!journalsOpen)}
            >
              JOURNALS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("ml-auto h-4 w-4 transition-transform", journalsOpen ? "transform rotate-180" : "")}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </h2>
          </div>
          {journalsOpen && (
            <div className="mt-2 space-y-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-accent"
              >
                <PenTool className="h-4 w-4" />
                Untitled
              </Link>
            </div>
          )}
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <h2
              className="px-2 text-lg font-semibold tracking-tight cursor-pointer flex items-center"
              onClick={() => setSpacesOpen(!spacesOpen)}
            >
              SPACES
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn("ml-auto h-4 w-4 transition-transform", spacesOpen ? "transform rotate-180" : "")}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </h2>
          </div>
          {spacesOpen && (
            <div className="mt-2 space-y-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-accent"
              >
                <Folder className="h-4 w-4" />
                Maths
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="space-y-1">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-accent",
              pathname === "/dashboard/settings" ? "bg-blue-500/10 text-blue-500" : "",
            )}
          >
            <Settings className={cn("h-4 w-4", pathname === "/dashboard/settings" ? "text-blue-500" : "")} />
            Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary hover:bg-accent text-red-500"
          >
            <LogOut className="h-4 w-4 text-red-500" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:block border-r bg-background h-screen w-64 fixed">
        <ScrollArea className="h-full">{sidebar}</ScrollArea>
      </aside>
      <div className="lg:pl-64">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <ScrollArea className="h-full">{sidebar}</ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

