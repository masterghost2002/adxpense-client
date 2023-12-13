import { Box, Flex, Text } from '@chakra-ui/react';
import ActiveStatus from '../ActiveStatus';
import PauseStatus from '../PauseStatus';
const HeaderLabel = ({ organisationName, isActive }) => {
    return (
        <Flex p={4} width={'100%'} gap={2}>
            <Box flex={1} p={0}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <circle cx="32" cy="32" r="32" fill="#D9D9D9" />
                </svg>
            </Box>
            <Flex gap={2} flexDirection={'column'} alignItems={'flex-start'} flex={4}>
                <Text
                    fontSize={'24px'}
                    fontWeight={600}
                    color={'blackAlpha.800'}
                    wordBreak={'break-all'}
                >
                    {organisationName}
                </Text>
                {isActive === true ? <ActiveStatus /> : <PauseStatus />}
            </Flex>
        </Flex>
    );
};
export default HeaderLabel;