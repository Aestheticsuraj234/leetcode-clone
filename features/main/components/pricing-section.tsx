import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual learners",
    features: [
      "50+ easy problems",
      "Basic code editor",
      "Community forums access",
      "Solution explanations",
      "Problem discussions",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Best for serious learners",
    features: [
      "All 2000+ problems",
      "Advanced code editor",
      "Step-by-step solutions",
      "Contest participation",
      "Progress tracking",
      "Mock interviews",
      "Company-specific practice",
    ],
    cta: "Upgrade Now",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    description: "For teams preparing together",
    features: [
      "All Premium features",
      "Team progress dashboard",
      "Collaborative problem solving",
      "Custom problem sets",
      "Team leaderboards",
      "Interview preparation toolkit",
    ],
    cta: "Contact Sales",
    highlight: false,
  }
]

const PricingSection = () => {
  return (
    <section className="py-24 relative" id="pricing">
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
            Simple, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">transparent pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that's right for you, whether you're just starting out or preparing for your dream job
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`rounded-xl border ${
                plan.highlight 
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-purple-500/10" 
                  : "border-gray-800 bg-gray-900/50"
              } overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.highlight && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-1.5 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mr-2" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button 
                    className={`w-full ${
                      plan.highlight 
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
                        : ""
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection