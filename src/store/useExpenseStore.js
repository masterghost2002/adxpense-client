import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useExpenseStore = create(
    persist(
        (set, get) => (
            {
                pendingExpense: [],
                rejectedExpense: [],
                approvedExpense: [],
                settledExpense: [],
                allExpense: [],
                drafts: [],
                setExpense: (type, data, flush = false) => {
                    switch (type) {
                        case 'pending': {
                            if (flush)
                                set({ pendingExpense: data });
                            else set({ pendingExpense: [...get().pendingExpense, ...data] })
                            break;
                        }
                        case 'rejected':
                            {
                                if (flush)
                                    set({ rejectedExpense: data });
                                else set({ rejectedExpense: [...get().rejectedExpense, ...data] })
                                break;
                            }
                        case 'approved': {
                            if (flush)
                                set({ approvedExpense: data });
                            else set({ approvedExpense: [...get().approvedExpense, ...data] });
                            break;
                        }
                        case 'all': {
                            if(flush)
                                set({ allExpense: data });
                            else set({allExpense:[...get().allExpense, ...data]})
                            break;
                        }
                        default:{
                            if(flush)
                                set({ drafts: data });
                            else set({drafts:[...get().drafts, ...data]});
                            break;
                        }
                    }
                },
            }
        ),
        {
            name: 'expense-data',
        }
    )
);
export default useExpenseStore;