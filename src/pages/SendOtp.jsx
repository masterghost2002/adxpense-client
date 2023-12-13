import { useState } from "react";
import { Input, Text, Flex, VStack, Button, Spinner, FormControl, FormErrorMessage, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form from '../theme/uielements/Form';
import AdarthLogoSec from '../static/images/AdarthLogoSecondary.png';
import config from '../config/config'
import axios from 'axios';
import useChakraToast from '../hooks/useChakraToast'
export default function SendOtp() {
  const [credential, setCredential] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ isError: false, message: '' });
  const navigate = useNavigate();
  const toast = useChakraToast();
  const handleChange = (e) => {
    setCredential(e.target.value);
    setIsError({ isError: false, message: '' });
  }
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${config.baseServerUrl}/user/sign-in/send-otp`, { loginCredentials: credential });
      navigate(`/sign-in/verify-otp?credential=${credential}`);
    } catch (error) {
      console.log(error);
      const statusCode = error.response.data.statusCode;
      const message = error.response.data.message;
      if (statusCode === 400 || statusCode === 404)
        setIsError({ isError: true, message });
      else toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        status: 'error',
      })
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Flex
      w='100%'
      h='100%'
      bg={'#914FEB'}
      justifyContent='center'
      alignItems='center'
      p={4}
      color={'white'}
    >
      <VStack
        gap='26px'
        width={'100%'}
      >
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text
            fontSize='40px'
            fontWeight={700}
          >
            AdXpense
          </Text>
          <Image
            src={AdarthLogoSec}
            h={'24px'}
            w={'90px'}
          />
        </Flex>
        <VStack
          gap='16px'
          width={'100%'}
        >
          <Text
            color='brand_primary.500'
            fontWeight={700}
            fontSize='20px'
          >
            Login
          </Text>
          <Form
            w={'100%'}
            display={'flex'}
            flexDirection={'column'}
            gap={'26px'}
            onSubmit={handleSendOtp}
          >
            <FormControl isInvalid={isError.isError}>
              <Input
                placeholder='Enter email'
                variant='filled'
                h='48px'
                onChange={handleChange}
              />
              <FormErrorMessage>
                {isError.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              bg='brand_secondary.500'
              w={'100%'}
              color={'white'}
              h={'48px'}
              type="submit"
              isDisabled={isLoading}
              _hover={{
                backgroundColor: 'brand_secondary.500'
              }}
            >
              {isLoading ? <Spinner /> : 'Get OTP'}
            </Button>
          </Form>
        </VStack>
      </VStack>
    </Flex>
  )
}
