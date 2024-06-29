import React, { useEffect, useMemo, useState } from 'react'
import { FaRegImage, FaRegFilePdf } from "react-icons/fa6";
import { LuText } from "react-icons/lu";
import { TbFileTypeCsv, TbFileZip } from "react-icons/tb";
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import OptionsMenu from './optionsMenu';
import { RiStarFill } from 'react-icons/ri';

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

const FileCard = ({ file, isFavorite }: { file: Doc<"files">, isFavorite: boolean }) => {
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
                {/* Show a star if marked as favorite */}
                {isFavorite &&
                    <span className='text-primary absolute left-2 top-2'>
                        <RiStarFill size={20} />
                    </span>
                }
                {fileUrl && file.type === "image" ?
                    <Image
                        src={fileUrl}
                        alt={file.name}
                        fill
                        className='object-contain px-[20%] py-[10%]'
                        quality={20}
                    /> :
                    <div className='text-3xl'>{fileIcon}</div>}
                <OptionsMenu file={file} fileUrl={fileUrl} isFavorite={isFavorite} />
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