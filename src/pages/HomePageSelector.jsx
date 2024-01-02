import React from 'react';
import useUserStore from '../store/useUserStore';
import EmployeeHome from './EmployeeHome';
import ManagementHome from './ManagementHome';
const HomePageSelector = () => {
    const user = useUserStore(state => state.user);
    const userRole = user.role;
    if(user.role === 'employee')
        return <EmployeeHome/>
    return <ManagementHome/>
    
}

export default HomePageSelector;
