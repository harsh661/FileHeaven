import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiStarLine, RiFileCopyLine } from "react-icons/ri";
import { FaRegImage, FaRegFilePdf } from "react-icons/fa6";
import DeleteFileDialog from './DeleteFileDialog';
import { LuText } from "react-icons/lu";
import { TbFileTypeCsv, TbFileZip } from "react-icons/tb";
import { Doc } from '@/convex/_generated/dataModel';

const FileCard = ({ file }: { file: Doc<"files"> }) => {
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
                        <DeleteFileDialog file={file} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex flex-col gap-2 py-1'>
                <div className='font-medium line-clamp-2 flex items-center gap-1'>
                    {file.type === "image" ? < FaRegImage />
                        : file.type === "txt" ? <LuText />
                            : file.type === "pdf" ? <FaRegFilePdf />
                                : file.type === "csv" ? <TbFileTypeCsv />
                                    : <TbFileZip />
                    }
                    <p>{file.name}</p>
                </div>
            </div>
        </div>
    )
}

export default FileCard