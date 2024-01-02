import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import useUserStore from '../store/useUserStore';
import ExpenseBox from '../components/Expense/ExpenseBox';
import ExpenseContainerSkeleton from '../components/Expense/ExpenseContainerSkeleton';
import createAxiosInstance from '../utils/ApiHandler';
import { useNavigate } from 'react-router-dom';
const SettlementExpenses = () => {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const pendingSettlements = useUserStore(state => state.pendingSettlements);
    const setPendingSettlements = useUserStore(state => state.setPendingSettlements);
    const [isLoading, setIsLoading] = useState(true);
    const getSettlementExpenses = useCallback(async () => {
        const token = user.accessToken;
        const api = createAxiosInstance(token);
        try {
            const res = await api.get('/user/settlements');
            const expenses = res.data.data;
            setPendingSettlements(expenses)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [user.accessToken]);

    useEffect(() => {
        getSettlementExpenses();
    }, [getSettlementExpenses]);
    return (
        <Flex
            p={4}
            flexDirection={'column'}
            w={'100%'}
            textAlign={'start'}
            bg={'white'}
            gap={4}
            flexGrow={1}
        >
            {
                isLoading && pendingSettlements.length === 0 &&
                <ExpenseContainerSkeleton />
            }
            {
                !isLoading && pendingSettlements.length === 0 &&
                <Text>
                    No pending expenses
                </Text>
            }
            {
                pendingSettlements.map(expense => (
                    <ExpenseBox 
                        key={expense.id} 
                        expense={expense} 
                        onClick={() => {navigate(`/expense-detail/${expense.id}`, {state: {...expense, showEditDelete: false}})}}
                    />
                ))
            }

        </Flex>
    );
}

export default SettlementExpenses;
