import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currentUser } from "@/features/auth/actions";
import { getAllProblems } from "@/features/problems/actions";
import { CheckCircle2, ChevronDown, Circle, Filter, ListFilter, Search, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const isAdmin = user?.role === "ADMIN";
  const problems = await getAllProblems();
 
  

  return (
    <div className="min-h-screen bg-background text-foreground ">
      {isAdmin && (
        <div className="flex flex-row w-full justify-center items-end">
          <Link href={"/problems/add"}>
            <Button variant={"outline"} size={"default"}>
              Create Problem
            </Button>
          </Link>
        </div>
      )}

      
<div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Problem Set</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search questions" className="pl-10" />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Difficulty" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Tags" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                <SelectItem value="arrays">Arrays</SelectItem>
                <SelectItem value="strings">Strings</SelectItem>
                <SelectItem value="dp">Dynamic Programming</SelectItem>
                <SelectItem value="trees">Trees</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
             
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Title</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Difficulty</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Tags</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      {problem.problemSolved[0]?.isSolved === true ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) 
                       : (
                        <Circle className="w-5 h-5 text-muted-foreground/30" />
                      )}
                    </td>
               
                    <td className="py-3 px-4">
                      <Link href={`/problems/${problem.id}`} className="text-primary hover:underline font-medium">
                        {problem.title}
                      </Link>
                      
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          problem.difficulty === "EASY"
                            ? "success"
                            : problem.difficulty === "MEDIUM"
                              ? "warning"
                              : "destructive"
                        }
                        className="font-medium"
                      >
                        {problem.difficulty}
                      </Badge>
                    </td>
           
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 1-10 of 2,500 problems</div>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8">
                3
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;


