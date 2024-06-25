'use client';

import React, { useState } from 'react'
import ActionButton from '@/components/ui/action_button';
import { FaPlus } from "react-icons/fa6";
import { NewDocumentSchema, NewDocumentSchemaType } from '@/schema/documents';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { Doc } from '@/convex/_generated/dataModel';

const NewFileDialog = () => {
    const [open, setOpen] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const createFile = useMutation(api.files.createFile);

    // Create an orgId using either the organization id or user id
    const { isLoaded: isOrgLoaded, organization } = useOrganization();
    const { isLoaded: isUserLoaded, user } = useUser();

    const isLoaded = isOrgLoaded && isUserLoaded;

    let orgId = null;

    if (isLoaded) {
        orgId = organization?.id || user?.id || null;
    }

    // Initialize `form` from react-hook-form
    const form = useForm<NewDocumentSchemaType>({
        resolver: zodResolver(NewDocumentSchema),
        defaultValues: {
            title: '',
            file: null
        }
    })

    const onSubmit = async (data: NewDocumentSchemaType) => {
        setOpen(false);

        if (!data.file || !orgId) return;

        // Use toast to show file upload status
        toast.promise(
            (async () => {
                try {
                    const postUrl = await generateUploadUrl();
                    const result = await fetch(postUrl, {
                        method: "POST",
                        headers: { "Content-Type": data.file!.type },
                        body: data.file,
                    });
                    const { storageId } = await result.json();

                    const fileTypes = {
                        "image/png": "image",
                        "image/jpeg": "image",
                        "image/gif": "image",
                        "application/pdf": "pdf",
                        "application/zip": "zip",
                        "text/csv": "csv",
                        "text/plain": "txt",
                    } as Record<string, Doc<"files">["type"]>

                    await createFile({
                        name: data.title,
                        fileId: storageId,
                        orgId,
                        type: fileTypes[data.file!.type] || 'any'
                    })

                    form.reset();

                } catch (error) {
                    console.log(error)
                }
            })(),
            {
                loading: 'Uploading file...',
                success: 'File uploaded successfully!',
                error: 'Failed to upload file.',
            }
        )
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
                                                onChange(event.target.files[0]);
                                                form.setValue('file', event.target.files[0]);
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