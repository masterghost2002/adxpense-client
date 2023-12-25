import { Flex, Text, Image, VStack, ScaleFade } from "@chakra-ui/react";
import AdarthLogo from '../static/images/AdarthLogoSecondary.png'
export default function Splash() {
    return (
            <Flex
                h={'100%'}
                w={'100%'}
                bg={'#914FEB'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <ScaleFade
                    initialScale={0.7}
                    in={true}
                >
                    <VStack
                        gap={0}
                    >
                        <Text
                            color='white'
                            fontWeight={700}
                            fontSize={'48px'}
                            letterSpacing={'-1.44px'}
                        >
                            AdXpense
                        </Text>
                        <Image
                            w={'90px'}
                            h={'24px'}
                            src={AdarthLogo}
                        />
                    </VStack>
                </ScaleFade>

            </Flex>
    )
}
