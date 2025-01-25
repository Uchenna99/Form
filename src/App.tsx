import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Form } from './Components/Form'
import Dashboard from './pages/LandingPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SignUp from './Components/signUp'
import Login from './Components/Login'
import useGlobalState from './State'
import VerifyOtp from './Components/VerifyOtp'
import { ToastContainer } from 'react-custom-alert'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { DecodedUser } from './Components/FormObject'


function App() {
  const {loggedIn, setloggedIn, setDecodedToken} = useGlobalState();

  useEffect(()=>{
    const loginState = localStorage.getItem('isLoggedIn');
    const access = localStorage.getItem('token');
    if(access && loginState === 'true'){
      const user = jwtDecode(access);
      setDecodedToken(user as DecodedUser);
      setloggedIn(true);
    }

  },[]);

  return (
    <>
    <GoogleOAuthProvider clientId='468083560111-3cdjf6aso5n8qprqdlubpmeqf2le5quc.apps.googleusercontent.com'>
      <Routes>
        <Route path='/' element={loggedIn? <Form/> : <Navigate to={'/login'}/>} />
        <Route path='/signup' element={loggedIn? <Navigate to={'/'}/> : <SignUp/>}/>
        <Route path='/login' element={loggedIn? <Navigate to={'/'}/> : <Login/>} />
        <Route path='/dash' element={loggedIn? <Dashboard/> : <Navigate to={'/login'}/>} />
        <Route path='/verifyotp' element={<VerifyOtp/>} />
      </Routes>
      {/* loggedIn? <Navigate to={'/'}/> : <VerifyOtp/> */}
    </GoogleOAuthProvider>
    <ToastContainer floatingTime={5000} />
    </>
  )
}

export default App
