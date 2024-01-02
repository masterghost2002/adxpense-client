import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import DateRangeSelector from '../DateRangeSelector';
import ExpenseStatus from '../../constant/ExpenseStatus';
const TeamsSvg = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.9581 5.59163C16.9581 6.97497 16.0415 8.14999 14.7832 8.53333C14.9248 8.07499 14.9998 7.58333 14.9998 7.08333C14.9998 5.25833 14.0165 3.65841 12.5582 2.79175C12.9582 2.60841 13.3999 2.5 13.8749 2.5C15.5749 2.5 16.9581 3.8833 16.9581 5.59163ZM16.3331 9.41671C15.9831 9.31671 15.5998 9.36663 15.2915 9.54163C14.9248 9.74163 14.5332 9.85842 14.1332 9.88342C13.9665 10.1334 13.7748 10.375 13.5498 10.5916C15.1582 11.1166 16.3332 12.5083 16.5998 14.1667H17.1748C17.5582 14.1667 17.9082 13.9668 18.0832 13.6418C18.2498 13.3334 18.3332 12.9833 18.3332 12.6333V12.0416C18.3332 10.8 17.5082 9.72504 16.3331 9.41671ZM7.4415 2.79175C7.0415 2.60841 6.59982 2.5 6.12482 2.5C4.42482 2.5 3.04152 3.8833 3.04152 5.59163C3.04152 6.97497 3.95818 8.14999 5.21651 8.53333C5.07485 8.07499 4.99984 7.58333 4.99984 7.08333C4.99984 5.25833 5.98316 3.65841 7.4415 2.79175ZM6.44983 10.5916C6.22483 10.375 6.03315 10.1334 5.86649 9.88342C5.46649 9.85842 5.07486 9.74163 4.70819 9.54163C4.39986 9.36663 4.01652 9.31671 3.66652 9.41671C2.49152 9.72504 1.6665 10.8 1.6665 12.0416V12.6333C1.6665 12.9833 1.74983 13.3334 1.91649 13.6418C2.09149 13.9668 2.44151 14.1667 2.81651 14.1667H3.39985C3.66652 12.5083 4.8415 11.1166 6.44983 10.5916ZM12.9832 11.7251C12.8415 11.6917 12.6915 11.6667 12.5415 11.6667C12.2582 11.6667 11.9665 11.7417 11.7165 11.8833C11.1832 12.175 10.5915 12.325 9.99984 12.325C9.40817 12.325 8.81651 12.175 8.28317 11.8833C8.03317 11.7417 7.74151 11.6667 7.45818 11.6667C7.30818 11.6667 7.15816 11.6917 7.01649 11.7251C5.58316 12.1084 4.58317 13.4166 4.58317 14.9166V15.6417C4.58317 16.0667 4.6915 16.4916 4.8915 16.8583C5.09983 17.2583 5.5165 17.5 5.98316 17.5H14.0165C14.4832 17.5 14.8998 17.2583 15.1082 16.8583C15.3082 16.4916 15.4165 16.0667 15.4165 15.6417V14.9166C15.4165 13.4166 14.4165 12.1084 12.9832 11.7251ZM13.7498 7.08333C13.7498 5.0125 12.0707 3.33333 9.99984 3.33333C7.929 3.33333 6.24984 5.0125 6.24984 7.08333C6.24984 9.15417 7.929 10.8333 9.99984 10.8333C12.0707 10.8333 13.7498 9.15417 13.7498 7.08333Z" fill="#4BC0C0" />
</svg>
const UserSvg =
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5.83382 6.24967C5.83382 3.95217 7.70299 2.08301 10.0005 2.08301C12.298 2.08301 14.1672 3.95217 14.1672 6.24967C14.1672 8.54717 12.298 10.4163 10.0005 10.4163C7.70299 10.4163 5.83382 8.54717 5.83382 6.24967ZM13.4313 11.3089C12.9655 11.1905 12.4588 11.2572 12.0397 11.4906C10.7747 12.1939 9.2263 12.1939 7.9613 11.4906C7.54297 11.2581 7.03548 11.1922 6.56965 11.3089C4.90965 11.728 3.75049 13.2347 3.75049 14.9722V15.8147C3.75049 16.3464 3.89214 16.8663 4.16131 17.3196C4.38047 17.688 4.79133 17.9172 5.23217 17.9172H14.768C15.2088 17.9172 15.6196 17.6888 15.8388 17.3188C16.108 16.8663 16.2497 16.3464 16.2497 15.8147V14.9722C16.2505 13.2347 15.0913 11.728 13.4313 11.3089Z" fill="black" fillOpacity="0.48" />
    </svg>

