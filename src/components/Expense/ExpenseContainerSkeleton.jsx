import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';
const ExpenseSkeleton = () => {
    return (
        <Skeleton 
            h={'70px'}
            borderRadius={'12px'}
        >
        </Skeleton>
    )
}
const ExpenseContainerSkeleton = () => {
    return (
        <Flex
            flexDirection={'column'}
            gap={'16px'}
            p={'16px'}
        >
            <ExpenseSkeleton/>
            <ExpenseSkeleton/>
            <ExpenseSkeleton/>
            <ExpenseSkeleton/>
            <ExpenseSkeleton/>
        </Flex>
    );
}

export default ExpenseContainerSkeleton;
