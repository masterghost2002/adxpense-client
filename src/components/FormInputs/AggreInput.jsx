import React from 'react';
import { Text, Flex, Checkbox, FormControl, FormErrorMessage } from '@chakra-ui/react';
const AggreInput = ({ isChecked, handleIsAggree, formError}) => {
    const isError = formError ? formError['aggree'] !== '' : false;
    return (
        <Flex
            alignItems={'center'}
            gap={'8px'}
        >
            <FormControl
                isInvalid={isError}
            >
                <Flex
                    alignItems={'center'}
                    gap={'8px'}
                >
                    <Checkbox
                        w={'20px'}
                        h={'20px'}
                        flexShrink={0}
                        isChecked={isChecked}
                        name='aggre'
                        onChange={handleIsAggree}
                    />
                    <Text
                        fontSize={'14px'}
                        color={'rgba(0, 0, 0, 0.70)'}
                    >
                        I declare that the information provided is true and accurate to the best of my knowledge.
                    </Text>
                </Flex>
                {
                    isError && <FormErrorMessage>
                        Please check the box to proceed
                    </FormErrorMessage>

                }
            </FormControl>
        </Flex>
    );
}

export default AggreInput;
