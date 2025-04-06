"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"

import { CellAction } from "./cell-action"

// Define the Problem type based on your data structure
export type Problem = {
  id: string
  title: string
  description: string
  difficulty: "EASY" | "MEDIUM" | "HARD"
  tags: string[]
  completed: boolean
  problemSolved: { isSolved: boolean }[]
  // Add other fields as needed
}

export const columns: ColumnDef<Problem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const problem = row.original
      const isSolved = problem.problemSolved[0]?.isSolved === true

      return (
        <div className="flex items-center justify-center">
          {isSolved ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground/30" />
          )}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const problem = row.original

      return (
        <Link href={`/problems/${problem.id}`} className="text-primary hover:underline font-medium">
          {problem.title}
        </Link>
      )
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string

      return (
        <Badge
          variant={difficulty === "EASY" ? "success" : difficulty === "MEDIUM" ? "warning" : "destructive"}
          className="font-medium"
        >
          {difficulty}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[]

      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-xs">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">+{tags.length - 3}</span>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const tags = row.getValue(id) as string[]
      return value.some((val: string) => tags.includes(val))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

