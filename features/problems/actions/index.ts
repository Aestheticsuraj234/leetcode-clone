"use server";
import { problemSchema } from "@/app/(root)/problems/add/page";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db";
import { z } from "zod";


export const createProblem = async (data:z.infer<typeof problemSchema>)=>{
    const user = await currentUser();

    if(user?.role !=="ADMIN"){
        return {error:"You are not authorized to create a problem."}
    }

    if (!user?.id) {
        return { error: "User ID is missing." };
    }

    const problem = await db.problem.create({
        data:{
            userId: user.id,
            title: data.title,
            description: data.description,
            difficulty: data.difficulty,
            tags: data.tags,
            example: JSON.stringify(data.example),
            constraints: data.constraints,
            codeSnippet: data.codeSnippet,
            testCases: JSON.stringify(data.testCases),
            hints: data.hints,
            editorial: data.editorial
        }
    });

    return {
        data:problem,
        success:true,
        message:"Problem created successfully!"
    }

}


export const getAllProblems = async ()=>{
    const user = await currentUser();
    const problems = await db.problem.findMany(
        {
            include:{
                problemSolved:{
                    where:{
                        userId:user?.id
                    },
                    select:{
                        problemId: true,
                        isSolved: true
                    }
                }
            }
        }
    );

    return problems;
}


export const getProblemById = async (id:string)=>{
    const problem = await db.problem.findUnique({
        where:{id},
        include:{problemSolved:true}
    });
    return problem;
}