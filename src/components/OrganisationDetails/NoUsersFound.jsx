import { Flex, Text } from "@chakra-ui/react"
export default function NoUsersFound({ userType }) {
    return (
        <Flex
            h={'100px'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text fontSize={'16px'} fontWeight={500} color={'blackAlpha.800'}>
                No {userType} found
            </Text>
        </Flex>
    )
}
