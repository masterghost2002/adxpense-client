import { Flex, Text, Box, Image, Button } from "@chakra-ui/react"
import WelcomeImage from '../static/images/Welcome.png'
import { useNavigate } from "react-router-dom"
export default function Welcome() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.setItem('first-time', JSON.stringify(false));
        navigate('sign-in')
    }
    return (
        <Flex
            w='100%'
            h='100%'
            bg={'#914FEB'}
            justifyContent='space-evenly'
            p={4}
            flexDirection={'column'}
            gap={10}
        >
            <Box>
                <Text
                    color={'#E2E8F0'}
                    fontSize={'24px'}
                    fontWeight={700}
                    textAlign={'center'}
                >
                    Billboard to Bank,
                </Text>
                <Text
                    color={'#E2E8F0'}
                    fontSize={'20px'}
                    fontWeight={700}
                    textAlign={'center'}
                >
                    Claims Made Easy
                </Text>
            </Box>
            <Flex
                justifyContent={'center'}
                position={'relative'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="214" height="214" viewBox="0 0 214 214" fill="none">
                    <circle cx="107" cy="107" r="107" fill="white" fillOpacity="0.05" />
                </svg>
                <Image
                    src={WelcomeImage}
                    position={'absolute'}
                />
            </Flex>
            <Flex
                flexDirection={'column'}
                gap={5}
            >
                <Button
                    w={'100%'}
                    bg={'brand_secondary.500'}
                    color={'white'}
                    onClick={handleClick}
                >
                    Get Started
                </Button>
                <Text
                    fontSize={'14px'}
                    fontWeight={400}
                    color={'#FFF'}
                    textAlign={'center'}
                    h={'48px'}
                >
                    By continuing, you agree that you have read and accepted our {" "}
                    <Text
                        as={"span"}
                        fontWeight={800}
                        textDecoration={'underline'}
                    >
                        T&Cs {" "}
                    </Text>
                    and {" "}
                    <Text
                        as={"span"}
                        fontWeight={800}
                        textDecoration={'underline'}
                    >
                        Privacy Policy
                    </Text>
                </Text>
            </Flex>

        </Flex>
    )
}
