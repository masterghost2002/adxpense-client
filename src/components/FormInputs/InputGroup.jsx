import { Flex, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
export default function InputGroup({ label,error, ...props }) {
  const isError = error?error[props.name] !== '':false;
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
        <Input variant={'outline'} width={'100%'} {...props} />
        {
          isError && <FormErrorMessage>
            {error[props.name]}
          </FormErrorMessage>
        }
      </FormControl>
    </Flex>
  );
}