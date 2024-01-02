import React, { useState, useEffect, useCallback } from 'react'
import { Flex, Button, Spinner } from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';
import ExpenseSelectorHeader from '../components/Expense/ExpenseSelectorHeader'
import ExpenseContainer from '../components/Expense/ExpenseContainer';
import ExpenseContainerSkeleton from '../components/Expense/ExpenseContainerSkeleton';
import useUserStore from '../store/useUserStore';
import useOrganisationStore from '../store/useOrganisationStore';
import createAxiosInstance from '../utils/ApiHandler';
import useExpenseStore from '../store/useExpenseStore';
import useChakraToast from '../hooks/useChakraToast';
export default function Expenses() {
  const today = new Date();

  const toast = useChakraToast();

  // user store
  const user = useUserStore(state => state.user);
  const setOrganisationUsers = useOrganisationStore(state => state.setUsers);

  const userRole = user?.role;

  const [searchParams, setSearchParams] = useSearchParams(
    {
      expenseFor: userRole === 'manager' ? 'Teams' : 'Personal',
      currentExpenseStatus: 'Pending',
    }
  );

  const expenseFor = searchParams.get('expenseFor');
  const currentExpenseStatus = searchParams.get('currentExpenseStatus');


  // const [expenses, setExpenses] = useState([]);

  const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  // const [expenseFor, setExpenseFor] = useState(userRole === 'manager' ? 'Teams' : 'Personal'); // ['Teams', 'Personal']
  const [isMoreExpense, setIsMoreExpense] = useState(false); // [true, false]
  const [isLoading, setIsLoading] = useState(false); // [true, false]

  // expense state and store
  // const [currentExpenseStatus, setCurrentExpenseStatus] = useState('Pending');
  const setExpenses = useExpenseStore(state => state.setExpense);
  const expenses = useExpenseStore(state => {
    const status = currentExpenseStatus.toLowerCase();
    switch (status) {
      case 'pending':
        return state.pendingExpense;
      case 'rejected':
        return state.rejectedExpense;
      case 'approved':
        return state.approvedExpense;
      case 'all':
        return state.allExpense;
      default:
        return state.drafts;
    }
  });



  //fetch users
  const fetchUsers = async () => {
    if (userRole !== 'manager') return;
    const token = user.accessToken;
    const organisationId = user.organisationId;
    const api = createAxiosInstance(token);
    setIsLoading(true);
    try {
      const res = await api(`/manager/organisation/${organisationId}/getusers`);
      const users = res.data.data;
      setOrganisationUsers(users);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }


  // load more expenses if any
  const fetchMoreExpenses = async () => {
    const accessToken = user.accessToken;
    const api = createAxiosInstance(accessToken);
    const status = currentExpenseStatus.toLocaleLowerCase();
    let url = '/user/myexpenses';
    if (userRole === 'manager')
      url = '/manager/organisation/expenses';
    if (status === 'drafts')
      url = '/user/drafts'
    const last = expenses[expenses.length - 1];
    setIsLoading(true);
    try {
      const res = await api.get(url, { params: { last: last, from: startDate, to: endDate, status: status } });
      const expenses = res.data.data;
      setExpenses(status, expenses);
      const length = expenses.length;
      if (length === 0) {
        setIsMoreExpense(false);
      }
      setIsMoreExpense(length === 10);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Server Error',
        description: 'Unable to fetch more expenses',
        status: 'error'
      })
    }
    setIsLoading(false);
  };

  // function to fetch the first batch of 10 expenses
  const fetchFirstBatch = useCallback(async () => {
    const accessToken = user.accessToken;
    const api = createAxiosInstance(accessToken);
    const status = currentExpenseStatus.toLocaleLowerCase();
    let url = '/user/myexpenses';
    if (userRole === 'manager')
      url = '/manager/organisation/expenses';
    if (status === 'drafts')
      url = '/user/drafts'
    setIsLoading(true);
    try {
      const res = await api.get(url, { params: { from: startDate, to: endDate, status: status } });
      const expenses = res.data.data;
      setExpenses(status, expenses, true);
      const length = expenses.length;
      if (length === 0) {
        setIsMoreExpense(false);
      }
      setIsMoreExpense((length === 10 && status !== 'drafts'));
    } catch (error) {
      toast({
        title: 'Server Error',
        description: 'Unable to fetch more expenses',
        status: 'error'
      })
    }
    setIsLoading(false);
  }, [endDate, startDate, userRole, currentExpenseStatus]);

  useEffect(() => {
    fetchFirstBatch();
  }, [fetchFirstBatch]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Flex
        bg={'white'}
        flexDirection={'column'}
        h={'100%'}
        pb={'100px'}
      >
        <ExpenseSelectorHeader
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          expenseFor={expenseFor}
          setExpenseFor={setSearchParams}
          currentExpenseStatus={currentExpenseStatus}
          setCurrentExpenseStatus={setSearchParams}
          role={user.role}
        />

        {
          isLoading && expenses.length === 0 &&
          <ExpenseContainerSkeleton />
        }
        {expenses.length !== 0 &&
          <ExpenseContainer
            expenses={expenses}
            expenseFor={expenseFor}
          />
        }
        {
          isMoreExpense &&
          <Button
            h={'48px'}
            variant={'outline'}
            colorScheme={'purple'}
            w={'50%'}
            mr={4}
            title='add-user-btn'
            onClick={fetchMoreExpenses}
            alignSelf={'center'}
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner /> : 'Load More'}
          </Button>
        }
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
