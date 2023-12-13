import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import SendOtp from './pages/SendOtp'
import VerifyOtp from './pages/VerifyOtp'
import MobileWrapper from './components/MobileWrapper';
import Welcome from './pages/Welcome';
// import Splash from './components/Splash'
function App() {
  return (
    <MobileWrapper>
      <Routes>
        <Route path='/welcome' element={<PublicLayout />}>
          <Route index element={<Welcome/>}/>
          <Route path='sign-in' element={<SendOtp />} />
          <Route path='verify-otp' element={<VerifyOtp />} />
        </Route>
        <Route path='/' element={<ProtectedLayout />}>
        </Route>
      </Routes>
      
    </MobileWrapper>
  );
}

export default App;