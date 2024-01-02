import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import DateRangeSelector from '../components/DateRangeSelector';
import TotalExpenseContainer from '../components/Expense/TotalExpenseContainer';
import CategoryWise from '../components/Expense/CategoryWise';
import makeExpenseDetails from '../utils/FilterExpenseCategory';
import useUserStore from '../store/useUserStore';
import useExpenseStore from '../store/useExpenseStore';
import createAxiosInstance from '../utils/ApiHandler';
import useChakraToast from '../hooks/useChakraToast';
import ExportHandler from '../components/Export/ExportHandler';
import MissingItemsContainer from '../components/MissingItemsContainer';
import { Link } from 'react-router-dom';
const COLORS = ['#FF900E', '#D6BEFC', '#914FEB', '#4BC0C0'];
export default function MyExpenseDetails() {
  const today = new Date();
  const toast = useChakraToast();
  // date year selector state
  const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  const setExpenses = useExpenseStore(state => state.setExpense);
  //user data and expense
  const user = useUserStore(state => state.user);
  const categoryWiseExpense  = useUserStore(state=>state.categoryWiseExpense);
  const setCategoryWiseExpense = useUserStore(state=>state.setCategoryWiseExpense);
  const accessToken = useMemo(() => user.accessToken, [user.accessToken]);
  const organisationId = useMemo(() => user.organisationId, [user.organisationId]);
  const userId = useMemo(() => user.id, [user.id]);


  const CategoryWiseData = makeExpenseDetails(categoryWiseExpense.expenses);

  const fetchDraftExpenses = useCallback (async ()=>{
    const api = createAxiosInstance(accessToken);
    try {
      const res = await api.get('/user/drafts');
      const data = res.data.data;
      setExpenses('drafts', data, true);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast({ title: 'Something went wrong', status: 'error', message });
    }
  }, [accessToken, toast])
  //fetch expenses
  const fetchUserExpenses = useCallback(async () => {
    const api = createAxiosInstance(accessToken);
    try {
      const res = await api.get(`/user/organisation/${organisationId}/user/${userId}/expense?from=${startDate}&to=${endDate}`);
      const expense = res.data.data;
      let t = 0;
      for (let i = 0; i < res.data.data.length; i++) t += parseInt(expense[i].amount);
      setCategoryWiseExpense(expense, t);

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast({ title: 'Something went wrong', status: 'error', message });
      console.log(error);

    }
  }, [startDate, endDate, organisationId, userId, toast, accessToken]);
  useEffect(() => {
    fetchUserExpenses();
  }, [fetchUserExpenses]);

  useEffect(()=>{
    fetchDraftExpenses();
  }, [fetchDraftExpenses])

  return (
    <>
    <Flex
      p={4}
      height={'100%'}
      pb={'100px'}
    >
      
      <Flex
        w={'100%'}
        gap={4}
        flexDirection={'column'}
        py={'20px'}
      >
        <MissingItemsContainer/>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            fontSize={'20px'}
            fontWeight={'600'}
            color={'blackaplha.800'}
          >
            Expense Analysis
          </Text>
        </Flex>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <DateRangeSelector
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
          />
          <ExportHandler
            data={categoryWiseExpense.expenses}
          />
        </Flex>
        <TotalExpenseContainer
          total={`₹${categoryWiseExpense.total || 0}`}
        />
        <CategoryWise
          data={CategoryWiseData}
          COLORS={COLORS}
        />
      </Flex>
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
