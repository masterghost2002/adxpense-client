import { create } from 'zustand';
import { persist} from 'zustand/middleware';
const initialUser = null;
const useUserStore = create(
    persist(
        (set, get) => (
            {
                user:initialUser,
                categoryWiseExpense:{total:0, expenses:[]},
                setUser: (userData) => set({ user: userData }),
                getUser:()=>get().user,
                getAccessToken:()=>get().user?.accessToken,
                setCategoryWiseExpense:(data, total)=>set({categoryWiseExpense:{total:total, expenses:data}})
            }
        ),
        {
            name: 'user-data',
        }
    )
);
export default useUserStore;