import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react';
import useUserStore from '../store/useUserStore';
import useOrganisationStore from '../store/useOrganisationStore';
import YearlyExpense from '../components/Home/YearlyExpense'
import ExpenseDetail from '../components/Home/ExpenseDetail'
import createAxiosInstance from '../utils/ApiHandler';
import MonthsName from '../constant/MonthsName';
import useChakraToast from '../hooks/useChakraToast';
import PendingSettlementsContainer from '../components/Home/PendingSettlementsContainer';
export default function Home() {
    const today = new Date();

    const toast = useChakraToast();
    // get and set yearly data in store and component state
    const getYearlyData = useOrganisationStore(state=>state.getYearlyData);
    const setYearlyDataInStore = useOrganisationStore(state=>state.setYearlyData);
    const [currentYearExpense, setCurrentYearExpense] = useState(getYearlyData(today.getFullYear()));

    // date year selector state
    const [currentYear, setCurrentYear] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
    const [endDate, setEndDate] = useState(new Date());

    //monthly data
    const [categoryData, setCategoryData] = useState([]); // [{month: 'Jan', amt: 1000}
    const [total, setTotal] = useState(0); // 1000

    //user info
    const user = useUserStore(state=>state.user);
    const role = useMemo(()=>user.role, [user.role]);
    const accessToken = useMemo(()=>user.accessToken, [user.accessToken]);

    // 
    const fetchYearlyData = useCallback(async ()=>{  
        const api = createAxiosInstance(accessToken);
        try {
            const res = await api.get(`/${role}/organisation/expenses/yearly-expense?date=${currentYear}`);
            const monthWise = res.data.data.monthWise;
            const monthWiseWithLabel = monthWise.map((data, index)=>({month:MonthsName[index], amt:data}))
            setCurrentYearExpense(monthWiseWithLabel);
            setYearlyDataInStore(today.getFullYear(), monthWiseWithLabel);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast({title:'Something went wrong', status:'error', message});
        }

    }, [currentYear,setYearlyDataInStore,accessToken,role, toast]);

    //fetch
    const fetchCategoryWise = useCallback(async ()=>{
        const api = createAxiosInstance(accessToken);
        try {
            const res = await api.get(`/${role}/organisation/expenses/monthly-expense?from=${startDate}&to=${endDate}`);
            const data = res.data.data;
            setCategoryData(data.expenses);
            setTotal(data.total);
            
        } catch (error) {
        
            const message = error.response?.data?.message || error.message;
            toast({title:'Something went wrong', status:'error', message});
        }
    }, [accessToken, role, toast, setCategoryData,setTotal, startDate, endDate]);

    useEffect(()=>{
        fetchCategoryWise();
    }, [startDate, endDate, fetchCategoryWise]);

    useEffect(()=>{
        fetchYearlyData();
    }, [currentYear, fetchYearlyData]);

    return (
        <Flex
            justifyContent='center'
            p={4}
            flexDirection={'column'}
            w={'100%'}
            textAlign={'start'}
            bg={'#FBFBFB'}
            gap={4}
            pb={'100px'}
        >
            <PendingSettlementsContainer 
                pendingSettlements = {user.settlements}
            />
            <Text
                fontSize={'20px'}
                fontWeight={600}
                color={'blackaplha.800'}
                textAlign={'start'}
            >
                Expense Analysis
            </Text>
            <YearlyExpense 
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                data={currentYearExpense}
            />
            <ExpenseDetail 
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate = {startDate}
                endDate = {endDate}
                data={categoryData}
                total={total}
            />
        </Flex>
    )
}
