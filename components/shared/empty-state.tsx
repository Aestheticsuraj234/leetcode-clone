import Image from 'next/image'
import React from 'react'

interface Props{
    imageUrl?:string;
    title?:string;
    description?:string;
    onClick?:()=>void;
}


const EmptyState = ({
    imageUrl,
    title,
    description,
    onClick
}:Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 '>
        <Image
            src={imageUrl!}
            alt='Empty state image'
            width={300}
            height={300}
            className='object-contain'
        />

        <h1 className='text-2xl font-semibold text-center'>{title}</h1>
        <p className='text-gray-500 text-center font-semibold italic'>
            {description}
        </p>

        {onClick && (
            <button
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
                onClick={onClick}
            >
                Try again
            </button>
        )}
    </div>
  )
}

export default EmptyState