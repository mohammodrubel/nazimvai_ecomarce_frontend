import React from 'react'

function PageHeader({title}) {
  return (
    <div className='w-[100%] font-bold text-2xl sm:text-4xl md:text-6xl h-[300px] flex justify-center items-center capitalize'>
        {title}
    </div>
  )
}

export default PageHeader