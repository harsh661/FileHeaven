import React from 'react'
import { RiSearchLine } from 'react-icons/ri'

const Searchbox = () => {
  return (
    <div className='flex items-center p-2 rounded-lg bg-neutral-200 text-black/60'>
        <RiSearchLine size={20}/>
        <input type="text" placeholder='Search' className='outline-none bg-transparent text-sm font-medium py-1 pl-2' />
    </div>
  )
}

export default Searchbox