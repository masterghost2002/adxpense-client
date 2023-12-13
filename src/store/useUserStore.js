import { create } from 'zustand';
import { persist} from 'zustand/middleware';
const initialUser = null;
const useUserStore = create(
    persist(
        (set, get) => (
            {
                user:initialUser,
                setUser: (userData) => set({ user: userData }),
                getUser:()=>get().user,
                getAccessToken:()=>get().user?.accessToken
            }
        ),
        {
            name: 'user-data',
        }
    )
);
export default useUserStore;