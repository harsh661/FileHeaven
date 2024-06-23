import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { RiDeleteBin7Line } from "react-icons/ri";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import toast from 'react-hot-toast';


const DeleteFileDialog = ({ file }: { file: Doc<"files"> }) => {
    const deleteFile = useMutation(api.files.deleteFile);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex items-center gap-1 cursor-pointer p-2 text-red-500 hover:bg-neutral-100 rounded-sm'>
                    <RiDeleteBin7Line size={20} />
                    <p>Move to trash</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete File</DialogTitle>
                    <DialogDescription className='text-neutral-700'>Are you sure you want to delete this file, this action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => {
                        deleteFile({ fileId: file._id })
                        toast.success("File deleted successfully")
                    }}
                        variant='danger'
                        type="submit">
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFileDialog