import React from 'react';
import { Flex, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
const CustomInput = React.forwardRef((props, ref) => {
    return <Input
        {...props}
        px={1}
        fontSize={'14px'}
        fontWeight={600}
        border='none'
        readOnly
        w={'100px'}
        ref={ref}
        cursor={'pointer'}
        
    />;
});
const DateInput = ({ label, ...props }) => {
    return (
        <Flex flexDirection={'column'} width={'100%'} gap={'8px'}>
            <label
                htmlFor={props.name}
                style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.48)',
                }}
            >
                {label}
            </label>
            <Flex
                w={'fit-content'}
                h={'48px'}
                alignItems={'center'}
                gap={2}
                border={'1px solid rgba(0, 0, 0, 0.05)'}
                p={2}
                color={'#2938F7'}
                borderRadius={'4px'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M14.1665 2.49996C14.1665 2.03913 13.7932 1.66663 13.3332 1.66663C12.8732 1.66663 12.4998 2.03913 12.4998 2.49996H7.49984C7.49984 2.03913 7.1265 1.66663 6.6665 1.66663C6.2065 1.66663 5.83317 2.03913 5.83317 2.49996C3.53567 2.49996 1.6665 4.36913 1.6665 6.66663V14.1666C1.6665 16.4641 3.53567 18.3333 5.83317 18.3333H14.1665C16.464 18.3333 18.3332 16.4641 18.3332 14.1666V6.66663C18.3332 4.36913 16.464 2.49996 14.1665 2.49996ZM5.83317 4.16663V4.99996C5.83317 5.46079 6.2065 5.83329 6.6665 5.83329C7.1265 5.83329 7.49984 5.46079 7.49984 4.99996V4.16663H12.4998V4.99996C12.4998 5.46079 12.8732 5.83329 13.3332 5.83329C13.7932 5.83329 14.1665 5.46079 14.1665 4.99996V4.16663C15.5448 4.16663 16.6665 5.28829 16.6665 6.66663H3.33317C3.33317 5.28829 4.45484 4.16663 5.83317 4.16663ZM14.1665 16.6666H5.83317C4.45484 16.6666 3.33317 15.545 3.33317 14.1666V8.33329H16.6665V14.1666C16.6665 15.545 15.5448 16.6666 14.1665 16.6666ZM14.1665 10.8333C14.1665 11.2933 13.7932 11.6666 13.3332 11.6666C12.8732 11.6666 12.4998 11.2933 12.4998 10.8333C12.4998 10.3733 12.8732 9.99996 13.3332 9.99996C13.7932 9.99996 14.1665 10.3733 14.1665 10.8333ZM10.8332 10.8333C10.8332 11.2933 10.4598 11.6666 9.99984 11.6666C9.53984 11.6666 9.1665 11.2933 9.1665 10.8333C9.1665 10.3733 9.53984 9.99996 9.99984 9.99996C10.4598 9.99996 10.8332 10.3733 10.8332 10.8333ZM7.49984 10.8333C7.49984 11.2933 7.1265 11.6666 6.6665 11.6666C6.2065 11.6666 5.83317 11.2933 5.83317 10.8333C5.83317 10.3733 6.2065 9.99996 6.6665 9.99996C7.1265 9.99996 7.49984 10.3733 7.49984 10.8333ZM14.1665 14.1666C14.1665 14.6266 13.7932 15 13.3332 15C12.8732 15 12.4998 14.6266 12.4998 14.1666C12.4998 13.7066 12.8732 13.3333 13.3332 13.3333C13.7932 13.3333 14.1665 13.7066 14.1665 14.1666ZM10.8332 14.1666C10.8332 14.6266 10.4598 15 9.99984 15C9.53984 15 9.1665 14.6266 9.1665 14.1666C9.1665 13.7066 9.53984 13.3333 9.99984 13.3333C10.4598 13.3333 10.8332 13.7066 10.8332 14.1666ZM7.49984 14.1666C7.49984 14.6266 7.1265 15 6.6665 15C6.2065 15 5.83317 14.6266 5.83317 14.1666C5.83317 13.7066 6.2065 13.3333 6.6665 13.3333C7.1265 13.3333 7.49984 13.7066 7.49984 14.1666Z" fill="#2938F7" fillOpacity="0.3" />
                </svg>
                <DatePicker
                    selected={props.selectedDate}
                    onChange={(date) => props.setDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={<CustomInput />}
                />
            </Flex>

        </Flex>
    );
}

export default DateInput;