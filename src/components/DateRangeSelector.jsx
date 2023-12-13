import React from 'react';
import { Input, Flex, Box, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarIcon = () => {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.166 2.49984C14.166 2.039 13.7927 1.6665 13.3327 1.6665C12.8727 1.6665 12.4993 2.039 12.4993 2.49984H7.49935C7.49935 2.039 7.12602 1.6665 6.66602 1.6665C6.20602 1.6665 5.83268 2.039 5.83268 2.49984C3.53518 2.49984 1.66602 4.369 1.66602 6.6665V14.1665C1.66602 16.464 3.53518 18.3332 5.83268 18.3332H14.166C16.4635 18.3332 18.3327 16.464 18.3327 14.1665V6.6665C18.3327 4.369 16.4635 2.49984 14.166 2.49984ZM5.83268 4.1665V4.99984C5.83268 5.46067 6.20602 5.83317 6.66602 5.83317C7.12602 5.83317 7.49935 5.46067 7.49935 4.99984V4.1665H12.4993V4.99984C12.4993 5.46067 12.8727 5.83317 13.3327 5.83317C13.7927 5.83317 14.166 5.46067 14.166 4.99984V4.1665C15.5443 4.1665 16.666 5.28817 16.666 6.6665H3.33268C3.33268 5.28817 4.45435 4.1665 5.83268 4.1665ZM14.166 16.6665H5.83268C4.45435 16.6665 3.33268 15.5448 3.33268 14.1665V8.33317H16.666V14.1665C16.666 15.5448 15.5443 16.6665 14.166 16.6665ZM14.166 10.8332C14.166 11.2932 13.7927 11.6665 13.3327 11.6665C12.8727 11.6665 12.4993 11.2932 12.4993 10.8332C12.4993 10.3732 12.8727 9.99984 13.3327 9.99984C13.7927 9.99984 14.166 10.3732 14.166 10.8332ZM10.8327 10.8332C10.8327 11.2932 10.4593 11.6665 9.99935 11.6665C9.53935 11.6665 9.16602 11.2932 9.16602 10.8332C9.16602 10.3732 9.53935 9.99984 9.99935 9.99984C10.4593 9.99984 10.8327 10.3732 10.8327 10.8332ZM7.49935 10.8332C7.49935 11.2932 7.12602 11.6665 6.66602 11.6665C6.20602 11.6665 5.83268 11.2932 5.83268 10.8332C5.83268 10.3732 6.20602 9.99984 6.66602 9.99984C7.12602 9.99984 7.49935 10.3732 7.49935 10.8332ZM14.166 14.1665C14.166 14.6265 13.7927 14.9998 13.3327 14.9998C12.8727 14.9998 12.4993 14.6265 12.4993 14.1665C12.4993 13.7065 12.8727 13.3332 13.3327 13.3332C13.7927 13.3332 14.166 13.7065 14.166 14.1665ZM10.8327 14.1665C10.8327 14.6265 10.4593 14.9998 9.99935 14.9998C9.53935 14.9998 9.16602 14.6265 9.16602 14.1665C9.16602 13.7065 9.53935 13.3332 9.99935 13.3332C10.4593 13.3332 10.8327 13.7065 10.8327 14.1665ZM7.49935 14.1665C7.49935 14.6265 7.12602 14.9998 6.66602 14.9998C6.20602 14.9998 5.83268 14.6265 5.83268 14.1665C5.83268 13.7065 6.20602 13.3332 6.66602 13.3332C7.12602 13.3332 7.49935 13.7065 7.49935 14.1665Z" fill="#914FFB" fillOpacity="0.6" />
  </svg>)
}
const CustomInput = React.forwardRef((props, ref) => {
  return <Input 
    {...props}  
    px={1} 
    border={'none'} 
    fontSize={'12px'} 
    fontWeight={600} 
    h={'fit-content'} 
    readOnly 
    ref={ref} 
    cursor={'pointer'}
    />;
});
export default function DateRangeSelector({startDate, setStartDate, endDate, setEndDate}) {

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      border={'1px solid rgba(145, 79, 251, 0.05)'}
      borderRadius={'24px'}
      py={'11px'}
      px={'14px'}
      bg={'white'}
    >
      <Box
        flexShrink={0}
        alignItems={'center'}
      >
      <CalendarIcon/>
      </Box>
      <Flex
        alignItems={'center'}
        w={'130px'}
        justifyContent={'space-between'}
        color={'rgba(0, 0, 0, 0.64)'}
      >
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          customInput={<CustomInput  />}
          dateFormat="dd/MM/yy"
        />
        <Text
          fontSize={'12px'} fontWeight={600}
        >
          -
        </Text>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}Input
          customInput={<CustomInput/>}
          dateFormat="dd/MM/yy"
        />
      </Flex>

    </Flex>
  );
};
