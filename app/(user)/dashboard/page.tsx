'use client';

import React from 'react'
import Header from '../_components/header';
import NewFileDialog from '../_components/NewFileDialog';
import ActionButton from '@/components/ui/action_button';
import { MdOutlineGroupAdd } from "react-icons/md";
import { useClerk } from '@clerk/nextjs';
import FilesView from '../_components/filesView';

const Dashboard = () => {
  const { openCreateOrganization } = useClerk()

  return (
    <div className='px-5 lg:px-10 pb-5'>
      <Header />
      <div className='pt-5 grid grid-cols-2 md:flex items-center gap-3 md:gap-5'>
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

export default Dashboard