import React, {useState} from 'react'
import {Flex,Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ExpenseSelectorHeader from '../components/Expense/ExpenseSelectorHeader'
import useUserStore from '../store/useUserStore';
export default function Expenses() {
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [expenseFor, setExpenseFor] = useState('Teams'); // ['Teams', 'Personal']
  const [currentExpenseStatus, setCurrentExpenseStatus] = useState('Pending'); 

  // user store
  const user = useUserStore(state => state.user);
  return (
    <>
    <Flex
      bg={'white'}
      flexDirection={'column'}
      h={'100%'}
    >
      <ExpenseSelectorHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        expenseFor={expenseFor}
        setExpenseFor={setExpenseFor}
        currentExpenseStatus={currentExpenseStatus}
        setCurrentExpenseStatus={setCurrentExpenseStatus}
        role={user.role}
      />
      
    </Flex>
    <Button
                position={'sticky'}
                bottom={{ base: '140px', md: "140px" }}
                width={'160px'}
                h={'48px'}
                bg={'brand_primary.500'}
                color={'white'}
                right={'10px'}
                left={'100%'}
                borderRadius={'32px'}
                mr={4}
                as={Link}
                to={`/add-expense`}
                title='add-user-btn'
            >
                Add Expense
            </Button>
    </>
    
  )
}