const ExpenseStatusButton = ({ title, isActive, onClick }) => {
    return (
        <Button
            onClick={onClick}
            variant={'ghost'}
            h={'30'}
            p={'4px 14px'}
            color={isActive ? '#914FFB' : 'rgba(0, 0, 0, 0.40)'}
            borderBottom={isActive ? '2px solid #914FFB' : '2px solid var(--gray-200, #E2E8F0)'}
            borderRadius={'0px'}
            w={'77px'}
            flexShrink={0}
        >
            {title}
        </Button>
    )
}
const ExpenseSwitcherButton = ({ title, isActive, onClick }) => {
    return (
        <Button
            boxShadow={isActive ? '0px 4px 8px 0px rgba(0, 0, 0, 0.05)' : 'none'}
            borderRadius={'18px'}
            w={'100%'}
            h={'36px'}
            bg={isActive ? 'white' : 'transparent'}
            variant={'ghost'}
            color={isActive ? '#4BC0C0' : 'rgba(0, 0, 0, 0.40)'}
            leftIcon={title === 'Teams' ? TeamsSvg : UserSvg}
            onClick={onClick}
            _hover={{ background: isActive ? 'white' : 'transparent' }}
            _active={{ background: isActive ? 'white' : 'transparent' }}

        >
            {title}
        </Button>
    )
}
const ExpenseSelectorHeader = ({ startDate, endDate, setStartDate, setEndDate, expenseFor, setExpenseFor, currentExpenseStatus, setCurrentExpenseStatus, role }) => {
    const handleExpenseForChange = () => {
        if (expenseFor === 'Teams')
            setExpenseFor(prev => {
                prev.set('expenseFor', 'Personal')
                return prev;
            });
        else
            setExpenseFor(prev => {
                prev.set('expenseFor', 'Teams')
                return prev;
            });
    };
    const handleCurrentExpenseStatusChange = (status) => {
        setCurrentExpenseStatus(prev => {
            prev.set('currentExpenseStatus', status)
            return prev;
        });
    }
    return (
        <Flex
            w={'100%'}
            justifyContent={'space-between'}
            flexDirection={'column'}
            gap={'25px'}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                p={4}
            >
                <Text
                    fontSize={'24px'}
                    fontWeight={600}
                >
                    Expenses
                </Text>
                <DateRangeSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </Flex>
            {role === 'manager' && <Flex
                borderRadius={'24px'}
                bg={'rgba(0, 0, 0, 0.02)'}
                justifyContent={'space-between'}
                h={'48px'}
                alignItems={'center'}
                gap={'8px'}
                p={2}
                mx={4}
            >
                <ExpenseSwitcherButton
                    title={'Teams'}
                    onClick={(handleExpenseForChange)}
                    isActive={expenseFor === 'Teams'}
                />
                <ExpenseSwitcherButton
                    title={'Personal'}
                    onClick={handleExpenseForChange}
                    isActive={expenseFor === 'Personal'}
                />
            </Flex>}
            <Flex
                overflowY={'auto'}
                w={'100%'}
                id='expense-status-div'
            >
                {
                    ExpenseStatus.map((status, index) => {
                        if(status === 'Drafts' && expenseFor === 'Teams') return null;
                        return (
                            <ExpenseStatusButton
                                key={`expense-status-${index}-${status}`}
                                title={status}
                                isActive={status === currentExpenseStatus}
                                onClick={() => handleCurrentExpenseStatusChange(status)}
                            />
                        )
                    })
                }
            </Flex>
        </Flex>
    );
}

export default ExpenseSelectorHeader;
