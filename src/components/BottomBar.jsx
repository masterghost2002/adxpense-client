import React from 'react'
import { Flex, Text, Image, Button } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeSvg from '../static/navbarsvgs/home.svg';
import TeamsSvg from '../static/navbarsvgs/team.svg';
import ProfileSvg from '../static/navbarsvgs/profile.svg';
import ExpensesSvg from '../static/navbarsvgs/expenses.svg';
import HomeActiveSvg from '../static/navbarsvgs/homeActive.svg';
import TeamsActiveSvg from '../static/navbarsvgs/teamActive.svg';
import ProfileActiveSvg from '../static/navbarsvgs/profileActive.svg';
import ExpensesActiveSvg from '../static/navbarsvgs/expensesActive.svg';
const NavigateOptions = [
    {
        to: '/',
        icon: HomeSvg,
        activeIcon:HomeActiveSvg,
        title: 'Home'
    },
    {
        to: '/expenses',
        icon: ExpensesSvg,
        activeIcon:ExpensesActiveSvg,
        title: 'Expenses'
    },
    {
        to: '/teams',
        icon: TeamsSvg,
        activeIcon:TeamsActiveSvg,
        title: 'Teams'
    },
    {
        to: '/my-profile',
        icon: ProfileSvg,
        activeIcon:ProfileActiveSvg,
        title: 'Profile'
    },

]
const NavigateButton = ({ onClick, icon,activeIcon, title, isActive }) => {
    return (
        <Button
            flexDirection={'column'}
            alignItems={'center'}
            variant={'ghost'}
            _hover={{background:'transparent'}}
            _active={{background:'transparent'}}
            onClick={onClick}
            color={'rgba(27, 0, 70, 0.56)'}
        >
            <Image
                src={isActive?activeIcon:icon}
                alt={title}
                h='24px'
                w='24px'
            />
            <Text
                fontSize={'14px'}
                color={isActive?'#FF900E':'rgba(27, 0, 70, 0.56)'}
            >
                {title}
            </Text>
        </Button>
    )
}
export default function BottomBar() {
    const location = useLocation();
    const pathName = location.pathname;
    const navigate = useNavigate();

    return (
        <Flex
            position={'sticky'}
            bottom={'40px'}
            w={'100%'}
            h={'75px'}
            bg={'transparent'}
        >
            <Flex
                mx={'16px'}
                h={'75px'}
                w={'100%'}
                boxShadow={'0px 4px 16px 2px rgba(111, 33, 238, 0.10)'}
                borderRadius={'16px'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                bg={'white'}
            >
                {
                    NavigateOptions.map((item, index) => {
                        return (
                            <NavigateButton
                                key={`${index}-${item.to}`}
                                to={item.to}
                                icon={item.icon}
                                activeIcon={item.activeIcon}
                                title={item.title}
                                isActive = {pathName === item.to}
                                onClick={()=>navigate(item.to)}
                            />
                        )
                    })
                }
            </Flex>

        </Flex>
    )
}
