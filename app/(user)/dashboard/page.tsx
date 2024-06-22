'use client';

import Button from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization, useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import Header from '../_components/header';

const dashboard = () => {
  // const { isLoaded: isOrgLoaded, organization } = useOrganization();
  // const { isLoaded: isUserLoaded, user } = useUser();
  // const createFile = useMutation(api.files.createFile);

  // const isLoaded = isOrgLoaded && isUserLoaded;

  // let orgId = null;

  // if (isLoaded) {
  //   orgId = organization?.id || user?.id || null;
  // }

  // console.log(orgId)

  // const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip")

  return (
    <div className='px-5 lg:px-10 pb-5'>
      <Header />
    </div>
  )
}

export default dashboard