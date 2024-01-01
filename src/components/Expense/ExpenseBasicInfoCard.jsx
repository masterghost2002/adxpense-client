import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
const ExpenseBasicInfoCard = ({amount, merchantName, billingDate, currency,lastUpdated, category}) => {
    const date = new Date(
            billingDate._seconds
            ? billingDate._seconds * 1000
            : billingDate,
    );
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return (
        <Flex
            padding={'16px'}
            bg={'#FBFBFB'}
            borderRadius={'12px'}
            flexDirection={'column'}
            gap={'20px'}
        >
            <Flex
                w={'100%'}
                flexDirection={'column'}
                gap={'0px'}
            >
                <Flex
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    w={'100%'}
                >
                    <Text
                        fontSize={'20px'}
                        fontWeight={500}
                    >
                        {category}
                    </Text>
                    <Text
                        color={'#4B0DAF'}
                        fontSize={'24px'}
                        fontWeight={700}
                    >
                        {`${currency} ${amount}`}
                    </Text>
                </Flex>
                <Text
                    fontSize={'12px'}
                    fontWeight={500}
                    color={'rgba(0, 0, 0, 0.64)'}
                >
                    Last updated on {lastUpdated}
                </Text>
            </Flex>
            <Flex
                justifyContent={'space-between'}
                alignContent={'center'}
            >
                <Flex
                    flexDirection={'column'}
                >
                        <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'rgba(0, 0, 0, 0.56)'}
                        >
                            Merchant Name
                        </Text>
                        <Text
                            fontSize={'16px'}
                            fontWeight={400}
                        >
                            {merchantName}
                        </Text>

                </Flex>

                <Flex
                    flexDirection={'column'}
                >
                        <Text
                            fontSize={'14px'}
                            fontWeight={400}
                            color={'rgba(0, 0, 0, 0.56)'}
                        >
                            Billing Date
                        </Text>
                        <Text
                            fontSize={'16px'}
                            fontWeight={400}
                        >
                            {day} {month} {year}
                        </Text>

                </Flex>

            </Flex>
        </Flex>
    );
}

export default ExpenseBasicInfoCard;
