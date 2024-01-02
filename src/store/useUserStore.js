import { create } from 'zustand';
import { persist} from 'zustand/middleware';
const initialUser = null;
const useUserStore = create(
    persist(
        (set, get) => (
            {
                user:initialUser,
                categoryWiseExpense:{total:0, expenses:[]},
                pendingSettlements:[],
                remainingPendingSettlements:0,
                setPendingSettlements:(data)=>{
                    set({pendingSettlements:data, total: data.length});
                },
                incrementRemainingSettlements:()=>{
                    set({remainingPendingSettlements: get().remainingPendingSettlements+1});
                },
                addPendingSettlement:(id)=>{
                    const newPendingSettlements = [...get().pendingSettlements, id];
                    set({pendingSettlements:newPendingSettlements, remainingPendingSettlements: get().remainingPendingSettlements+1});
                },
                setUser: (userData) =>{
                    const settlementsCount = userData?userData.settlements?userData.settlements.length:0:0;
                    set({ user: userData, remainingPendingSettlements:settlementsCount });
                },
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