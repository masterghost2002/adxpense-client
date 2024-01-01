import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import AddEditExpenseForm from '../components/Expense/AddEditExpenseForm';
import createAxiosInstance from '../utils/ApiHandler';
import UploadPage from '../components/UploadPage';
import useChakraToast from '../hooks/useChakraToast';
const EditExpense = () => {

    const toast = useChakraToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false); // [true, false
    const [progress, setProgress] = useState(0);
    const location = useLocation();
    const expense = location.state;
    const user = useUserStore(state => state.user);
    const { id } = useParams();
    const handleEdit = async (data) => {
        const accessToken = user.accessToken;
        setIsLoading(true);
        const api = createAxiosInstance(accessToken);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'receipts')
                formData.append(key, data[key]);

        });
        data.receipts.forEach((receipt) => {
            if (typeof receipt !== 'string')
                formData.append('files', receipt);
            else formData.append('receipts', receipt);
        });
        try {
            await api.put(
                `/user/expense/update/${id}`,
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
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            toast({
                title:'Server Error',
                status:'Error',
                description:'Failed to update expense',
            })
        }
        setIsLoading(false);
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
                <AddEditExpenseForm
                    formDefaultValues={expense}
                    handleSubmit={handleEdit}
                    isLoading={isLoading}
                />
            </Flex>
        </>

    );
}

export default EditExpense;
