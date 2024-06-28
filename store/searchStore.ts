import { create } from 'zustand'

type SearchQueryStore = {
    query: string
    setQuery: (q: string) => void
}

export const useSearchQuery = create<SearchQueryStore>()((set) => ({
    query: '',
    setQuery: (q: string) => set({ query: q }),
}))