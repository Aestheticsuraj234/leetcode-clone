import EmptyState from '@/components/shared/empty-state';
import { getProblemById } from '@/features/problems/actions'
import ProblEditor from '@/features/problems/components/problem-editor';
import React from 'react'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const paramsId =  (await (params)).id
    const problemData = await getProblemById(paramsId);


  return (
    // @ts-ignore
    problemData ? <ProblEditor data={problemData} /> : <EmptyState imageUrl='/empty-state.svg' title='Problem not found' description='The problem you are looking for does not exist or has been removed.' onClick={() => window.location.reload()}/>
  )
}

export default page