'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Minus } from 'lucide-react'
import { createProblem } from '@/features/problems/actions'

export const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  tags: z.string().transform((str) => str.split(',').map((tag) => tag.trim())),
  example: z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string()
  }),
  constraints: z.string(),
  codeSnippet: z.string().optional(),
  testCases: z.object({
    public: z.array(z.object({
      input: z.string(),
      output: z.string()
    })),
    hidden: z.array(z.object({
      input: z.string(),
      output: z.string()
    }))
  }),
  hints: z.string().optional(),
  editorial: z.string().optional()
})

export default function CreateProblemPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'MEDIUM',
      tags: [],
      example: {
        input: '',
        output: '',
        explanation: ''
      },
      constraints: '',
      codeSnippet: '',
      testCases: {
        public: [{ input: '', output: '' }],
        hidden: [{ input: '', output: '' }]
      },
      hints: '',
      editorial: ''
    }
  })

  const { fields: publicFields, append: appendPublic, remove: removePublic } = useFieldArray({
    control: form.control,
    name: "testCases.public"
  })

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
    control: form.control,
    name: "testCases.hidden"
  })

  async function onSubmit(values: z.infer<typeof problemSchema>) {
  console.log(values)
    setIsSubmitting(true)
    try {
      const result = await createProblem(values)
     const {data , message , success , error } = result;

      if (success) {
        toast(message)
      }

      if (error) {
        toast(error)
      }

      console.log(data)

    } catch (error) {
      toast('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Problem</CardTitle>
          <CardDescription>Add a new coding problem to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Two Sum" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="array, hash-table, two-pointers" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separate tags with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Example</h3>
                <FormField
                  control={form.control}
                  name="example.input"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input</FormLabel>
                      <FormControl>
                        <Input placeholder="nums = [2,7,11,15], target = 9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="example.output"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Output</FormLabel>
                      <FormControl>
                        <Input placeholder="[0,1]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="example.explanation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="constraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Constraints</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="2 <= nums.length <= 104&#10;-109 <= nums[i] <= 109&#10;-109 <= target <= 109"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Code Snippet</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="function twoSum(nums: number[], target: number): number[] {}"
                        className="min-h-[100px] font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">Public Test Cases</h3>
                  {publicFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start mb-4">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`testCases.public.${index}.input`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Input {index + 1}</FormLabel>
                              <FormControl>
                                <Input placeholder="nums = [2,7,11,15], target = 9" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testCases.public.${index}.output`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Output {index + 1}</FormLabel>
                              <FormControl>
                                <Input placeholder="[0,1]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="mt-8"
                        onClick={() => removePublic(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendPublic({ input: '', output: '' })}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Public Test Case
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Hidden Test Cases</h3>
                  {hiddenFields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start mb-4">
                      <div className="flex-1 space-y-4">
                        <FormField
                          control={form.control}
                          name={`testCases.hidden.${index}.input`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Input {index + 1}</FormLabel>
                              <FormControl>
                                <Input placeholder="nums = [3,3], target = 6" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`testCases.hidden.${index}.output`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Output {index + 1}</FormLabel>
                              <FormControl>
                                <Input placeholder="[0,1]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="mt-8"
                        onClick={() => removeHidden(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendHidden({ input: '', output: '' })}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Hidden Test Case
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="hints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hints</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="1. A really brute force way would be to search for all possible pairs of numbers..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="editorial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Editorial</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="The solution involves using a hash map to store the complement..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Problem'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}