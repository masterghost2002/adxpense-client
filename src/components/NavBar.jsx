import { Flex, Image, IconButton, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import AdarthLogo from '../static/images/AdarthLogo.svg';
import Header from '../theme/uielements/Header';
import PathnameToHeading from '../constant/PathnameToHeading'
const HomeNavbar = () => {
    return (
        <Flex
            h={'60px'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={4}
        >
            <Image src={AdarthLogo} alt='Adarth Logo' w={'86px'} h={'24px'} />
        </Flex>
    )
}
const NavBarWithBackButton = ({ pathName }) => {
    const paths = pathName.split("/");
    const len = paths.length;
    const Heading = PathnameToHeading[paths[len-1]] || PathnameToHeading[paths[len-2]];
    const navigate = useNavigate();
    return (
        <Flex
            h={'60px'}
            alignItems={'center'}
            gap={'24px'}
            p={4}
            shadow={'0px 4px 16px 0px rgba(0, 0, 0, 0.05);'}
        >
            <IconButton
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.9181 11.2723C19.8445 11.2607 19.7699 11.2554 19.6953 11.2563H6.9967L7.2736 11.1312C7.54425 11.0067 7.79048 10.8373 8.00125 10.6306L11.5623 7.17036C12.0313 6.73533 12.1101 6.0355 11.749 5.51221C11.3288 4.95457 10.5229 4.8335 9.94903 5.24182C9.90266 5.27482 9.85859 5.3108 9.81718 5.34952L3.37772 11.6067C2.87448 12.0952 2.87404 12.8875 3.37672 13.3765C3.37704 13.3768 3.3774 13.3772 3.37772 13.3775L9.81718 19.6347C10.3208 20.1227 11.1363 20.1216 11.6385 19.6322C11.6781 19.5937 11.715 19.5527 11.749 19.5096C12.1101 18.9863 12.0313 18.2864 11.5623 17.8514L8.00769 14.3849C7.81874 14.2011 7.60148 14.047 7.36375 13.9281L6.97738 13.7592H19.6245C20.2824 13.7829 20.8596 13.3364 20.9832 12.708C21.0971 12.0258 20.6202 11.383 19.9181 11.2723Z" fill="black" fillOpacity="0.8" />
                </svg>}
                variant={'ghost'}
                onClick={() => navigate(-1)}
                _hover={{background:'none'}}
                _active={{background:'none'}}
                title="back-btn"

            />
            <Text
                fontSize={'18px'}
                fontWeight={700}
            >
                {Heading}
            </Text>
        </Flex>
    )
}
export default function NavBar() {
    const location = useLocation();
    const pathName = location.pathname;
    return (
        <Header
            position={'sticky'}
            top={0}
            zIndex={2}
            w={'100%'}
            bg={'white'}
        >
            {
                (pathName === '/') ? <HomeNavbar /> : <NavBarWithBackButton pathName={pathName} />
            }


        </Header>
    )
}
