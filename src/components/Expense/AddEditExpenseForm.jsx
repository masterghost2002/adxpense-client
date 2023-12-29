import { useState } from 'react'
import { Button, Spinner, Flex } from '@chakra-ui/react';
import Form from "../../theme/uielements/Form"
import InputGroup from "../FormInputs/InputGroup";
import CategorySelector from './CategorySelector';
import AmountInput from '../FormInputs/AmountInput';
import DateInput from '../FormInputs/DateInput';
import AggreInput from '../FormInputs/AggreInput';
import FilesInput from '../FormInputs/FilesInput';
import FileContainer from '../FileContainer';
import validateExpense from '../../form-validation/validateExpense';
import useChakraToast from '../../hooks/useChakraToast';
import { set } from 'zod';
const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
export default function AddEditExpenseForm({ handleSubmit, formDefaultValues, isLoading }) {

    const toast = useChakraToast();

    // form state
    const [category, setCategory] = useState(formDefaultValues?.category || 'travel');
    const [expenseNote, setExpenseNote] = useState(formDefaultValues?.expenseNote || '');
    const [amount, setAmount] = useState(formDefaultValues?.amount || '');
    const [currency, setCurrency] = useState(formDefaultValues?.currency || '');
    const [billingDate, setBillingDate] = useState(formDefaultValues?.billingDate || new Date());
    const [merchantName, setMerchantName] = useState(formDefaultValues?.merchantName || '');
    const [remarks, setRemarks] = useState(formDefaultValues?.remarks || '');
    const [isAggre, setIsAggre] = useState(formDefaultValues?.isAggre || false);
    const [receipts, setReceipts] = useState(formDefaultValues?.receipts || []);

 

    const [formError, setFormError] = useState({
        category: '',
        expenseNote: '',
        amount: '',
        currency: '',
        billingDate: '',
        merchantName: '',
        remarks: '',
        aggree: '',
    });

    const removeReceipt = (index) => {
        setReceipts(prevState => prevState.filter((file, i) => i !== index));
    };

    const validateForm = (formData) => {
        const result = validateExpense.safeParse(formData);
        if (result.success) return { isSuccess: true, data: result.data };
        result.error.errors.forEach(error => {
            setFormError(prevState => ({
                ...prevState,
                [error.path[0]]: error.message
            }));
        })
        return { isSuccess: false, data: null }
    };
    function uploadMultipleFiles(event) {
        const files = Array.from(event.target.files);
        if (files.some(file => file.size > MAX_FILE_SIZE)) {
            toast({ status: 'error', message: 'File size should not exceed 10 MB.', title: 'File size exceeded' });
            return;
        }
        if (files.some(file => !allowedTypes.includes(file.type))) {
            toast({ status: 'error', message: 'Only images and pdfs are allowed.', title: 'Invalid file type' });
            return;
        }
        setReceipts(prevState => [...prevState, ...files]);
    };
    const handleAmountAndCurrencyChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount') {
            setFormError(prevState => ({
                ...prevState,
                amount: ''
            }))
            setAmount(value);
        } else {
            setFormError(prevState => ({
                ...prevState,
                currency: ''
            }));
            setCurrency(value);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'expensenote':
                setFormError(prevState => ({
                    ...prevState,
                    expenseNote: ''
                }))
                setExpenseNote(value);
                break;
            case 'merchantName':
                setFormError(prevState => ({
                    ...prevState,
                    merchantName: ''
                }));
                setMerchantName(value);
                break;
            case 'remarks':
                setFormError(prevState => ({
                    ...prevState,
                    remarks: ''
                }));    
                setRemarks(value);
                break;
            default:
                break;
        }
    }
    const handleIsAggreChange = (e) => {
        setIsAggre(e.target.checked);
        setFormError(prevState => ({
            ...prevState,
            aggree: ''
        }))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { isSuccess, data } = validateForm({ merchantName, remarks, category, amount, expenseNote, currency, billingDate, receipts });
        console.log({ isSuccess, data });
        if (!isSuccess) return;
        if (!isAggre) {
            setFormError(prevState => ({
                ...prevState,
                aggree: 'Please check the box to proceed'
            }))
            return;
        }
        // if (!isSuccess) return;
        // handleSubmit(data);
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
            <CategorySelector
                error={formError}
                setCategory={setCategory}
                setFormError={setFormError}
            />
            <InputGroup
                label={'Expense Note'}
                h={'48px'}
                name={'expenseNote'}
                placeholder={''}
                onChange={handleChange}
                error={formError}
            />
            <AmountInput
                label={'Amount'}
                placeholder={''}
                onChange={handleAmountAndCurrencyChange}
                error={formError}
            />
            <DateInput
                label={'Billing Date'}
                name={'billingDate'}
                placeholder={''}
                onChange={handleChange}
                selectedDate={billingDate}
                setDate={setBillingDate}
            />
            <InputGroup
                label={'Merchant Name'}
                h={'48px'}
                name={'merchantName'}
                placeholder={''}
                onChange={handleChange}
                error={formError}
            />
            <InputGroup
                label={'Remarks'}
                h={'48px'}
                name={'remarks'}
                placeholder={''}
                onChange={handleChange}
                error={formError}
            />
            <Flex
                gap={'20px'}
                flexWrap={'wrap'}
            >
                {
                    receipts.map((file, index) => (
                        <FileContainer
                            key={`${file.name}-${index}`}
                            index={index}
                            onCancel={removeReceipt}
                        />
                    ))
                }
                <FilesInput
                    multiple
                    onChange={uploadMultipleFiles}
                    name={'receipts'}
                    id={'receipts'}
                />
            </Flex>
            <AggreInput
                isChecked={isAggre}
                handleIsAggree={handleIsAggreChange}
                formError={formError}
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
