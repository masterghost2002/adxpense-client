import React from 'react';
import StatusWiseExpensePill from '../components/Expense/StatusWiseExpensePill';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import ExpenseBasicInfoCard from '../components/Expense/ExpenseBasicInfoCard';
import FileContainer from '../components/FileContainer';
import ReturnStatusWiseBottom from '../components/Expense/BottomInfo/ReturnStatusWiseBottom';
import useOrganisationStore from '../store/useOrganisationStore';
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
const ExpenseDetail = () => {

    const location = useLocation();
    const expense = location.state;

    const returnUserFromMap = useOrganisationStore(state => state.returnUserFromMap);
    const expenseOwner = returnUserFromMap(expense.userId);

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
            {expense.remarks && <Flex
                flexDirection={'column'}
                gap={'12px'}
            >
                <Text
                    fontSize={'16px'}
                    fontWeight={600}
                    color={'rgba(0, 0, 0, 0.48)'}
                >
                    Remarks
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
                        {expense.remarks}
                    </Text>
                </Box>
            </Flex>
            }
            {expense.approvedRemarks && <Flex
                flexDirection={'column'}
                gap={'12px'}
            >
                <Text
                    fontSize={'16px'}
                    fontWeight={600}
                    color={'rgba(0, 0, 0, 0.48)'}
                >
                    Approved Remarks
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
                        {expense.approvedRemarks}
                    </Text>
                </Box>
            </Flex>
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
            {
                expense.rejectionRemarks &&
                <Flex
                    flexDirection={'column'}
                    gap={'12px'}
                >
                    <Text
                        fontSize={'16px'}
                        fontWeight={600}
                        color={'rgba(0, 0, 0, 0.48)'}
                    >
                        Rejected Reason
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
                            {expense.rejectionRemarks}
                        </Text>
                    </Box>
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
