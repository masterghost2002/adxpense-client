import React, { memo } from 'react';
import { Flex} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ExpenseBox from './ExpenseBox';
const ExpenseContainer = ({ expenses, expenseFor }) => {
    const navigate = useNavigate();
    return (
        <Flex
            flexDirection={'column'}
            gap={'16px'}
            p={'16px'}
        >
            {
                expenses.map((expense, index) => {
                    return (
                        <ExpenseBox
                            key={index}
                            expense={expense}
                            onClick={
                                () => navigate(
                                    `/expense-detail/${expense.id}`, 
                                    { state: { ...expense, showEditDelete:expenseFor === 'Personal' } }
                                    )
                            }
                        />
                    );
                })
            }
        </Flex>
    );
}

export default memo(ExpenseContainer);
