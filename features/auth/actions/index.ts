"use server";

import { db } from "@/lib/db";
import {auth} from "@/auth";


export const getUserById = async (id:string)=>{
    try {
        const user = await db.user.findUnique({
            where:{id},
            include:{accounts:true}
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccountByUserId = async (userId:string)=>{
    try {
        const account = await db.account.findFirst({
            where:{
                userId
            }
        })
        return account
    } catch (error) {
        console.log(error)
        return null
    }
}



export const currentUser = async()=>{
    const session = await auth();
    return session?.user;
}

export const currentRole= async()=>{
    const session = await auth();
    return session?.user.role;
}

