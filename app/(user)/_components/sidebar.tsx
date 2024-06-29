'use client'

import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IconType } from 'react-icons'
import { RiHome6Line, RiStarLine, RiDeleteBin7Line } from "react-icons/ri";

const SidebarItem = ({ label, path, icon: Icon }: { label: string, path: string, icon: IconType }) => {
    const pathname = usePathname();
    const isActive = pathname == path

    return (
        <Link href={path} className={cn('px-2 py-3 rounded-md w-full flex items-center gap-2', isActive ? 'bg-primary/20' : 'text-black/60')}>
            <Icon size={24} />
            <p className='font-medium'>{label}</p>
        </Link>
    )
}

const Sidebar = () => {
    return (
        <div className='bg-white px-3 py-5 w-full max-w-80 rounded-lg border-r'>
            <OrganizationSwitcher appearance={{ elements: { rootBox: { width: '100%' } } }} />
            <ul className='flex flex-col pt-5'>
                <SidebarItem label='Home' icon={RiHome6Line} path='/dashboard' />
                <SidebarItem label='Favorites' icon={RiStarLine} path='#' />
                <SidebarItem label='Trash' icon={RiDeleteBin7Line} path='#' />
            </ul>
        </div>
    )
}

export default Sidebar