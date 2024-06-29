'use client';

import React from 'react'
import Header from '../_components/header';
import NewFileDialog from '../_components/NewFileDialog';
import ActionButton from '@/components/ui/action_button';
import { MdOutlineGroupAdd } from "react-icons/md";
import { useClerk } from '@clerk/nextjs';
import FilesView from '../_components/filesView';

const dashboard = () => {
  const { openCreateOrganization } = useClerk()

  return (
    <div className='px-5 lg:px-10 pb-5'>
      <Header />
      <div className='pt-5 flex items-center gap-5'>
        <NewFileDialog />
        <ActionButton
          icon={MdOutlineGroupAdd}
          onClick={openCreateOrganization}
        >
          New Organization
        </ActionButton>
      </div>

      <FilesView />
    </div>
  )
}

export default dashboard