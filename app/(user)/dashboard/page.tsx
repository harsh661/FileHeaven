'use client';

import Button from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization, useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react'
import React from 'react'

const dashboard = () => {
  const { isLoaded: isOrgLoaded, organization } = useOrganization();
  const { isLoaded: isUserLoaded, user } = useUser();
  const createFile = useMutation(api.files.createFile);

  const isLoaded = isOrgLoaded && isUserLoaded;

  let orgId = null;

  if (isLoaded) {
    orgId = organization?.id || user?.id || null;
  }

  console.log(orgId)

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip")

  return (
    <div className='pt-16'>
      <Button onClick={() => createFile({ name: "Hello", orgId: orgId ? orgId : "skip" })}>Create File</Button>

      <div>
        {files?.map(file => (
          <div key={file._id}>{file.name}</div>
        ))}
      </div>
    </div>
  )
}

export default dashboard