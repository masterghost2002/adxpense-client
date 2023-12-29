import React from 'react';
import { Flex } from '@chakra-ui/react';
import WarningHeader from '../components/Expense/WarningHeader';
import AddEditExpenseForm from '../components/Expense/AddEditExpenseForm';
const AddExpense = () => {
    return (
        <Flex
            p={4}
            flexDirection={'column'}
            gap={'20px'}
            flexGrow={1}
            flexShrink={0}
            bg={'white'}
        >
            <WarningHeader />
            <AddEditExpenseForm />
        </Flex>
    );
}

export default AddExpense;
