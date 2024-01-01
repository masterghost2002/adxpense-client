import { useState } from 'react'
import { Flex, VStack, Text, HStack, PinInput, PinInputField, Button, Spinner } from '@chakra-ui/react'
import ResendHandler from '../components/verify-otp/ResendHandler'
import { useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import useOrganisationStore from '../store/useOrganisationStore';
import useChakraToast from '../hooks/useChakraToast'
import createAxiosInstance from '../utils/ApiHandler'
function OTPBox({ setOtp, otp, isInvalid }) {
  return (
    <HStack justifyContent={'space-evenly'} width={'100%'}>
      <PinInput
        size={'lg'}
        type="number"
        placeholder=""
        colorScheme="black"
        color={'black'}
        value={otp}
        onChange={(value) => setOtp(value)}
        isInvalid={isInvalid}
      >
        <PinInputField color={'black'} backgroundColor={'white'} />
        <PinInputField color={'black'} backgroundColor={'white'} />
        <PinInputField color={'black'} backgroundColor={'white'} />
        <PinInputField color={'black'} backgroundColor={'white'} />
        <PinInputField color={'black'} backgroundColor={'white'} />
        <PinInputField color={'black'} backgroundColor={'white'} />
      </PinInput>
    </HStack>
  );
}
export default function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState({ errorFor: '' });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useChakraToast();

  const setUser = useUserStore(state => state.setUser);
  const addLoggedUserInMap = useOrganisationStore(state=>state.addLoggedUserInMap);

  // navigation
  const navigate = useNavigate();
  // params handling
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const credential = params.get('credential');
  

  //toast
  const handleResend = async () => {
    const api = createAxiosInstance();
    try {
      await api.post('/user/sign-in/send-otp', { loginCredentials: credential });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
        status: 'error',
      })
    } finally {
      setIsLoading(false);
    }
  }
  const handleSignIn = async () => {
    const api = createAxiosInstance();
    setIsLoading(true);
    try {
      const res = await api.post('/user/sign-in/verify-otp',
        {
          loginCredentials: credential,
          otp
        }
      );
      const data = await res.data.data;
      setUser(data);
      addLoggedUserInMap(data);
      if (res.status === 200)
        navigate('/');

    } catch (err) {
      const message = err.response.data.message;
      const statusCode = err.response.data.statusCode;
      if (statusCode === 403 || statusCode === 404 || statusCode === 401)
        setError({ errorFor: 'otp', message });
      else
        toast({
          title: 'Something went wrong',
          description: 'Please try again later',
          status: 'error',
        });

    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Flex
      w={'100%'}
      h={'100%'}
      flexDirection={'column'}
      justify={'space-between'}
      bg={'#914FEB'}
      p={4}
    >
      <VStack
        gap={'26px'}
        justify={'center'}
        flex={1}
      >
        <Text
          fontSize={'20px'}
          fontWeight={700}
          color={'brand_primary.500'}
        >
          Enter OTP
        </Text>
        <OTPBox
          otp={otp}
          setOtp={setOtp}
          isInvalid={error.errorFor === 'otp'}
        />
        <ResendHandler
          handleResend={handleResend}
        />
      </VStack>
      <Button
        minH={'48px'}
        w={'100%'}
        bg={'brand_secondary.500'}
        color={'white'}
        _hover={{
          bg: 'brand_secondary.500'
        }}
        bottom={'100px'}
        onClick={handleSignIn}
        isDisabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? <Spinner /> : 'Sign In'}
      </Button>
    </Flex>
  )
}
