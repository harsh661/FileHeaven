'use client';

import Button from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization, useUser, useClerk } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import Header from '../_components/header';
import NewFileDialog from '../_components/NewFileDialog';
import ActionButton from '@/components/ui/action_button';
import { MdOutlineGroupAdd } from "react-icons/md";

const dashboard = () => {
  // const { isLoaded: isOrgLoaded, organization } = useOrganization();
  // const { isLoaded: isUserLoaded, user } = useUser();
  const { openCreateOrganization } = useClerk()

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
      <div className='py-5 flex items-center gap-5'>
        <NewFileDialog />
        <ActionButton
          icon={MdOutlineGroupAdd}
          onClick={openCreateOrganization}
        >
          New Organization
        </ActionButton>
      </div>
    </div>
  )
}

export default dashboard