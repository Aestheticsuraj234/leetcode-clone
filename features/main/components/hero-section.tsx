
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:py-40 overflow-hidden" id="hero">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[40rem] h-[40rem] rounded-full bg-indigo-500/10 blur-[100px] -z-10" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="px-3 py-1 text-sm rounded-full border border-indigo-400/30 bg-indigo-400/10 text-indigo-300">
                Mastering algorithms has never been easier
              </span>
            </motion.div>
            
            <motion.h1 
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Level Up Your<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Coding Skills
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of developers who are mastering algorithms, data structures, 
              and solving real interview questions with our interactive platform.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 w-full sm:w-auto">
                Start Practicing Now
              </Button>
              <Button variant="outline" size="lg" className="group w-full sm:w-auto">
                Explore Problems <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-10 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>Trusted by engineers from</p>
              <div className="mt-4 flex items-center justify-center lg:justify-start space-x-8">
                <div className="text-gray-400 font-semibold">Google</div>
                <div className="text-gray-400 font-semibold">Amazon</div>
                <div className="text-gray-400 font-semibold">Microsoft</div>
                <div className="text-gray-400 font-semibold">Meta</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-2xl opacity-20 -z-10" />
              <div className="bg-background border border-border/50 rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-900 px-4 py-2 border-b border-gray-800 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-sm text-gray-400">TwoSum.js</div>
                </div>
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code className="language-javascript text-gray-300">
{`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
    
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
      
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
      
    map.set(nums[i], i);
  }
    
  return [];
}`}
                  </code>
                </pre>
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
