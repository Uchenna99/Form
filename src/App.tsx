import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Form } from './Components/Form'
import Dashboard from './pages/Dashboard'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SignUp from './Components/signUp'
import Login from './Components/Login'
import useGlobalState from './State'
import VerifyOtp from './Components/VerifyOtp'


function App() {
  const {loggedIn} = useGlobalState();

  return (
    <>
    <GoogleOAuthProvider clientId='468083560111-3cdjf6aso5n8qprqdlubpmeqf2le5quc.apps.googleusercontent.com'>
      <Routes>
        <Route path='/' element={<Form/>} />
        <Route path='/signup' element={loggedIn? <Navigate to={'/'}/> : <SignUp/>}/>
        <Route path='/login' element={loggedIn? <Navigate to={'/'}/> : <Login/>} />
        <Route path='/dash' element={loggedIn? <Dashboard/> : <Navigate to={'/login'}/>} />
        <Route path='/otp/verify' element={<VerifyOtp/>} />
      </Routes>
      {/* loggedIn? <Navigate to={'/'}/> : <VerifyOtp/> */}
    </GoogleOAuthProvider>
    </>
  )
}

export default App
