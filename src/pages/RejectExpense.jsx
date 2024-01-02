import React from 'react';
import { Flex, Text, Button, Spinner } from '@chakra-ui/react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import RejectionReasons from '../constant/RejectionReasons';
import useUserStore from '../store/useUserStore';
import createAxiosInstance from '../utils/ApiHandler';
import useeChakraToast from '../hooks/useChakraToast';
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
const RejectExpense = () => {

    const toast = useeChakraToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);

    const {id:expenseId} = useParams();

    const user = useUserStore(state => state.user);

    const [rejectionReason, setRejectionReason] = React.useState(RejectionReasons[0].value);

    const handleReasonChange = (e)=>{
        setRejectionReason(e.value);
    }
    const handleRejectRequest =  async ()=>{
        const accessToken = user.accessToken;
        const api = createAxiosInstance(accessToken);
        const url = `/user/expense/reject/${expenseId}`;
        setIsLoading(true);
        try {
            await api.put(url, {expenseId, reason: rejectionReason});
            toast({ 
                title: 'Success',
                description: 'Expense rejected successfully',
                status: 'success',
            });
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response.data.message,
                status: 'error',
            });
        }
        setIsLoading(false);
    }
    return (
        <Flex
            bg={'white'}
            flexDirection={'column'}
            p={'16px'}
            gap={'14px'}
            flexGrow={1}
        >
            <Text
                color={'rgba(0, 0, 0, 0.86)'}
                fontSize={'20px'}
                fontWeight={700}
            >
                Reason
            </Text>
            <Text
                fontSize={'14px'}
                color={'blackalpha.700'}
                fontWeight={400}
            >
                Please add a reason of rejection for the given expense
            </Text>
            <Select
                    options={RejectionReasons}
                    defaultValue={RejectionReasons[0]}
                    styles={reactSelectCustomStyle}
                    isSearchable={false}
                    onChange={handleReasonChange}
                    
                />
            <Flex
                flex={1}
                alignItems={'flex-end'}
            >
                <Button
                    w={'100%'}
                    color={'white'}
                    h={'48px'}
                    isDisabled={isLoading}
                    onClick={handleRejectRequest}
                    colorScheme='purple'
                >
                    {isLoading ? <Spinner /> : 'Save'}
                </Button>
            </Flex>
        </Flex>
    );
}

export default RejectExpense;
