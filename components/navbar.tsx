"use client";

import React, { useState } from 'react'
import Button from './ui/button'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { LuMenu } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { cn } from '@/lib/utils';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='fixed w-full h-16 flex items-center px-5 py-2 bg-off-white border-b z-10'>
                <div className='flex-[2] flex text-lg lg:text-2xl font-medium'>
                    <Link href={'/'} className='flex items-center gap-1 md:gap-2'>
                        <svg width="60" height="60" viewBox="0 0 31 31" className='w-10 lg:w-14'>
                            <path xmlns="http://www.w3.org/2000/svg" d="M27.86 20a5.25 5.25 0 0 1-4.09 2H14.5a1.5 1.5 0 0 0-1.5 1.48v3.27l1.08-1.62a.5.5 0 0 1 .83.55l-2 3a.5.5 0 0 1-.16.15.45.45 0 0 1-.45 0 .5.5 0 0 1-.12-.11l-2-3a.5.5 0 0 1 .83-.55l.99 1.59v-3.28a2.48 2.48 0 0 1 .74-1.78 2.43 2.43 0 0 1 1.77-.7h9.26a4.26 4.26 0 0 0 3.32-1.58 4.3 4.3 0 0 0 .85-3.61 4.18 4.18 0 0 0-1.73-2.57 4.25 4.25 0 0 0-4.42-.24 6.47 6.47 0 0 1-2.49 4.17.5.5 0 1 1-.6-.8 5.47 5.47 0 0 0 2.14-3.76 4.4 4.4 0 0 0 0-.6 5.36 5.36 0 0 0-3.5-5.12 5.56 5.56 0 0 0-5.11.66A5.48 5.48 0 0 0 10 12a.56.56 0 0 1-.15.49.52.52 0 0 1-.47.15 4.27 4.27 0 1 0-2.07 8.28h2.21a1.6 1.6 0 0 0 1.07-.44 1.5 1.5 0 0 0 .41-1.07v-3.26l-1.08 1.63a.5.5 0 1 1-.83-.55l2-3a.48.48 0 0 1 .78 0l2 3a.5.5 0 1 1-.83.55L12 16.15v3.26a2.48 2.48 0 0 1-.74 1.77 2.63 2.63 0 0 1-1.78.73H7.1A5.27 5.27 0 0 1 9 11.51a6.48 6.48 0 0 1 8.71-5.61 6.35 6.35 0 0 1 4.17 5.92 5.26 5.26 0 0 1 4.89.59 5.2 5.2 0 0 1 2.15 3.19 5.3 5.3 0 0 1-1.06 4.4" stroke='#216D66' strokeWidth={1} />
                        </svg>
                        <p className='text-black/80'>File<span className='text-black/60'>Heaven</span></p>
                    </Link>
                </div>
                <div className='hidden md:block flex-1'>
                    <ul className='flex items-center justify-center w-max mx-auto font-medium text-black'>
                        <li className='cursor-pointer py-2 px-5 opacity-80 hover:opacity-90'>Features</li>
                        <li className='cursor-pointer py-2 px-5 opacity-80 hover:opacity-90'>About</li>
                        <li className='cursor-pointer py-2 px-5 opacity-80 hover:opacity-90'>Pricing</li>
                    </ul>
                </div>

                <div className='flex-[2] hidden md:flex items-center justify-end gap-5'>
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button>Dashboard</Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <Link href={'/sign-in'}>
                            <Button variant='outline'>Log in</Button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <Button>Sign up</Button>
                        </Link>
                    </SignedOut>
                </div>
                <div onClick={() => setOpen(prev => !prev)} className='md:hidden cursor-pointer'>
                    {open ? <CgClose size={24} /> : <LuMenu size={24} />}
                </div>
            </div>

            <div className={cn('md:hidden bg-white shadow-md w-4/5 top-16 bottom-0 fixed z-30 flex flex-col duration-300', open ? 'right-0' : '-right-full')}>
                <ul className='flex-1 flex flex-col items-center w-max mx-auto font-medium text-black text-xl py-10'>
                    <li className='cursor-pointer py-4 opacity-80 hover:opacity-90'>Features</li>
                    <li className='cursor-pointer py-4 opacity-80 hover:opacity-90'>About</li>
                    <li className='cursor-pointer py-4 opacity-80 hover:opacity-90'>Pricing</li>
                </ul>
                <div className='flex items-center justify-center gap-5 py-10'>
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button>Dashboard</Button>
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <Link href={'/sign-in'}>
                            <Button variant='outline'>Log in</Button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <Button>Sign up</Button>
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </>
    )
}

export default Navbar