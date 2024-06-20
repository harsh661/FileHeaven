import React from 'react'
import Button from './ui/button'
import Link from 'next/link'
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <div className='fixed w-full h-16 flex items-center px-5 py-2'>
            <div className='flex text-2xl font-semibold mr-10'>
                <Link href={'/'}>FileHeaven</Link>
            </div>

            <ul className='flex items-center space-x-5 flex-1'>
                <li className='cursor-pointer '>Home</li>
                <li className='cursor-pointer '>About</li>
                <li className='cursor-pointer '>Dashboard</li>
            </ul>

            <SignedIn>
                <OrganizationSwitcher appearance={{elements: {userPreviewAvatarBox: {scale: '1.5'}, organizationPreviewAvatarBox: {scale: '1.5'}}}} />
                <UserButton appearance={{elements: {avatarBox: {scale: '1.2'}}}} />
            </SignedIn>

            <SignedOut>
                <div className='flex-[2] flex items-center justify-end gap-5'>
                    <Link href={'/sign-in'}>
                        <Button variant='outline'>Log in</Button>
                    </Link>
                    <Link href={'/sign-up'}>
                        <Button>Sign up</Button>
                    </Link>
                </div>
            </SignedOut>
        </div>
    )
}

export default Navbar