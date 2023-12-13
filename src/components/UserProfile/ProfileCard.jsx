import React from 'react'
import { Flex, Text, Box, Divider, Button, Spinner } from '@chakra-ui/react';
import EditPopover from './EditPopover';
import ProfileSVG from '../../constant/ProfileSVG';
import { useNavigate } from 'react-router-dom';
const RoleToTitle = {
  'accountant': 'Account Manager',
  'manager': 'Management',
  'admin': 'Admin',
  'employee': 'Employee'
}

const ProfileHeader = ({ userData, isLoggedUser, handleArchive, isLoading }) => {
  const navigate = useNavigate();
  return <Flex
    alignItems={'start'}
    width={'100%'}
    justifyContent={'space-between'}
  >

    <Flex
      gap={4}
      alignItems={'center'}
    >
      <Box
        borderRadius={'full'}
        backgroundColor={userData.role === 'employee' ? 'green.50' : 'rgba(145, 79, 251, 0.10)'}
        p={2}
        flexShrink={0}
        flexGrow={1}
      >
        {ProfileSVG[userData.role]}
      </Box>
      {/* name and role */}
      <Flex
        flexDirection={'column'}
      >
        <Text
          fontSize={'24px'}
          fontWeight={500}
        >
          {userData.name}
        </Text>
        <Text
          fontSize={'16px'}
          fontWeight={400}
          color={'blackAlpha.700'}
        >
          {RoleToTitle[userData.role]}
        </Text>
      </Flex>
    </Flex>
    {/* Role wise svg */}


    {/* if not logged user and not loading show menu icon */}
    {(!isLoggedUser && !isLoading) &&
      <EditPopover
        handleArchive={handleArchive}
        userData={userData}
      />
    }
    {/* if its loading show spinner */}
    {
      isLoading && <Spinner />
    }
    {/* if the current user is logged user show only edit */}
    {
      (isLoggedUser && !isLoading)  &&
      <Button
        variant={'ghost'}
        textDecoration={'underline'}
        _hover={{ backgroundColor: 'transparent' }}
        _active={{ backgroundColor: 'transparent' }}
        color={'#2938F7'}
        fontSize={'14px'}
        onClick={() => navigate('/edit-profile', { state: userData })}
      >
        Edit
      </Button>
    }


  </Flex>
}
const DetailContainer = ({ icon, title }) => {
  return <Flex
    gap={4}
  >
    {icon}
    <Text
      fontSize={'16px'}
      fontWeight={500}
      color={'blackAlpha.800'}
    >
      {title}
    </Text>
  </Flex>
}
export default function ProfileCard({ userData, isLoading, isLoggedUser = false, handleArchive }) {
  return (
    <Flex
      borderRadius={'12px'}
      bg={'white'}
      border={'1px solid rgba(0, 0, 0, 0.03)'}
      p={2}
      flexDirection={'column'}
      gap={4}
      py={4}
    >
      <ProfileHeader
        userData={userData}
        isLoggedUser={isLoggedUser}
        handleArchive={handleArchive}
        isLoading={isLoading}
      />
      <Divider />
      <DetailContainer
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5.99951C9.794 5.99951 8 7.79351 8 9.99951C8 12.2055 9.794 13.9995 12 13.9995C14.206 13.9995 16 12.2055 16 9.99951C16 7.79351 14.206 5.99951 12 5.99951ZM12 11.9995C10.897 11.9995 10 11.1025 10 9.99951C10 8.89651 10.897 7.99951 12 7.99951C13.103 7.99951 14 8.89651 14 9.99951C14 11.1025 13.103 11.9995 12 11.9995ZM11.996 1.99951C7.437 1.99951 4 5.43851 4 9.99951C4 16.3255 8.812 20.2595 10.881 21.6565C11.219 21.8855 11.608 22.0005 11.996 22.0005C12.383 22.0005 12.77 21.8864 13.108 21.6584C15.18 20.2594 19.999 16.3235 19.999 9.99951C20 5.43851 16.559 1.99951 11.996 1.99951ZM12.001 19.9995C10.197 18.7805 6 15.3665 6 9.99951C6 6.52251 8.521 3.99951 11.996 3.99951C15.419 3.99951 18 6.57851 18 9.99951C18 15.3635 13.797 18.7805 12.001 19.9995Z" fill="#914FEB" fillOpacity="0.5" />
        </svg>}
        title={`${userData.city ? userData.city : ''}, ${userData.state ? userData.state : ''}`}
      />
      <DetailContainer
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 4H7C4.243 4 2 6.243 2 9V15C2 17.757 4.243 20 7 20H17C19.757 20 22 17.757 22 15V9C22 6.243 19.757 4 17 4ZM7 6H17C18.178 6 19.189 6.68798 19.68 7.67798L13.664 11.688C12.653 12.362 11.347 12.362 10.336 11.688L4.32001 7.67798C4.81101 6.68798 5.822 6 7 6ZM17 18H7C5.346 18 4 16.654 4 15V9.86804L9.22601 13.3521C10.069 13.9141 11.034 14.1951 12 14.1951C12.965 14.1951 13.931 13.9141 14.773 13.3521L20 9.86804V15C20 16.654 18.654 18 17 18Z" fill="#914FEB" fillOpacity="0.5" />
        </svg>}
        title={userData.email ? userData.email : ''}
      />
      <DetailContainer
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H10C7.243 2 5 4.243 5 7V17C5 19.757 7.243 22 10 22H14C16.757 22 19 19.757 19 17V7C19 4.243 16.757 2 14 2ZM17 17C17 18.654 15.654 20 14 20H10C8.346 20 7 18.654 7 17V7C7 5.346 8.346 4 10 4H14C15.654 4 17 5.346 17 7V17ZM13.5 18C13.5 18.553 13.052 19 12.5 19H11.5C10.948 19 10.5 18.553 10.5 18C10.5 17.447 10.948 17 11.5 17H12.5C13.052 17 13.5 17.447 13.5 18Z" fill="#914FEB" fillOpacity="0.5" />
        </svg>}
        title={userData.phone ? userData.phone : ''}
      />
    </Flex>
  )
}
