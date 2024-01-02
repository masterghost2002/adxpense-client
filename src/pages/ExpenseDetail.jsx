import React, { useEffect, useState, useCallback } from 'react';
import StatusWiseExpensePill from '../components/Expense/StatusWiseExpensePill';
import { Box, Flex, Text, Skeleton } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExpenseBasicInfoCard from '../components/Expense/ExpenseBasicInfoCard';
import FileContainer from '../components/FileContainer';
import ReturnStatusWiseBottom from '../components/Expense/BottomInfo/ReturnStatusWiseBottom';
import useOrganisationStore from '../store/useOrganisationStore';
import useUserStore from '../store/useUserStore';
import createAxiosInstance from '../utils/ApiHandler';
import useChakraToast from '../hooks/useChakraToast';
const ExpenseCategory = {
    'travel': 'Travel Expenses',
    'office-supplies': 'Office Supplies',
    'meals-entertainment': 'Meals and Entertainment',
    'utilities': 'Utilities',
    'exmployee-benefits-welfare': 'Employee Benefits and Welfare',
    'professional-services': 'Professional Services',
    'marketingAndAdvertisment': 'Marketing and Advertising',
    'maintenance-repairs': 'Maintenance and Repairs',
    'subscriptions-memberships': 'Subscriptions and Memberships',
    'miscellaneous': 'Miscellaneous Expenses'

};
const TitleAndDescriptionContainer = ({ title, description }) => {
    return <Flex
        flexDirection={'column'}
        gap={'12px'}
    >
        <Text
            fontSize={'16px'}
            fontWeight={600}
            color={'rgba(0, 0, 0, 0.48)'}
        >
            {title}
        </Text>

        <Box
            borderRadius={'12px'}
            bg={'#FBFBFB'}
            p={'16px'}
            w={'100%'}
        >
            <Text
                fontSize={'14px'}
                fontWeight={400}
            >
                {description}
            </Text>
        </Box>
    </Flex>
}
const SettlementByTitleAndDescriptionContainerHandler = ({ settlementBy, isLoading }) => {
    if (isLoading)
        return <Flex
            flexDirection={'column'}
            gap={'12px'}
        >
            <Text
                fontSize={'16px'}
                fontWeight={600}
                color={'rgba(0, 0, 0, 0.48)'}
            >
                Settlement By
            </Text>
            <Skeleton
                h={'50px'}
                borderRadius={'8px'}
            />
        </Flex>
    return <TitleAndDescriptionContainer
        title={'Settlement By'}
        description={settlementBy}
    />
}
const ExpenseDetail = () => {

    const location = useLocation();
    const naivgate = useNavigate();
    const expense = location.state;
    const expenseStatus = location.status;

    const toast = useChakraToast();

    const loggedUser = useUserStore(state => state.user);

    const returnUserFromMap = useOrganisationStore(state => state.returnUserFromMap);
    const expenseOwner = returnUserFromMap(expense.userId);

    const _settlementByUser = returnUserFromMap(expense.settlementBy)
    const [settlementByUser, setSettlementByUser] = useState(_settlementByUser);
    const [isLoading, setIsLoading] = useState(false);


    const handleSettlementUserName = useCallback(async () => {
        if (_settlementByUser !== undefined || !expense.settlementBy || expense.settlementBy.length === 0) return;
        setIsLoading(true);
        const accessToken = loggedUser.accessToken;
        const api = createAxiosInstance(accessToken);
        try {
            const response = await api.get(`/user/userdetails/${expense.settlementBy}`);
            const user = response.data.data;
            setSettlementByUser(user);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Server Error',
                description: 'Error while fetching settlement user',
                status: 'error'
            })
        }
        setIsLoading(false);

    }, [expenseStatus, loggedUser.accessToken, expense, _settlementByUser])
    useEffect(() => {
        handleSettlementUserName();
    }, [handleSettlementUserName])

    if (!expense || !expense.userId)
        naivgate('/');
    return (
        <Flex
            p={4}
            flexDirection={'column'}
            w={'100%'}
            textAlign={'start'}
            bg={'white'}
            gap={4}
            flexGrow={1}
            flexShrink={0}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Text
                    fontSize={'24px'}
                    fontWeight={400}
                >
                    {expenseOwner?.name}
                </Text>
                <StatusWiseExpensePill
                    status={expense?.status}
                />
            </Flex>
            <ExpenseBasicInfoCard
                category={ExpenseCategory[expense.category]}
                billingDate={expense.billingDate}
                amount={expense.amount}
                merchantName={expense.merchantName}
                currency={expense.currency}
                lastUpdated={'22 oct 234'}
            />
            {expense.remarks &&
                <TitleAndDescriptionContainer
                    title={'Remarks'}
                    description={expense.remarks}
                />
            }


            {expense.approvedRemarks &&
                <TitleAndDescriptionContainer
                    title={'Approved Remarks'}
                    description={expense.approvedRemarks}
                />
            }
            {
                expense.rejectionRemarks &&
                <TitleAndDescriptionContainer
                    title={'Rejection Remarks'}
                    description={expense.rejectionRemarks}
                />
            }
            {
                expense.settlementBy && expense.status === 'settled' &&
                <SettlementByTitleAndDescriptionContainerHandler
                    title={'Settlement By'}
                    settlementBy={settlementByUser?.name}
                    isLoading={isLoading}
                />
            }
            {expense.receipts?.length > 0 && <Flex
                flexDirection={'column'}
                gap={'12px'}
            >
                <Text
                    fontSize={'16px'}
                    fontWeight={600}
                    color={'rgba(0, 0, 0, 0.48)'}
                >
                    Receipts
                </Text>

                <Flex
                    gap={'20px'}
                    flexWrap={'wrap'}
                >
                    {
                        expense.receipts.map((file, index) => (
                            <FileContainer
                                key={`${index}-file'}`}
                                url={file}
                                showCancel={false}
                            />
                        ))
                    }
                </Flex>
            </Flex>
            }


            <ReturnStatusWiseBottom
                expense={expense}
                expenseOwner={expenseOwner}
            />
        </Flex>
    );
}

export default ExpenseDetail;
