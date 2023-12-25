import { useEffect, useState } from "react";
import ProfileCard from "../components/UserProfile/ProfileCard"
import { useParams } from "react-router-dom"
import { Flex, Heading } from "@chakra-ui/react";
import ExpenseDetails from "../components/UserProfile/ExpenseDetails";
import DateRangeSelector  from "../components/DateRangeSelector";
import ExportHandler from "../components/Export/ExportHandler";
import useUserStore from "../store/useUserStore";
import createAxiosInstance from '../utils/ApiHandler';
import useChakraToast from "../hooks/useChakraToast";
import useOrganisationStore from '../store/useOrganisationStore';
export default function UserProfile() {

    // user expenses
    const [userExpenses, setUserExpenses] = useState([]);
    // get organization id, user id from url
    const params = useParams();
    const {id:organisationId, userId} = params;

    // getuser and setuser funtions from store 
    const getUserFromOrganisation = useOrganisationStore(state => state.getUser);
    const userData = getUserFromOrganisation(userId);
    const updateUser = useOrganisationStore(state=>state.updateUser);

    //get current logged user from store
    const currentLoggedUser = useUserStore(state => state.user);
    
    // toast
    const toast = useChakraToast();

    // date range handler
    const currentDate = new Date();
    const [startDate, setStartDate] = useState(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    const [endDate, setEndDate] = useState(new Date());
    
    // api loading state
    const [isLoading, setIsLoading] = useState(false);

    const handleArchive = async () => {
        setIsLoading(true);
        try {
            const api = createAxiosInstance(currentLoggedUser.accessToken);
            await api.put(`/manager/user/archive/${userData.id}`, { isArchived: !userData.isArchived });
            updateUser(userData.id, {...userData, isArchived: !userData.isArchived });
        } catch (error) {
            
            toast({title: 'Something went wrong', status: 'error', message:'Please try again later'})
        }
        setIsLoading(false);
    }

    const getUserExpenses = async ()=>{
        setIsLoading(true);
        try {
            const api = createAxiosInstance(currentLoggedUser.accessToken);
            const response = await api.get(`/user/organisation/${organisationId}/user/${userData.id}/expense?from=${startDate}&to=${endDate}`);
            setUserExpenses(response.data.data);
        } catch (error) {
            console.log(error);
            toast({title: 'Something went wrong', status: 'error', message:'Please try again later'})
        }
        setIsLoading(false);
    };
    useEffect(()=>{
        getUserExpenses();
    }, [startDate, endDate]);
    return (
        <Flex
            p={4}
            flexDirection={'column'}
            gap={'20px'}
            paddingBottom={'100px'}
            flexGrow={1}
            flexShrink={0}
            bg={'#FBFBFB'}
        >
            <ProfileCard
                userData={userData}
                isLoggedUser={currentLoggedUser.id === userData.id}
                handleArchive={handleArchive}
                isLoading={isLoading}
            />
            <Heading
                fontSize={'20px'}
                fontWeight={600}
                color={'blackalpha.800'}
            >
                Expense Details
            </Heading>
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <DateRangeSelector 
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
                <ExportHandler 
                    data={userExpenses}
                    fileName={`${userData.name}-${startDate}-${endDate}-expenses`}
                    isDisabled={isLoading  || userExpenses.length === 0}
                />
            </Flex>
            <ExpenseDetails 
                expenses = {userExpenses}
            />
        </Flex>
    )
}