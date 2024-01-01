import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import SendOtp from './pages/SendOtp';
import VerifyOtp from './pages/VerifyOtp'
import MobileWrapper from './components/MobileWrapper';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import EditUser from './pages/EditUser';
import Teams from './pages/Teams';
import Expenses from './pages/Expenses'
import UserProfile from './pages/UserProfile';
import AddUser from './pages/AddUser';
import MyExpenseDetails from './pages/MyExpenseDetails'
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';
import RejectExpense from './pages/RejectExpense';
import EditExpense from './pages/EditExpense';
import ApproveExpense from './pages/ApproveExpense';
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
          <Route index element={<Home/>}/>
          <Route path='organisation/:id/user-profile/:userId/edit-profile' element={<EditUser />} />
          <Route path='organisation/:id/add-user' element={<AddUser />} />
          <Route path='organisation/:id/user-profile/:userId' element={<UserProfile/>}/>
          <Route path='my-profile' element={<MyProfile/>}/>
          <Route path='edit-profile' element={<EditUser/>}/>
          <Route path='add-expense' element={<AddExpense/>}/>
          <Route path='myexpensesdetail' element={<MyExpenseDetails />} />
          <Route path='expense-detail/:id' element={<ExpenseDetail />} />
          <Route path='expense/:id/reject' element={<RejectExpense />} />
          <Route path='expense/:id/approve' element={<ApproveExpense />} />
          <Route path='expense/:id/edit' element={<EditExpense />} />
          <Route path='teams' element={<Teams/>}/>
          <Route path='expenses' element={<Expenses/>}/>
        </Route>
      </Routes>
      
    </MobileWrapper>
  );
}

export default App;