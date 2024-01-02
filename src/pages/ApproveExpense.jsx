import React from 'react';
import { Flex, Text, Button, Spinner, Textarea } from '@chakra-ui/react';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useOrganisationStore from '../store/useOrganisationStore';
import createAxiosInstance from '../utils/ApiHandler';
import useChakraToast from '../hooks/useChakraToast';
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


const ApproveExpense = () => {

    const navigate = useNavigate();

    const { id: expenseId } = useParams();

    const usersMap = useOrganisationStore(state => state.usersMap);
    const usersOptions = usersMap ? Object.values(usersMap).filter(user => user.role !== 'employee').map(user => ({
        value: user.id,
        label: user.name,
    })) : { label: 'No users found', value: 'no-users-found' };

    const loggedUser = useUserStore(state => state.user);
    const incrementRemainingSettlements = useUserStore(state=>state.incrementRemainingSettlements);

    const [remarks, setRemarks] = React.useState('');
    const [selectedUser, setSelectedUser] = React.useState(usersOptions[0].value);
    const [isLoading, setIsLoading] = React.useState(false);

    const toast = useChakraToast();

    const handleSelectedUser = (e) => {
        setSelectedUser(e.value);
    }

    const handleApproveRemarksChange = (e) => {
        setRemarks(e.target.value);
    }
    const handleApprove = async () => {
        const accessToken = loggedUser.accessToken;
        const api = createAxiosInstance(accessToken);
        setIsLoading(true);
        try {
            await api.put(`/manager/expense/approve/${expenseId}`, { settlementBy: selectedUser, approveRemarks: remarks });
            setIsLoading(false);
            if(loggedUser.id === selectedUser){
                incrementRemainingSettlements();
            }
            navigate('/expenses');
        } catch (error) {
            console.log(error);
            toast({
                title: 'Server Error',
                description: 'Something went wrong while approving the expense',
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
                fontSize={'14px'}
                color={'rgba(0, 0, 0, 0.64)'}
                fontWeight={400}
            >
                Please assign the person in charge for the settlement
            </Text>
            <Select
                options={usersOptions}
                defaultValue={usersOptions[0]}
                styles={reactSelectCustomStyle}
                isSearchable={false}
                onChange={handleSelectedUser}

            />
            <Text
                color={'rgba(0, 0, 0, 0.64)'}
                fontSize={'14px'}
                fontWeight={400}

            >
                Add remarks
            </Text>
            <Textarea
                placeholder={'Add remarks'}
                onChange={handleApproveRemarksChange}
                value={remarks}
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
                    onClick={handleApprove}
                    colorScheme='purple'
                >
                    {isLoading ? <Spinner /> : 'Save'}
                </Button>
            </Flex>
        </Flex>
    );
}

export default ApproveExpense;
