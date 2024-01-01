import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const ApproveReject = ({ expense, expenseOwner }) => {
    return (
        <Flex
            flexDirection={'column'}
            h={'auto'}
            flex={1}
            justifyContent={'flex-end'}
            gap={'20px'}
        >
            {
                expense.previousAmount &&
                <Flex
                    gap={'8px'}
                    alignItems={'center'}
                    p={'16px'}
                    borderRadius={'12px'}
                    bg={'#FFF9F9'}
                    w={'100%'}
                    h={'70px'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <circle cx="3" cy="3" r="3" fill="#E61B23" />
                    </svg>
                    <Text
                        fontSize={'14px'}
                        fontWeight={400}
                        color={'rgba(0, 0, 0, 0.70)'}
                    >
                        {expenseOwner.name} updated amount from {" "} 
                        <span style={{fontWeight:'800'}}>
                        {expense.previousAmount}
                        </span> 
                        {" "} to {""} 
                        <span style={{fontWeight:'800'}}>
                        {expense.amount}
                        </span>
                    </Text>
                </Flex>
            }
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={'16px'}
            >
                <Button
                    variant={'outline'}
                    border={'1px solid var(--primary-1, #914FEB)'}
                    color={'#914FEB'}
                    w={'100%'}
                    as={Link}
                    to={`/expense/${expense.id}/reject`}
                >
                    Reject
                </Button>
                <Button
                    bg={'#914FEB'}
                    color={'white'}
                    w={'100%'}
                    as={Link}
                    to={`/expense/${expense.id}/approve`}
                >
                    Approve
                </Button>

            </Flex>
        </Flex>
    );
}

export default ApproveReject;
