"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Clock,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Share2,
  Home,
  Settings,
  LayoutTemplate,
  FileCode,
  Info,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Terminal,
  Lightbulb,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import * as monaco from "monaco-editor"

interface Props {
  data: {
    id: string
    title: string
    description: string
    difficulty: "EASY" | "MEDIUM" | "HARD"
    tags: string[]
    completed: boolean
    userId: string
    example: string // JSON string, needs parsing
    constraints: string
    codeSnippet: string
    testCases: string // JSON string, needs parsing
    hints: string
    editorial: string
    problemSolved: any[] // Needs further definition
  }
}

const defaultCode = {
  typescript: `function twoSum(nums: number[], target: number): number[] {
    // Write your solution here
}`,
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your solution here
        pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
    }
}`,
}

const ProblEditor = ({ data }: Props) => {
  const [language, setLanguage] = useState("typescript")
  const [isRunning, setIsRunning] = useState(false)
  const [hasResult, setHasResult] = useState(false)
  const [executionResult, setExecutionResult] = useState<{
    stdout: string | null
    stderr: string | null
    compileOutput: string | null
    status: string
    memory?: string
    time?: string
  } | null>(null)

  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [editorValue, setEditorValue] = useState(
    data.codeSnippet || defaultCode[language as keyof typeof defaultCode] || "",
  )

  // Parse the test cases JSON string
  const testCases = JSON.parse(data.testCases)
  const example = JSON.parse(data.example)

  // Configure Monaco editor
  useEffect(() => {
    // Define editor themes
    monaco.editor.defineTheme("leetcodeDark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6a9955" },
        { token: "keyword", foreground: "c586c0" },
        { token: "string", foreground: "ce9178" },
        { token: "number", foreground: "b5cea8" },
        { token: "regexp", foreground: "d16969" },
        { token: "type", foreground: "4ec9b0" },
        { token: "function", foreground: "dcdcaa" },
        { token: "variable", foreground: "9cdcfe" },
        { token: "variable.predefined", foreground: "4fc1ff" },
      ],
      colors: {
        "editor.background": "#1e1e1e",
        "editor.foreground": "#d4d4d4",
        "editorCursor.foreground": "#d4d4d4",
        "editor.lineHighlightBackground": "#2d2d2d",
        "editorLineNumber.foreground": "#858585",
        "editor.selectionBackground": "#264f78",
        "editor.inactiveSelectionBackground": "#3a3d41",
        "editorIndentGuide.background": "#404040",
      },
    })
  }, [])

  // Initialize or update the editor
  useEffect(() => {
    if (!editorRef.current) return

    // Save current value if editor exists
    if (monacoRef.current) {
      setEditorValue(monacoRef.current.getValue())
      monacoRef.current.dispose()
    }

    // Create editor with updated language
    monacoRef.current = monaco.editor.create(editorRef.current, {
      value: data.codeSnippet || defaultCode[language as keyof typeof defaultCode] || editorValue,
      language:
        language === "typescript"
          ? "typescript"
          : language === "javascript"
            ? "javascript"
            : language === "python"
              ? "python"
              : "java",
      theme: "leetcodeDark",
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: "on",
      renderLineHighlight: "all",
      scrollbar: {
        useShadows: false,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        vertical: "visible",
        horizontal: "visible",
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
      },
      padding: {
        top: 10,
        bottom: 10,
      },
      cursorBlinking: "smooth",
      wordWrap: "on",
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "smart",
    })

    // Handle language change by updating the model
    const currentValue = monacoRef.current.getValue()
    const newModel = monaco.editor.createModel(
      currentValue,
      language === "typescript"
        ? "typescript"
        : language === "javascript"
          ? "javascript"
          : language === "python"
            ? "python"
            : "java",
    )
    monacoRef.current.setModel(newModel)

    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose()
      }
    }
  }, [language, data.codeSnippet])

  // Function to submit code to Judge0
  const submitCodeToJudge0 = async (sourceCode: string, languageId: number, stdin = "") => {
    try {
      const response = await axios.post("http://localhost:2358/submissions?base64_encoded=false&wait=false", {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin,
      })

      return response.data.token
    } catch (error) {
      console.error("Error submitting code to Judge0:", error)
      throw error
    }
  }

  // Function to check execution status
  const checkExecutionStatus = async (token: string) => {
    try {
      const response = await axios.get(`http://localhost:2358/submissions/${token}?base64_encoded=false`)

      const { status, stdout, stderr, compile_output, memory, time } = response.data

      if (status.id <= 2) {
        return null
      }

      return {
        stdout: stdout || null,
        stderr: stderr || null,
        compileOutput: compile_output || null,
        status: status.description,
        memory: memory ? `${memory} KB` : undefined,
        time: time ? `${time} s` : undefined,
      }
    } catch (error) {
      console.error("Error checking execution status:", error)
      throw error
    }
  }

  // Handle the "Run" button click
  const handleRun = async () => {
    setIsRunning(true)
    setExecutionResult(null)
    setHasResult(false)

    try {
      // Get the current code from the editor
      const sourceCode = monacoRef.current?.getValue() || data.codeSnippet
      const languageId = getLanguageId(language)
      const stdin = testCases.public[0].input

      // Submit the code to Judge0
      const token = await submitCodeToJudge0(sourceCode, languageId, stdin)

      // Poll for execution status
      let result = null
      let attempts = 0
      const maxAttempts = 30 // Timeout after 30 seconds

      while (!result && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
        result = await checkExecutionStatus(token)
        attempts++
      }

      // Update the execution result
      if (result) {
        setExecutionResult(result)
        setHasResult(true)
      } else {
        setExecutionResult({
          stdout: null,
          stderr: null,
          compileOutput: null,
          status: "Timeout: Execution took too long",
        })
        setHasResult(true)
      }
    } catch (error) {
      console.error("Error executing code:", error)
      setExecutionResult({
        stdout: null,
        stderr: "An error occurred while executing your code.",
        compileOutput: null,
        status: "Error",
      })
      setHasResult(true)
    } finally {
      setIsRunning(false)
    }
  }

  // Map language names to Judge0 language IDs
  const getLanguageId = (language: string): number => {
    const LANGUAGE_IDS = {
      typescript: 74,
      javascript: 63,
      python: 71,
      java: 62,
    }
    return LANGUAGE_IDS[language as keyof typeof LANGUAGE_IDS] || 74
  }

  // Handle reset button
  const handleReset = () => {
    if (monacoRef.current) {
      monacoRef.current.setValue(data.codeSnippet || defaultCode[language as keyof typeof defaultCode] || "")
    }
  }

  // Parse constraints for better display
  const constraintsList = data.constraints.split("\n").filter(Boolean)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/problems">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-lg font-medium capitalize">{data.title}</span>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <LayoutTemplate className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Problem description */}
        <div className="w-[40%] border-r border-border overflow-y-auto">
          <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-10">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-xl font-bold capitalize">{data.title}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 pb-4">
              <div
                className={`px-2 py-1 rounded text-sm font-medium ${
                  data.difficulty === "EASY"
                    ? "bg-green-500/20 text-green-500"
                    : data.difficulty === "MEDIUM"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                }`}
              >
                {data.difficulty}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>15 mins</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>Discussion</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Lightbulb className="h-4 w-4" />
                <span>Hints</span>
              </div>
            </div>

            <div className="border-t border-border px-4 py-2">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="p-4">
            <div className="prose prose-invert max-w-none">
              <p>{data.description}</p>

              <h3>Example:</h3>
              <pre className="bg-muted p-3 rounded-md">
                <code>Input: {example.input}</code>
                <br />
                <code>Output: {example.output}</code>
                <p>{example.explanation}</p>
              </pre>

              <h3>Constraints:</h3>
              <ul>
                {constraintsList.map((constraint: string, index: number) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-4 flex gap-3 mt-6">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-500 font-medium mb-1">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3>Hints:</h3>
                <div className="bg-muted p-3 rounded-md">
                  <p>{data.hints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-border p-2 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px] h-9 border-0 bg-transparent focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1" onClick={handleRun} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <span className="animate-spin h-4 w-4 mr-1 border-2 border-primary border-t-transparent rounded-full" />
                    Running
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-primary" />
                    Run
                  </>
                )}
              </Button>
              <Button size="sm" className="h-9 gap-1 bg-green-600 hover:bg-green-700">
                <Check className="h-4 w-4" />
                Submit
              </Button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div ref={editorRef} className="h-full w-full" />
          </div>

          <div className="border-t border-border">
            <Tabs defaultValue="testcase">
              <div className="px-4 pt-2 bg-muted/30">
                <TabsList>
                  <TabsTrigger value="testcase" className="gap-2">
                    <Terminal className="h-4 w-4" />
                    Testcase
                  </TabsTrigger>
                  <TabsTrigger value="result" className="gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Result
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="testcase" className="p-4 max-h-[200px] overflow-auto">
                <pre className="bg-muted p-3 rounded-md">
                  <code>{testCases.public[0].input}</code>
                </pre>
              </TabsContent>
              <TabsContent value="result" className="p-4 max-h-[200px] overflow-auto">
                {hasResult ? (
                  <div className="flex flex-col gap-3">
                    {executionResult?.status === "Accepted" ? (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Accepted</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">{executionResult?.status || "Error"}</span>
                      </div>
                    )}

                    {(executionResult?.memory || executionResult?.time) && (
                      <div className="grid grid-cols-2 gap-4">
                        {executionResult.memory && (
                          <div className="bg-muted p-3 rounded-md">
                            <div className="text-sm text-muted-foreground mb-1">Memory</div>
                            <div className="font-medium">{executionResult.memory}</div>
                            <div className="text-xs text-muted-foreground">Beats 73.18% of submissions</div>
                          </div>
                        )}
                        {executionResult.time && (
                          <div className="bg-muted p-3 rounded-md">
                            <div className="text-sm text-muted-foreground mb-1">Runtime</div>
                            <div className="font-medium">{executionResult.time}</div>
                            <div className="text-xs text-muted-foreground">Beats 85.42% of submissions</div>
                          </div>
                        )}
                      </div>
                    )}

                    {executionResult?.stdout && (
                      <pre className="bg-muted p-3 rounded-md">
                        <code>Output: {executionResult.stdout}</code>
                      </pre>
                    )}
                    {executionResult?.stderr && (
                      <pre className="bg-red-500/10 p-3 rounded-md text-red-500">
                        <code>Error: {executionResult.stderr}</code>
                      </pre>
                    )}
                    {executionResult?.compileOutput && (
                      <pre className="bg-yellow-500/10 p-3 rounded-md text-yellow-500">
                        <code>Compile Output: {executionResult.compileOutput}</code>
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Run code to see results
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblEditor

