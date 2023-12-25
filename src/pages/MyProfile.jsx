import ProfileCard from '../components/UserProfile/ProfileCard';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
export default function MyProfile() {
    const user = useUserStore(state => state.user);
    const handleLogOut = ()=>{
        localStorage.clear();
        window.location.reload();
    }
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
                userData={user}
                isLoggedUser={true}
            />
            {user.role !== 'employee' && <Button
                variant={'ghost'}
                justifyContent={'space-between'}
                bg={'white'}
                border={'1px solid rgba(0, 0, 0, 0.05)'}
                borderRadius={'8px'}
                color={'rgba(0, 0, 0, 0.80)'}
                _hover={{ background: 'white' }}
                _active={{ background: 'white' }}
                h={'48px'}
                as={Link}
                to={'/myexpensesdetail'}
            >
                View My Expenses
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M6.83019 5.29019L2.59019 1.05019C2.49722 0.956464 2.38662 0.88207 2.26476 0.831301C2.1429 0.780533 2.0122 0.754395 1.88019 0.754395C1.74818 0.754395 1.61747 0.780533 1.49561 0.831301C1.37375 0.88207 1.26315 0.956464 1.17019 1.05019C0.983936 1.23756 0.879395 1.49101 0.879395 1.75519C0.879395 2.01938 0.983936 2.27283 1.17019 2.46019L4.71019 6.00019L1.17019 9.54019C0.983936 9.72756 0.879395 9.98101 0.879395 10.2452C0.879395 10.5094 0.983936 10.7628 1.17019 10.9502C1.26363 11.0429 1.37444 11.1162 1.49628 11.166C1.61812 11.2157 1.74858 11.241 1.88019 11.2402C2.01179 11.241 2.14226 11.2157 2.26409 11.166C2.38593 11.1162 2.49675 11.0429 2.59019 10.9502L6.83019 6.71019C6.92392 6.61723 6.99831 6.50663 7.04908 6.38477C7.09985 6.26291 7.12599 6.1322 7.12599 6.00019C7.12599 5.86818 7.09985 5.73747 7.04908 5.61562C6.99831 5.49376 6.92392 5.38316 6.83019 5.29019Z" fill="#4BC0C0" />
                </svg>
            </Button>}
            <Button
                variant={'ghost'}
                justifyContent={'space-between'}
                bg={'white'}
                border={'1px solid rgba(0, 0, 0, 0.05)'}
                borderRadius={'8px'}
                color={'rgba(0, 0, 0, 0.80)'}
                _hover={{ background: 'white' }}
                _active={{ background: 'white' }}
                h={'48px'}
                onClick={handleLogOut}

            >
                Logout
            </Button>
        </Flex>
    )
}