'use client';

import { api } from '@/convex/_generated/api';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import React from 'react'
import FileCard from './fileCard';
import { useSearchQuery } from '@/store/searchStore';
import { Id } from '@/convex/_generated/dataModel';

const FilesView = ({ favoriteOnly }: { favoriteOnly?: boolean }) => {
    const { isLoaded: isOrgLoaded, organization } = useOrganization();
    const { isLoaded: isUserLoaded, user } = useUser();
    const query = useSearchQuery(state => state.query);

    const isLoaded = isOrgLoaded && isUserLoaded;

    let orgId = null;

    if (isLoaded) {
        orgId = organization?.id || user?.id || null;
    }

    const filesQuery = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip")
    const favoritesQuery = useQuery(api.files.getFavorites, orgId ? { orgId } : "skip")

    const isFavorite = (fileId: Id<"files">) => {
        return favoritesQuery ? favoritesQuery.some(favorite => favorite.fileId === fileId) : false
    }

    const filteredFiles = favoriteOnly
        ? filesQuery?.filter(file => favoritesQuery?.some(favorite => favorite.fileId === file._id))
        : filesQuery;

    return (
        <div className='pb-5 flex flex-col gap-5'>
            <h2 className='font-medium text-lg pt-5'>{favoriteOnly ? "Favorite " : "My "} Files</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {filteredFiles && filteredFiles.length > 0 ? filteredFiles.map((file) => (
                    <FileCard key={file._id} file={file} isFavorite={isFavorite(file._id)} />
                )) : (
                    <div>No Files uploaded!</div>
                )}
            </div>
        </div>
    )
}

export default FilesView