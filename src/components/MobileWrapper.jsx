import {Flex, Box} from '@chakra-ui/react';
export default function MobileWrapper({children}) {
  return (
    <Flex
        w='100vw'
        h='100dvh'
        justifyContent={'center'}
        alignItems={'center'}
    >
        <Box
            w={{base:"100%", md:"360px"}}
            h={{base:"100%", md:"600px"}}
        >
            {children}
        </Box>
    </Flex>
  )
}
