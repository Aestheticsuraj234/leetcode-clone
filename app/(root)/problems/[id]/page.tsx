import { getProblemById } from '@/features/problems/actions'
import ProblEditor from '@/features/problems/components/problem-editor';
import React from 'react'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const paramsId =  (await (params)).id
    const problemData = await getProblemById(paramsId);
console.log(problemData)


  return (
    // @ts-ignore
    problemData ? <ProblEditor data={problemData} /> : <div>Problem not found</div>
  )
}

export default page