import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import DateRangeSelector from '../components/DateRangeSelector';
import TotalExpenseContainer from '../components/Expense/TotalExpenseContainer';
import CategoryWise from '../components/Expense/CategoryWise';
import makeExpenseDetails from '../utils/FilterExpenseCategory';
import useUserStore from '../store/useUserStore';
import createAxiosInstance from '../utils/ApiHandler';
import useChakraToast from '../hooks/useChakraToast';
import ExportHandler from '../components/Export/ExportHandler';
const COLORS = ['#FF900E', '#D6BEFC', '#914FEB', '#4BC0C0'];
export default function MyExpenseDetails() {
  const today = new Date();
  const toast = useChakraToast();
  // date year selector state
  const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());

  //user data and expense
  const user = useUserStore(state => state.user);
  const categoryWiseExpense  = useUserStore(state=>state.categoryWiseExpense);
  const setCategoryWiseExpense = useUserStore(state=>state.setCategoryWiseExpense);
  const accessToken = useMemo(() => user.accessToken, [user.accessToken]);
  const organisationId = useMemo(() => user.organisationId, [user.organisationId]);
  const userId = useMemo(() => user.id, [user.id]);


  const CategoryWiseData = makeExpenseDetails(categoryWiseExpense.expenses);
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
  }, [startDate, endDate, organisationId, userId, toast, categoryWiseExpense, accessToken]);
  useEffect(() => {
    fetchUserExpenses();
  }, [fetchUserExpenses])

  return (
    <Flex
      p={4}
      height={'100%'}
    >
      <Flex
        w={'100%'}
        gap={4}
        flexDirection={'column'}
        py={'20px'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text
            fontSize={'20px'}
            fontWeight={'600'}
            color={'blackaplha.800'}
          >
            Expense Details
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
  )
}
