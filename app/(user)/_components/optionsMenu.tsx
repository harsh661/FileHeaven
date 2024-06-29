import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiStarLine, RiFileCopyLine, RiStarFill } from "react-icons/ri";
import DeleteFileDialog from './DeleteFileDialog';
import { LuDownload } from "react-icons/lu";
import { Doc } from '@/convex/_generated/dataModel';
import toast from 'react-hot-toast';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const OptionsMenu = ({ file, fileUrl, isFavorite }: { file: Doc<"files">, fileUrl: string | null, isFavorite: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFavorite = useMutation(api.files.toggleFavorite);

    // Function to copy URL to clipboard
    const copyToClipboard = (fileUrl: string) => {
        try {
            navigator.clipboard.writeText(fileUrl)
            toast.success('URL copied to clipboard');
        } catch {
            toast.error('Failed to copy');
        } finally {
            setIsOpen(false)
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className='absolute top-2 right-2'>
                <BsThreeDotsVertical />
            </PopoverTrigger>
            <PopoverContent className='flex flex-col p-1'>
                <div
                    onClick={() => window.open(fileUrl as string, '_blank')}
                    className='flex items-center gap-1 cursor-pointer p-2 hover:bg-neutral-100 rounded-sm'>
                    <LuDownload size={20} />
                    <p>Download file</p>
                </div>
                <div
                    onClick={() => copyToClipboard(fileUrl as string)}
                    className='flex items-center gap-1 cursor-pointer p-2 hover:bg-neutral-100 rounded-sm'>
                    <RiFileCopyLine size={20} />
                    <p>Copy link</p>
                </div>
                <div
                    onClick={() => toggleFavorite({ fileId: file._id })}
                    className='flex items-center gap-1 cursor-pointer p-2 hover:bg-neutral-100 rounded-sm'>
                    {isFavorite ? <RiStarFill size={20} /> : <RiStarLine size={20} />}
                    <p>{isFavorite ? "Remove from " : "Add to "} favorites</p>
                </div>
                {/* Delete option with confirmation before deleting */}
                <DeleteFileDialog file={file} setIsOpen={setIsOpen} />
            </PopoverContent>
        </Popover>
    )
}

export default OptionsMenu