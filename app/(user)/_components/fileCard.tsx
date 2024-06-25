import React, { useEffect, useMemo, useState } from 'react'
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
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';

const getFileIcon = (type: string) => {
    switch (type) {
        case 'image':
            return <FaRegImage />;
        case 'txt':
            return <LuText />;
        case 'pdf':
            return <FaRegFilePdf />;
        case 'csv':
            return <TbFileTypeCsv />;
        default:
            return <TbFileZip />;
    }
};

const FileCard = ({ file }: { file: Doc<"files"> }) => {
    const generateFileUrl = useMutation(api.files.generateFileUrl);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchFileUrl = async () => {
            try {
                const url = await generateFileUrl({ fileId: file.fileId });
                setFileUrl(url);
            } catch (err) {
                console.log(err)
            }
        };

        fetchFileUrl();
    }, [file.fileId, generateFileUrl]);

    const fileIcon = useMemo(() => getFileIcon(file.type), [file.type]);

    return (
        <div className='flex flex-col w-full'>
            <div className='aspect-video flex items-center justify-center bg-neutral-200 rounded-lg relative'>
                {fileUrl && file.type === "image" ?
                    <Image
                        src={fileUrl}
                        alt={file.name}
                        fill
                        className='object-contain px-[20%] py-[10%]'
                        quality={20}
                    /> :
                    <div className='text-3xl'>{fileIcon}</div>}
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
                    {fileIcon}
                    <p>{file.name}</p>
                </div>
            </div>
        </div>
    )
}

export default FileCard