import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
const ResendHandler = ({ handleResend }) => {
    const [seconds, setSeconds] = useState(60);
   
    const handleOTP = () => {
        setSeconds(60);
        handleResend();
    };
   
    useEffect(() => {
        if(seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [seconds]);
    
    return (
        <Box>
            <Button
                variant={'ghost'}
                textDecoration={'underline'}
                color={'brand_primary.900'}
                fontSize={'20px'}
                fontWeight={700}
                isDisabled={seconds > 0}
                onClick={handleOTP}
            >
                Resend
            </Button>
            {seconds > 0 && (
                <Text
                    fontWeight={700}
                    fontSize={'14px'}
                    color={'blackAlpha.600'}
                >Resend in 00.{seconds >= 10 ? seconds : '0' + seconds}</Text>
            )}
        </Box>
    );
};
export default React.memo(ResendHandler);