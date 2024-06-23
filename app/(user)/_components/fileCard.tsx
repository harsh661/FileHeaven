import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line, RiStarLine, RiFileCopyLine } from "react-icons/ri";
import DeleteFileDialog from './DeleteFileDialog';

const FileCard = ({ title }: { title: string }) => {
    return (
        <div className='flex flex-col w-full'>
            <div className='aspect-video flex items-center justify-center bg-neutral-200 rounded-lg relative'>
                <Popover>
                    <PopoverTrigger className='absolute top-2 right-2'>
                        <BsThreeDotsVertical />
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col p-1'>
                        <div className='flex items-center gap-1 cursor-pointer p-2 hover:bg-neutral-100 rounded-sm'>
                            <RiFileCopyLine size={20} />
                            <p>Copy link</p>
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer p-2 hover:bg-neutral-100 rounded-sm'>
                            <RiStarLine size={20} />
                            <p>Add to favourites</p>
                        </div>
                        {/* Delete option with confirmation before deleting */}
                        <DeleteFileDialog />
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex flex-col gap-2 py-1'>
                <p className='font-medium line-clamp-2'>{title}</p>
            </div>
        </div>
    )
}

export default FileCard