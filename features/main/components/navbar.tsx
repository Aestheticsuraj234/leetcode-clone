"use client"

import { ModeToggle } from '@/components/shared/mode-toggle'
import UserButton from '@/features/auth/components/user-button'
import { cn } from '@/lib/utils'
import { Code } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  const isActiveClass = (path: string) => isActive(path) ? 'text-indigo-400 border-1 px-2 py-1 rounded-md transition-all ease-in' : 'text-gray-400'

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CodePractice</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/problems" className={cn("text-sm font-medium hover:text-primary transition-colors", isActiveClass("/problems"))}>
            Problems
          </Link>
          <Link href="/contest" className={cn("text-sm font-medium hover:text-primary transition-colors", isActiveClass("/contest"))}>
            Contest
          </Link>
          <Link href="/discuss" className={cn("text-sm font-medium hover:text-primary transition-colors", isActiveClass("/discuss"))}>
            Discuss
          </Link>
          <Link href="/interview" className={cn("text-sm font-medium hover:text-primary transition-colors", isActiveClass("/interview"))}>
            Interview
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Navbar