import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { Form } from './Components/Form'
import Dashboard from './pages/Dashboard'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  return (
    <>
    <GoogleOAuthProvider clientId='468083560111-3cdjf6aso5n8qprqdlubpmeqf2le5quc.apps.googleusercontent.com'>
      <Routes>
        <Route path='/' element={<Form/>} />
        <Route path='/dash' element={<Dashboard/>} />
      </Routes>

    </GoogleOAuthProvider>
    </>
  )
}

export default App
