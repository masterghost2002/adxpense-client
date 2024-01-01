import React from 'react';
import useUserStore from '../../../store/useUserStore';
import ApproveReject from './ApproveReject';
import EditDelete from './EditDelete';
const ReturnStatusWiseBottom = ({ expense, expenseOwner }) => {
    const user = useUserStore(state => state.user);
    const status = expense.status;
    switch (status) {
        case 'pending': {
            if (expense.showEditDelete)
                return <EditDelete
                    expense={expense}
                />;
            else return <ApproveReject
                expense={expense}
                expenseOwner = {expenseOwner}
            />;
        }
    }
}

export default ReturnStatusWiseBottom;
