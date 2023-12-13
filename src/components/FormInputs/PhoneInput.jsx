import { Flex, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
export default function PhoneInput({ label, setPhone, error, setFormError, ...props }) {
    const isError = error['phone'] !== '';
    const handlePhoneNumber = (e) => {
        setFormError(prevState => ({
            ...prevState,
            phone: ''
        }))
        setPhone(e.target.value)
    }

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
            <FormControl isInvalid={isError}>
                <Input variant={'outline'} {...props} value={props.value} onChange={handlePhoneNumber} />
                {
                    isError && <FormErrorMessage>
                        {error['phone']}
                    </FormErrorMessage>
                }
            </FormControl >
        </Flex >
    );
}