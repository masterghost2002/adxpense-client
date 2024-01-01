import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import Select from "react-select";
import ExpenseCategory from "../../constant/ExpenseCategory";
const reactSelectCustomStyle = {
    control: (base, state) => ({
        ...base,
        height: '48px',
        width: '100%',
        flexShrink: 0,
        borderColor: state.isFocused ? '#914FEB' : 'rgba(0, 0, 0, 0.05)',
    }),
    option: (base, state) => ({
        ...base,
        color: state.isSelected ? 'white' : 'black',
        backgroundColor: state.isSelected ? '#914FEB' : 'white',
    }),
};
export default function CategorySelector({ setCategory, error, setFormError, value }) {
    const isError = error['category'] !== '';
    const defaultValue = value ? ExpenseCategory.find(val => val.value === value) : ExpenseCategory[0];
    const placeholder = defaultValue.label;
    const handleCategoryChange = (e) => {
        setFormError(prevState => ({
            ...prevState,
            category: ''
        }));
        setCategory(e.value);
    }
    return (
        <Flex
            flexDirection={'column'}
            width={'100%'}
            gap={'8px'}
        >
            <label
                htmlFor={'category'}
                style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.48)',
                }}
            >
                Category of Expense
            </label>
            <FormControl isInvalid={isError}>

                <Select
                    options={ExpenseCategory}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    styles={reactSelectCustomStyle}
                    isSearchable={false}
                    onChange={handleCategoryChange}
                    
                />
                {
                    isError && <FormErrorMessage>
                        {error['category']}
                    </FormErrorMessage>
                }
            </FormControl>

        </Flex>
    )
}
