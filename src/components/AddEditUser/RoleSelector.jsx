import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import Select from "react-select";
import roles from "../../constant/Roles";
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
export default function RoleSelector({ setRole, error, setFormError, value }) {
    const isError = error['role'] !== '';
    const defaultValue = value ? roles.find(role => role.value === value) : roles[0];
    const placeholder = defaultValue.label;
    const handleRoleChange = (e) => {
        setFormError(prevState => ({
            ...prevState,
            role: ''
        }));
        setRole(e.value);
    }
    return (
        <Flex
            flexDirection={'column'}
            width={'100%'}
            gap={'8px'}
        >
            <label
                htmlFor={'role'}
                style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.48)',
                }}
            >
                Role
            </label>
            <FormControl isInvalid={isError}>

                <Select
                    options={roles}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    styles={reactSelectCustomStyle}
                    isSearchable={true}
                    onChange={handleRoleChange}
                />
                {
                    isError && <FormErrorMessage>
                        {error['role']}
                    </FormErrorMessage>
                }
            </FormControl>

        </Flex>
    )
}
