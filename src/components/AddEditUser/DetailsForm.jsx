import { useState } from 'react'
import { Button, Spinner } from '@chakra-ui/react';
import Form from "../../theme/uielements/Form"
import RoleSelector from "./RoleSelector";
import PhoneInput from "../FormInputs/PhoneInput";
import InputGroup from "../FormInputs/InputGroup";
import userSchema from '../../form-validation/validateUserData';
export default function DetailsForm({ handleSubmit, formDefaultValues, isLoading }) {
   
    // form state
    const [name, setName] = useState(formDefaultValues?.name || '');
    const [email, setEmail] = useState(formDefaultValues?.email || '');
    const [city, setCity] = useState(formDefaultValues?.city || '');
    const [state, setState] = useState(formDefaultValues?.state || '');
    const [role, setRole] = useState(formDefaultValues?.role || 'manager');
    const [phone, setPhone] = useState(formDefaultValues?.phone || '');

    // form error handler states, function
    const [formError, setFormError] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        role: '',
        phone: '',
    });
    const validateForm = (formData) => {
        const result = userSchema.safeParse(formData);
        if (result.success) return { isSuccess: true, data: result.data };
        result.error.errors.forEach(error => {
            setFormError(prevState => ({
                ...prevState,
                [error.path[0]]: error.message
            }))
        })
        return { isSuccess: false, data: null }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setFormError(prevState => ({
                    ...prevState,
                    name: ''
                }))
                setName(value);
                break;
            case 'email':
                setFormError(prevState => ({
                    ...prevState,
                    email: ''
                }))
                setEmail(value);
                break;
            case 'city':
                setFormError(prevState => ({
                    ...prevState,
                    city: ''
                }))
                setCity(value);
                break;
            case 'state':
                setFormError(prevState => ({
                    ...prevState,
                    state: ''
                }))
                setState(value);
                break;
            default:
                break;
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { isSuccess, data } = validateForm({ name, email, city, state, role, phone });
        if (!isSuccess) return;
        handleSubmit(data);
    }
    return (
        <Form
            width={'100%'}
            display={'flex'}
            flexDirection={'column'}
            gap={'24px'}
            height={'100%'}
            position={'relative'}
            onSubmit={handleFormSubmit}
        >
            <InputGroup
                label={'Name'}
                h={'48px'}
                name={'name'}
                placeholder={'John Doe'}
                onChange={handleChange}
                error={formError}
                value={name}
            />
            <RoleSelector
                setRole={setRole}
                error={formError}
                setFormError={setFormError}
                value={role}
            />
            <InputGroup
                label={'Email'}
                h={'48px'}
                name={'email'}
                placeholder={'example@mail.com'}
                onChange={handleChange}
                error={formError}
                value={email}
            />
            <PhoneInput
                label={'Phone Number'}
                h={'48px'}
                name={'phone'}
                placeholder={'123-456-7890'}
                type={'tel'}
                setPhone={setPhone}
                error={formError}
                setFormError={setFormError}
                value={phone}
            />
            <InputGroup
                label={'City'}
                h={'48px'}
                name={'city'}
                placeholder={'City'}
                onChange={handleChange}
                error={formError}
                value={city}
            />
            <InputGroup
                label={'State'}
                h={'48px'}
                name={'state'}
                placeholder={'State'}
                onChange={handleChange}
                error={formError}
                value={state}
            />
            <Button
                borderRadius={'8px'}
                mt={'20px'}
                p={2}
                bg={'brand_primary.500'}
                color={'white'}
                bottom={'10px'}
                width={'100%'}
                type="submit"
                _hover={{
                    bg: 'brand_primary.500',
                }}
                h={'48px'}
                title="add-edit-user-save-button"
                isDisabled={isLoading}
            >
                {isLoading ? <Spinner /> : 'Save'}
            </Button>
        </Form>
    )
}
