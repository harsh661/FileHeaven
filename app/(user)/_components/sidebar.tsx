'use client'

import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { RiHome6Line, RiStarLine, RiDeleteBin7Line } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri";

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
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={cn('fixed md:static z-30 top-0 h-full bg-white px-3 py-5 w-full md:max-w-72 lg:max-w-80 rounded-lg border-r', open ? 'left-0' : 'left-full')}>
                <div className='flex items-center'>
                    <OrganizationSwitcher appearance={{ elements: { rootBox: { width: '100%' } } }} />
                    <div onClick={() => setOpen(prev => !prev)} className='fixed right-5 top-5'>
                        {open
                            ? <RiMenuUnfold4Line
                                size={24}
                                className='ml-10 text-neutral-600'
                            />
                            : <RiMenuUnfold3Line
                                size={24}
                                className='ml-10 text-neutral-600'
                            />
                        }
                    </div>
                </div>
                <ul className='flex flex-col pt-5'>
                    <SidebarItem label='Home' icon={RiHome6Line} path='/dashboard' />
                    <SidebarItem label='Favorites' icon={RiStarLine} path='/dashboard/favorites' />
                    <SidebarItem label='Trash' icon={RiDeleteBin7Line} path='#' />
                </ul>
            </div>
        </>
    )
}

export default Sidebar