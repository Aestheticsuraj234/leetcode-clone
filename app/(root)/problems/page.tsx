import { currentUser } from "@/features/auth/actions"
import { getAllProblems } from "@/features/problems/actions"
import { ProblemClient } from "@/features/problems/components/client"



const ProblemsPage = async () => {
  const user = await currentUser()
  const isAdmin = user?.role === "ADMIN"
  const problems = await getAllProblems()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* @ts-ignore */}
        <ProblemClient data={problems} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

export default ProblemsPage

