import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const CodeEditorShowcase = () => {
  const [activeTab, setActiveTab] = useState("python")
  
  const handleRunCode = () => {
    // In a real app, this would run the code
    console.log("Running code:", activeTab)
  }
  
  return (
    <section className="py-24 relative" id="editor">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent" />
      
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[30rem] h-[30rem] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Code Editor</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Write, run, and debug your code in a powerful editor with syntax highlighting, autocomplete, and more
          </p>
        </motion.div>
        
        <motion.div 
          className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-sm text-gray-400">Problem: Merge Two Sorted Lists</div>
            <div />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-4 border-b lg:border-b-0 lg:border-r border-gray-800">
              <h3 className="text-xl font-semibold mb-4">Problem Description</h3>
              <p className="text-muted-foreground mb-4">
                Merge two sorted linked lists and return it as a sorted list. 
                The list should be made by splicing together the nodes of the first two lists.
              </p>
              
              <div className="mt-6">
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Example:</h4>
                  <div className="bg-gray-800/50 p-3 rounded text-sm">
                    <p>Input: l1 = [1,2,4], l2 = [1,3,4]</p>
                    <p>Output: [1,1,2,3,4,4]</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Constraints:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>The number of nodes in both lists is in the range [0, 50].</li>
                    <li>-100 &lt;= Node.val &lt;= 100</li>
                    <li>Both l1 and l2 are sorted in non-decreasing order.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <Tabs defaultValue="python" className="mb-4" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="java">Java</TabsTrigger>
                </TabsList>
                <TabsContent value="python" className="mt-4">
                  <pre className="p-4 text-sm bg-gray-800/50 rounded-md font-mono overflow-auto">
                    <code className="language-python text-gray-300">
{`# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        # Create a dummy head
        dummy = ListNode(-1)
        current = dummy
        
        # Traverse both lists
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        # Attach remaining nodes
        current.next = l1 if l1 else l2
        
        return dummy.next`}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="javascript" className="mt-4">
                  <pre className="p-4 text-sm bg-gray-800/50 rounded-md font-mono overflow-auto">
                    <code className="language-javascript text-gray-300">
{`/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    // Create a dummy head
    const dummy = new ListNode(-1);
    let current = dummy;
    
    // Traverse both lists
    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    // Attach remaining nodes
    current.next = l1 !== null ? l1 : l2;
    
    return dummy.next;
};`}
                    </code>
                  </pre>
                </TabsContent>
                <TabsContent value="java" className="mt-4">
                  <pre className="p-4 text-sm bg-gray-800/50 rounded-md font-mono overflow-auto">
                    <code className="language-java text-gray-300">
{`/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        // Create a dummy head
        ListNode dummy = new ListNode(-1);
        ListNode current = dummy;
        
        // Traverse both lists
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = l1 != null ? l1 : l2;
        
        return dummy.next;
    }
}`}
                    </code>
                  </pre>
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Reset</Button>
                  <Button variant="outline" size="sm">Format</Button>
                </div>
                <Button 
                  onClick={handleRunCode}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Run Code
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CodeEditorShowcase