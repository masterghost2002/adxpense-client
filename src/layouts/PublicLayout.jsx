import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useUserStore from '../store/useUserStore'
export default function Public() {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (user)
      navigate('/')
    const _isFirstTime = localStorage.getItem('first-time');
    let isFirstTime = true;
    if (_isFirstTime)
      isFirstTime = JSON.parse(_isFirstTime);
    if (isFirstTime === false)
      navigate('sign-in');
    else navigate('/welcome');
  }, [navigate])
  return (
    <Outlet />
  )
}
