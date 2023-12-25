import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialOrganisation = {
    organisationData: null,
    employess: [],
    accountantManagers: [],
    managers: [],
    yearlyExpenses:{},
};
const useUserStore = create(
    persist(
        (set, get) => (
            {
                ...initialOrganisation,
                setOrganisationData: (organisationData) => {
                    set({ organisationData });
                },
                setUsers: (users) => {
                    const employess = users.filter(d => d.role === 'employee');
                    const accountantManagers = users.filter(d => d.role === 'accountant');
                    const managers = users.filter(d => d.role === 'manager');
                    set({ employess });
                    set({ accountantManagers });
                    set({ managers });
                },
                getYearlyData:(year)=>{
                    const yearlyExpenses = get().yearlyExpenses;
                    const data = yearlyExpenses[year] || [];
                    return data;
                },
                setYearlyData: (year, data)=>{
                    const yearlyExpenses = get().yearlyExpenses;
                    yearlyExpenses[year] = data;
                    set({yearlyExpenses:yearlyExpenses})
                }
                ,
                getUser: (userId) => {
                    const employess = get().employess;
                    const employeeIndex = employess.findIndex(d => d.id === userId);
                    if (employeeIndex !== -1)
                        return employess[employeeIndex];
                    const managers = get().managers;
                    const managerIndex = managers.findIndex(d => d.id === userId)
                    if (managerIndex !== -1)
                        return managers[managerIndex];
                    const accountantManagers = get().accountantManagers;
                    const accountantManagerIndex = accountantManagers.findIndex(d => d.id === userId);
                    if (accountantManagerIndex !== -1)
                        return accountantManagers[accountantManagerIndex]
                },
                addNewUser:(userData)=>{
                    switch(userData.role){
                        case 'employee':{
                            set({employess: [...get().employess, userData]});
                            return;
                        }
                        case 'accountant':{
                            set({accountantManagers: [...get().accountantManagers, userData]});
                            return;
                        }
                        case 'managers':{
                            set({managers: [...get().managers, userData]});
                            return;
                        }
                        default: return;
                    }
                },
                updateUser: (userId, userData) => {
                    const employess = get().employess;
                    const employeeIndex = employess.findIndex(employee => employee.id === userId);
                    if (employeeIndex !== -1) {
                        employess.splice(employeeIndex, 1);
                        set({ employess:employess });
                        get().addNewUser(userData);
                        return;
                    }
                    const managers = get().managers;
                    const managersIndex = managers.findIndex(d=>d.id === userId);
                    if(managersIndex !== -1){
                        managers.splice(managersIndex, 1);
                        set({managers:managers});
                        get().addNewUser(userData);
                        return;
                    }
                    const accountantManagers = get().accountantManagers;
                    const accountantManagerIndex = accountantManagers.findIndex(d=>d.id === userId);
                    if(accountantManagerIndex !== -1){
                        accountantManagers.splice(accountantManagerIndex, 1);
                        set({accountantManagers:accountantManagers});
                        get().addNewUser(userData);
                        return;
                    }
                }
            }
        ),
        {
            name: 'organisation-data',
        }
    )
);
export default useUserStore;