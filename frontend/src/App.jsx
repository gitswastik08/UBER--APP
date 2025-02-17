import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Captainsignup from './pages/Captain-signup'
import Captainlogin from './pages/Captain-login'
import Usersignup from './pages/User-signup'
import Userlogin from './pages/User-login'
import { UserDataContext } from './context/Usercontext'

const App = () => {
const res = useContext(UserDataContext)
console.log(res);

  return (
    <div>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/captain-signup" element={<Captainsignup />} />
  <Route path="/captain-login" element={<Captainlogin />} />
  <Route path="/user-signup" element={<Usersignup />} />
  <Route path="/user-login" element={<Userlogin />} />
 
</Routes>
    </div>
  )
}

export default App