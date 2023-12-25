import { useLocation } from "react-router-dom"
import { useState } from "react";
import { Flex } from "@chakra-ui/react"
import DetailsForm from "../components/AddEditUser/DetailsForm";
import createAxiosInstance from '../utils/ApiHandler';
import useUserStore from '../store/useUserStore';
import useChakraToast from '../hooks/useChakraToast';
export default function EditUser() {
    const toast = useChakraToast();
    const {state:userData} = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const loggedUser = useUserStore(state => state.user);
    const setLoggedUser = useUserStore(state => state.setUser);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const api = createAxiosInstance(loggedUser.accessToken);
            const res = await api.put(`/user/update/${userData.id}`, {updateDetails: formData});
            const data = res.data.data;
            if(data.id === loggedUser.id)
                setLoggedUser(data);
            toast({title:'User details updated', status:'success'});
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast({title:'Something went wrong', status:'error', message});
        }
        setIsLoading(false);
    }
    return (
        <Flex
            p={4}
            flexDirection={'column'}
            gap={'20px'}
            flexGrow={1}
            flexShrink={0}
            bg={'white'}
        >
            <DetailsForm
                formDefaultValues={userData}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </Flex>
    )
}