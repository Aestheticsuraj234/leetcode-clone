"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { columns, type Problem } from "./columns"
import { DataTable } from "@/components/shared/data-table"


interface ProblemClientProps {
  data: Problem[]
  isAdmin: boolean
}

export const ProblemClient: React.FC<ProblemClientProps> = ({ data, isAdmin }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-end">
          <Link href="/problems/add">
            <Button>Create Problem</Button>
          </Link>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold mb-6">Problem Set</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

