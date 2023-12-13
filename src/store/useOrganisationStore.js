import { create } from 'zustand';
import { persist} from 'zustand/middleware';
const initialOrganisation = null;
const useUserStore = create(
    persist(
        (set, get) => (
            {
                organisation:initialOrganisation,
                setUser: (userData) => set({ user: userData }),
                getUser:()=>get().user,
                getAccessToken:()=>get().user?.accessToken
            }
        ),
        {
            name: 'organisation-data',
        }
    )
);
export default useUserStore;