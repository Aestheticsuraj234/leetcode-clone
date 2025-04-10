import Navbar from '@/features/main/components/navbar'
import React from 'react'

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    
    <Navbar/>
    <main className='flex justify-center items-center mt-4 container mx-auto'>
        {children}
    </main>
    </>
  )
}

export default RootLayout