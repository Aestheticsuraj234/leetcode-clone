import { motion } from "framer-motion"
import { Code, Layout, BookOpen, BarChart, Users, Zap } from "lucide-react"

const features = [
  {
    title: "Interactive Code Editor",
    description: "Write, compile, and run your code in 20+ programming languages with our advanced editor.",
    icon: Code,
  },
  {
    title: "2000+ Practice Problems",
    description: "From easy to hard, solve problems across various categories and difficulty levels.",
    icon: BookOpen,
  },
  {
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed statistics and achievements.",
    icon: BarChart,
  },
  {
    title: "Contest Preparation",
    description: "Prepare for coding competitions with mock contests and timed challenges.",
    icon: Zap,
  },
  {
    title: "Discussion Forums",
    description: "Learn from the community by discussing solution approaches and optimizations.",
    icon: Users,
  },
  {
    title: "Intuitive Interface",
    description: "Enjoy a clean, distraction-free environment designed for optimal focus.",
    icon: Layout,
  },
]

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  return (
    <motion.div 
      className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
        <feature.icon className="h-6 w-6 text-indigo-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  )
}

const FeaturesSection = () => {
  return (
    <section className="py-20 relative" id="features">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Everything you need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">ace your next interview</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform provides all the tools and resources needed to master technical interviews
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection