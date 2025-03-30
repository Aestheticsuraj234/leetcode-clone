import {  ModeToggle } from '@/components/shared/mode-toggle'
import UserButton from '@/features/auth/components/user-button'
import { Code } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Code className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">CodePractice</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/problems" className="text-sm font-medium hover:text-primary transition-colors">
          Problems
        </Link>
        <Link href="/contest" className="text-sm font-medium hover:text-primary transition-colors">
          Contest
        </Link>
        <Link href="/discuss" className="text-sm font-medium hover:text-primary transition-colors">
          Discuss
        </Link>
        <Link href="/interview" className="text-sm font-medium hover:text-primary transition-colors">
          Interview
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <ModeToggle/>
      <UserButton/>
      </div>
    </div>
  </header>
  )
}

export default Navbar