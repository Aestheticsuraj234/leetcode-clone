"use client"

import { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"

interface CodeEditorProps {
  language: string
  initialCode?: string
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

export default function CodeEditor({ language, initialCode }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [editorValue, setEditorValue] = useState(initialCode || defaultCode[language as keyof typeof defaultCode] || "")

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
      value: initialCode || defaultCode[language as keyof typeof defaultCode] || editorValue,
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
  }, [language, editorValue, initialCode])

  return <div ref={editorRef} className="h-full w-full" />
}

