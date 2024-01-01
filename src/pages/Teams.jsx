import React, { useEffect, useState } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import createAxiosInstance from '../utils/ApiHandler';
import UserContainer from '../components/OrganisationDetails/UserContainer';
import useUserStore from '../store/useUserStore'
import useOrganisationStore from '../store/useOrganisationStore';
import UserContainerSkeletons from '../components/OrganisationDetails/UserContainerSkeletons';
import NoUsersFound from '../components/OrganisationDetails/NoUsersFound';
import HeaderLabel from '../components/OrganisationDetails/HeaderLabel';
const Label = ({ title }) => {
    return (
        <Text fontSize={'16px'} fontWeight={600} color={'blackAlpha.600'} mt={'12px'}>
            {title}
        </Text>
    );
};
export default function Teams() {

    // loading state
    const [isLoading, setIsLoading] = useState(true);

    const user = useUserStore(state => state.user);
    const setOrganisationUsers = useOrganisationStore(state => state.setUsers);

    // get all members
    const employees = useOrganisationStore(state => state.employess);
    const accountantManagers = useOrganisationStore(state => state.accountantManagers);
    const managers = useOrganisationStore(state => state.managers);

    const organisationId = user.organisationId;
    const organisationName = user.organisationName;


    const fetchUsers = async () => {
        const token = user.accessToken;
        const organisationId = user.organisationId;
        const api = createAxiosInstance(token);
        setIsLoading(true);
        try {
            const res = await api(`/manager/organisation/${organisationId}/getusers`);
            const users = res.data.data;
            setOrganisationUsers(users);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <Flex
                p={4}
                flexDirection={'column'}
                gap={'20px'}
                paddingBottom={'100px'}
                flexGrow={1}
                flexShrink={0}
            >
                <HeaderLabel
                    organisationName={organisationName}
                />
                <Label title={'Members'} />
                {/* if fetching the users and member are 0 show skeleton */}
                {isLoading && managers.length === 0 && <UserContainerSkeletons />}
                {/* is members */}
                {
                    managers.map((member, index) => {
                        return (
                            <UserContainer
                                key={`${member.id}-${index}`}
                                user={member}
                            />
                        )
                    })
                }
                {
                    accountantManagers.map((member, index) => {
                        return (
                            <UserContainer
                                key={`${member.id}-${index}`}
                                user={member}
                            />
                        )
                    })
                }
                <Label title={'Employees'} />

                {/* if fetching the users and employee are 0 show skeleton */}
                {isLoading && employees.length === 0 && <UserContainerSkeletons />}

                {/* if there is no loading and employees are 0 */}
                {!isLoading && employees.length === 0 &&
                    <NoUsersFound userType={'employee'} />
                }

                {/* is employess */}
                {
                    employees.map((employee, index) => {
                        return (
                            <UserContainer
                                key={`${employee.id}-${index}`}
                                user={employee}
                            />
                        )
                    })
                }
            </Flex>
            <Button
                position={'sticky'}
                bottom={{ base: '140px', md: "140px" }}
                width={'96px'}
                h={'48px'}
                bg={'brand_primary.500'}
                color={'white'}
                right={'10px'}
                left={'100%'}
                borderRadius={'32px'}
                mr={4}
                as={Link}
                to={`/organisation/${organisationId}/add-user?organisationName=${organisationName}`}
                title='add-user-btn'
            >
                Add User
            </Button>
        </>

    )
}
