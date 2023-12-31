import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import useUserStore from '../store/useUserStore';
import useChakraToast from '../hooks/useChakraToast';
import WarningHeader from '../components/Expense/WarningHeader';
import AddEditExpenseForm from '../components/Expense/AddEditExpenseForm';
import UploadPage from '../components/UploadPage';
import createAxiosInstance from '../utils/ApiHandler';
import {useNavigate} from 'react-router-dom';
const AddExpense = () => {

    const toast = useChakraToast();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const user = useUserStore(state => state.user);
    const navigate = useNavigate();

    const handleExpenseAdd = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'receipts')
                formData.append(key, data[key]);
        });
        data.receipts.forEach((receipt) => {
            formData.append('files', receipt);
        });
        const accessToken = user.accessToken;
        const api = createAxiosInstance(accessToken);
        setIsLoading(true);
        try {
            await api.post(
                '/user/expense/add',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const progressPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setProgress(progressPercent);
                    },
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate('/');
            setIsLoading(false);
            toast({ title: 'Expense added successfully', status: 'success' });
        } catch (error) {
            setIsLoading(false);
            const message = error.response?.data?.message || error.message;
            toast({ title: 'Something went wrong', status: 'error', message });
        }
    };
    return (
        <>
            <UploadPage
                isOpen={isLoading}
                progress={progress}
            />
            <Flex
                p={4}
                flexDirection={'column'}
                gap={'20px'}
                flexGrow={1}
                flexShrink={0}
                bg={'white'}
            >
                <WarningHeader />
                <AddEditExpenseForm
                    handleSubmit={handleExpenseAdd}
                    isLoading={isLoading}
                />
            </Flex>
        </>
    );
}

export default AddExpense;
