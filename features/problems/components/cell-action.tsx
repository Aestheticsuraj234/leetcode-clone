"use client"

import type React from "react"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, CheckIcon, MoreHorizontal, PencilIcon, Share2Icon, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"


import type { Problem } from "./columns"
import { toast } from "sonner"

interface CellActionProps {
  data: Problem
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSolve = async () => {
    try {
      setLoading(true)
      // Call your API to mark problem as solved
      // await markProblemAsSolved(data.id)

      toast("Problem solved")
      router.refresh()
    } catch (error) {
      toast("Error solving problem")
    } finally {
      setLoading(false)
    }
  }

  const onBookmark = async () => {
    try {
      setLoading(true)
      // Call your API to bookmark problem
      // await bookmarkProblem(data.id)

      toast("Problem bookmarked")
    } catch (error) {
      toast("Error bookmarking problem")
    } finally {
      setLoading(false)
    }
  }

  const onEdit = () => {
    router.push(`/problems/edit/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      // Call your API to delete problem
      // await deleteProblem(data.id)

      toast("Problem deleted")
      router.refresh()
    } catch (error) {
      toast("Error deleting problem")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/problems/${data.id}`)}>
          <CheckIcon className="mr-2 h-4 w-4" />
          Solve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onBookmark}>
          <BookmarkIcon className="mr-2 h-4 w-4" />
          Bookmark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Share2Icon className="mr-2 h-4 w-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

