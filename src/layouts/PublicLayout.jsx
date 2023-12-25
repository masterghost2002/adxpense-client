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
  }, [navigate, user])
  return (
    <Outlet />
  )
}
