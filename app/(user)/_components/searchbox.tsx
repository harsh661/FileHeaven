'use client';

import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { SearchQuerySchema, SearchQuerySchemaType } from '@/schema/searchQuery'
import { useSearchQuery } from '@/store/searchStore'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiSearchLine } from 'react-icons/ri'

const Searchbox = () => {
  const setQuery = useSearchQuery(state => state.setQuery);

  const form = useForm<SearchQuerySchemaType>({
    resolver: zodResolver(SearchQuerySchema),
    defaultValues: {
      query: ''
    }
  })

  const onSubmit = (data: SearchQuerySchemaType) => {
    setQuery(data.query)
  }

  return (
    <div className='flex items-center p-2 rounded-lg bg-neutral-200 text-black/60 w-full md:w-auto'>
      <RiSearchLine size={20} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    placeholder='Search'
                    className='outline-none bg-transparent text-sm font-medium py-1 pl-2'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default Searchbox