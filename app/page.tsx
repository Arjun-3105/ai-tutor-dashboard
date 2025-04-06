import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">AI Tutor</h1>
          <p className="text-gray-400">Your personalized learning companion powered by AI</p>
        </div>
        <div className="space-y-4">
          <Link href="/dashboard">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              Get Started
            </Button>
          </Link>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

