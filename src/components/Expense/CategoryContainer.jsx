import { Flex, Box, Text } from "@chakra-ui/react"
const CategoryContainer = ({ color, perc, category, price, currency = '₹' }) => {
    return (
        <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Flex
                alignItems={'center'}
                gap={2}
            >
                <Box
                    h={'30px'}
                    w={'40px'}
                    bg={color}
                    borderRadius={'4px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    color={'white'}
                >
                    <Text
                        fontSize={'14px'}
                        fontWeight={500}
                    >
                        {perc} %
                    </Text>
                </Box>
                <Text
                    color={'rgba(0, 0, 0, 0.64)'}
                    fontWeight={500}
                    fontSize={'16px'}
                >
                    {category}
                </Text>
            </Flex>
            <Text
                fontWeight={500}
                fontSize={'16px'}
            >
                {currency}{price}
            </Text>
        </Flex>
    )
};
export default CategoryContainer;