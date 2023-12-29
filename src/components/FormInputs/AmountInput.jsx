import { Flex, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';
import Select from "react-select";
import Currency from '../../constant/Currency';
const reactSelectCustomStyle = {
    control: (base, state) => ({
        ...base,
        height: '36px',
        width: '100px',
        flexShrink: 0,
        borderRadius: '18px',
        backgroundColor: 'rgba(41, 56, 247, 0.05)',
        borderColor: state.isFocused ? '#914FEB' : 'rgba(0, 0, 0, 0.05)',
    }),
    option: (base, state) => ({
        ...base,
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isSelected ? '#914FEB' : 'white',
    }),
};
export default function AmountInput({ label, error, onChange, ...props }) {
    const isError = error ? error[props.name] !== '' : false;
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
            <FormControl
                isInvalid={isError}

            >
                <Flex
                    border={'1px solid rgba(0, 0, 0, 0.05)'}
                    p={2}
                    borderRadius={'4px'}
                    alignItems={'center'}
                >
                    <Select
                        options={Currency}
                        defaultValue={Currency[0]}
                        styles={reactSelectCustomStyle}
                        isSearchable={true}
                        onChange={(e) => onChange({ target: { name: 'currency', value: e.value } })}
                        name='currency'
                    />
                    <Input
                        variant={'ghost'}
                        width={'100%'}
                        onChange={onChange}
                        {...props}
                        name='amount'
                        border={'none'}
                        h={'36px'}
                        type='number'
                    />
                </Flex>

                {
                    isError && <FormErrorMessage>
                        {error['amount']}
                    </FormErrorMessage>
                }
            </FormControl>
        </Flex>
    );
}