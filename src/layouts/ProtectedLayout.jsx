import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import useUserStore from '../store/useUserStore';
import NavBar from '../components/NavBar';
import Main from '../theme/uielements/Main';
import Splash from '../components/Splash';
import createAxiosInstance from '../utils/ApiHandler';
import { SlideFade } from '@chakra-ui/transition';
import { useLocation } from 'react-router-dom';
export default function ProtectedLayout() {

  // loading to show splash when user verification is going on during first load
  const [isLoading, setIsLoading] = useState(true);

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/welcome');
    }
    (
      async () => {
        setIsLoading(true);
        const api = createAxiosInstance(user?.accessToken);
        try {
          const res = await api.post('/user/validate-token');
          const user = res.data.data;
          setUser(user);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          // localStorage.clear();
          setUser(null);
          navigate('/welcome');
        }
      }
    )()

  }, []);


  if (isLoading) return <Splash />

  return (

    <Flex
      flexDirection={'column'}
      height={'100%'}
      w={'100%'}
      position={'relative'}
      overflow={'auto'}
    >
      <NavBar />
      <Main
        flexGrow={1}
        flexShrink={0}
        id='main-container'
        display={'flex'}
        flexDirection={'column'}
      >
        <SlideFade
          in={true}
          offsetY="20px"
          key={location.key}
          id='slide-fade-container'
        >

          <Outlet />
        </SlideFade>

      </Main>
    </Flex>
  )
}
