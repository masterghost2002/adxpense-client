import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const PendingSettlementsContainer = ({ pendingSettlements }) => {
    if (!pendingSettlements || pendingSettlements.length === 0)
        return null;
    return (
        <Flex
            bg={'white'}
            borderRadius={'8px'}
            direction={'column'}
            p={'12px 20px'}
        >
            <Text
                color={'#E53E3E'}
                fontSize={'12px'}
                fontWeight={700}
            >
                Pending Settlements
            </Text>
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Text
                    fontSize={'32px'}
                    fontWeight={500}
                >
                    {pendingSettlements.length}
                </Text>
                <Button
                    bg={'rgba(145, 79, 235, 0.05)'}
                    border={'1px solid rgba(145, 79, 235, 0.05)'}
                    borderRadius={'8px'}
                    color={'#914FEB'}
                    as={Link}
                    to={'/settlements'}
                >
                    Settle up
                </Button>
            </Flex>

        </Flex>
    );
}

export default PendingSettlementsContainer;
