
import { motion } from "framer-motion"
import { Check, ExternalLink } from "lucide-react"

const problems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Table"], completed: true },
  { id: 2, title: "Add Two Numbers", difficulty: "Medium", tags: ["Linked List", "Math"], completed: true },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["String", "Sliding Window"], completed: false },
  { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Array", "Binary Search"], completed: false },
  { id: 5, title: "Longest Palindromic Substring", difficulty: "Medium", tags: ["String", "Dynamic Programming"], completed: false },
]

const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard"): string => {
  switch (difficulty) {
    case "Easy": return "text-green-400";
    case "Medium": return "text-yellow-400";
    case "Hard": return "text-red-400";
    default: return "text-gray-400";
  }
}

const ProblemListSection = () => {
  return (
    <section className="py-24 relative" id="problems">
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 blur-[100px]" />
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
            Diverse <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Problem Set</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tackle a wide range of problems from easy to hard, covering all the common interview topics
          </p>
        </motion.div>
        
        <motion.div 
          className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-medium">Top Interview Problems</h3>
            <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
              View All <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Tags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {problems.map((problem, index) => (
                  <motion.tr 
                    key={problem.id}
                    className="hover:bg-gray-800/30 cursor-pointer transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {problem.completed ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                          <Check className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-600">
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{problem.title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getDifficultyColor(problem.difficulty as "Easy" | "Medium" | "Hard")}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-t border-gray-800 flex justify-between items-center">
            <span className="text-sm text-gray-400">Showing 5 of 2000+ problems</span>
            <span className="text-sm font-medium text-indigo-400">Filter by difficulty, tags, and more →</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemListSection