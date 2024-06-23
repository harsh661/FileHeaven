'use client';

import React, { useState } from 'react'
import ActionButton from '@/components/ui/action_button';
import { FaPlus } from "react-icons/fa6";
import { NewDocumentSchema, NewDocumentSchemaType } from '@/schema/documents';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const NewFileDialog = () => {
    const [open, setOpen] = useState(false);

    const form = useForm<NewDocumentSchemaType>({
        resolver: zodResolver(NewDocumentSchema),
        defaultValues: {
            title: '',
            file: null
        }
    })

    const onSubmit = (data: NewDocumentSchemaType) => {
        console.log(data);
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <ActionButton icon={FaPlus}>New Document</ActionButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new file</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                        <FormField
                            control={form.control}
                            name="title"
                            defaultValue=''
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange }, ...field }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            placeholder="Add a file" {...field}
                                            onChange={(event) => {
                                                if (!event.target.files) return;
                                                onChange(event.target.files[0])
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='pt-3'>
                            <Button variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit">Upload</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default NewFileDialog