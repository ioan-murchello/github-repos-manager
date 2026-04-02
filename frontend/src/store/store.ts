import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IGithubUserHistoryItem } from '../types/types';

interface GithubState {
    history: IGithubUserHistoryItem[];
    addToHistory: (user: IGithubUserHistoryItem) => void;
    deleteUserFromHistory: (login: string) => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearch: () => void;
}

export const useGithubStore = create<GithubState>()(
    persist(
        (set) => ({
            searchQuery: "",
            history: [],

            setSearchQuery: (query) => set({ searchQuery: query }),
            clearSearch: () => set({ searchQuery: "" }),

            addToHistory: (user) => set((state) => {
                const exists = state.history.find(u => u.username === user.username);
                if (exists) return state;
                return {
                    history: [user, ...state.history].slice(0, 5)
                };
            }),

            deleteUserFromHistory: (login) => set((state) => ({
                history: state.history.filter(u => u.username !== login)
            }))

        }),
        { name: 'github-history', partialize: (state) => ({ history: state.history }) }
    )
);

export const useHistory = () => useGithubStore(state => state.history);
export const useAddToHistory = () => useGithubStore.getState().addToHistory;
export const useDeleteUserFromHistory = () => useGithubStore.getState().deleteUserFromHistory;

export const useSearchQuery = () => useGithubStore(state => state.searchQuery);
export const useSetSearchQuery = () => useGithubStore.getState().setSearchQuery;
export const useClearSearch = () => useGithubStore.getState().clearSearch;

