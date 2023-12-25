import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useParams, useSearchParams } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import useOrganisationStore from "../store/useOrganisationStore";
import useChakraToast from "../hooks/useChakraToast";
import createAxiosInstance from '../utils/ApiHandler';
import DetailsForm from "../components/AddEditUser/DetailsForm";
import { useNavigate } from "react-router-dom";
export default function AddUser() {
  //for navigating to previous page
  const navigate = useNavigate();

  // toast 
  const toast = useChakraToast();

  // organisation store
  const addNewUser = useOrganisationStore(state=>state.addNewUser);

  // get organisation id and name from url
  const { id: organisationId } = useParams();
  const [searchParams] = useSearchParams();
  const organisationName = searchParams.get('organisationName');

  //get access token from store
  const getAccessToken = useUserStore(state => state.getAccessToken);

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  // form submit handler
  const handleSubmit = async (userData) => {
    const accessToken = getAccessToken();
    const api = createAxiosInstance(accessToken);
    setIsLoading(true);
    try {
      const result = await api.post('/manager/user/add', {
        userData,
        organisationData: { organisationId, organisationName }
      });
      addNewUser(result.data.data);
      setIsLoading(false);
      navigate(-1);
    } catch (error) {
      const statusCode = error.response?.data?.statusCode;
      const message = error?.response?.data?.message;
      if (statusCode === 409)
        toast({ status: 'error', message, title: 'User already exists' });
      else
        toast({ status: 'error', message: 'Failed to add user', title: 'Something went wrong' });
    }
    setIsLoading(false);
  }
  return (
    <Flex
      p={4}
      height={'100%'}
      bg={'white'}
    >

      <DetailsForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />


    </Flex>
  )
}