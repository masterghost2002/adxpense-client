import { Skeleton, Flex, Circle } from "@chakra-ui/react";
const UserSkeleton = ()=>{
    return (
        <Flex
            p={4}
            boxShadow={'0px 2px 16px 0px rgba(0, 0, 0, 0.05)'}
            my={'10px'}
            alignItems={'center'}
            gap={5}
            borderRadius={'8px'}
            h={'66px'}
        >
            <Circle size={'40px'} bg={'gray.200'} />
            <Skeleton  h={'40px'} w={'100%'} borderRadius={'8px'}/>
        </Flex>
    )
}
export default function UserContainerSkeletons() {
    return (
        <>
        <UserSkeleton /> 
        <UserSkeleton />   
        </>
        
    )
}
