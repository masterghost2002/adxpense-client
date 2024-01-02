import React from 'react';
import { Flex, Text,Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useExpenseStore from '../store/useExpenseStore';
const MissingItemsContainer = () => {
    const drafts = useExpenseStore(state=>state.drafts);
    if(drafts.length === 0) return null;
    return (
        <Flex
            border={'1px solid rgba(0, 0, 0, 0.05)'}
            flexDirection={'column'}
            borderRadius={'8px'}
            p={'12px 20px'}
        >
            <Text
                fontSize={'12px'}
                fontWeight={600}
                color={'#E53E3E'}
            >
                Missing Items
            </Text>
            <Flex
                justifyContent={'space-between'}
            >
                <Text
                    fontSize={'32px'}
                    fontWeight={500}
                >
                    {drafts.length}
                </Text>
                <Button
                    bg={'rgba(145, 79, 235, 0.05)'}
                    border={'1px solid rgba(145, 79, 235, 0.05)'}
                    borderRadius={'full'}
                    color={'#914FEB'}
                    as={Link}
                    to={'/expenses?expenseFor=Personal&currentExpenseStatus=Drafts'}
                >
                    Add
                </Button>
            </Flex>

        </Flex>
    );
}

export default MissingItemsContainer;
