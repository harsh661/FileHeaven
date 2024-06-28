'use client';

import { api } from '@/convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React from 'react'
import FileCard from './fileCard';
import { useSearchQuery } from '@/store/searchStore';

const FilesView = () => {
    const { isLoaded: isOrgLoaded, organization } = useOrganization();
    const { isLoaded: isUserLoaded, user } = useUser();
    const query = useSearchQuery(state => state.query);

    const isLoaded = isOrgLoaded && isUserLoaded;

    let orgId = null;

    if (isLoaded) {
        orgId = organization?.id || user?.id || null;
    }

    const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip")

    return (
        <div className='pb-5 flex flex-col gap-5'>
            <h2 className='font-medium text-lg'>My Files</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {(files && files.length > 0) ? files.map((file) => (
                    <FileCard key={file._id} file={file} />
                )) : (
                    <div>No Files uploaded!</div>
                )}
            </div>
        </div>
    )
}

export default FilesView