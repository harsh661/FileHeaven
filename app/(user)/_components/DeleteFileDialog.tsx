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


const DeleteFileDialog = () => {
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
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription className='text-neutral-700'>This cannot be undone lasdfj aslfkdj asdfk ad sfladsf askdjfk.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button variant='danger' type="submit">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteFileDialog