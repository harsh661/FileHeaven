import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Searchbox from './searchbox'

const Header = () => {
    return (
        <div className='py-5 flex flex-col md:flex-row md:items-center border-b-2'>
            <p className='text-2xl font-semibold flex-1'>Welcome back</p>
            <div className='flex-1 flex gap-5 items-center md:justify-end mt-2 md:mt-0'>
                <Searchbox />
                <div className='hidden lg:block'>
                    <UserButton
                        showName
                        appearance={{
                            elements: {
                                userButtonBox: { flexFlow: 'row-reverse', padding: '4px 8px' },
                                userButtonOuterIdentifier: { fontSize: '14px', paddingLeft: 0 }
                            }
                        }} />
                </div>
            </div>
        </div>
    )
}

export default Header