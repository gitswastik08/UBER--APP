import React, { useState } from "react";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [captainData, setcaptainData] = useState({})
  

  
  return (
    <div className="p-7 pt-0 flex flex-col justify-between  h-screen w-full">
      <div>
      <img className='w-16 pt-3 ' src="https://pngimg.com/d/uber_PNG24.png" alt="" />

        <form className="flex flex-col mt-9" 
        onSubmit={(e)=>{
          e.preventDefault()
          setemail("")
          setpassword("")
          setcaptainData({
            email: email,
            password: password,
            isLogin: true,
            isCaptain: true,
            token: null,
            user: null,
          })
          
          
        }} >
          <h2 className="text-lg font-medium mb-2">What's your email</h2>
          <input
            className="bg-[#ece6e6] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            required
            value={email}
            placeholder="captain@email.com"
            onChange={(e)=>{
              setemail(e.target.value)
            }}
          />
          <h2 className="text-lg font-medium mb-2">Enter password</h2>
          <input
            className="bg-[#ece6e6] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required  
           value={password}
            placeholder="password"
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
          />
            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>
        </form>
        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a captain</Link></p>
      </div>

      <div>
      <Link
          to='/user-login'
          className='bg-[#1ba132] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Log in as User</Link>
      </div>
    </div>
  );
}

export default Captainlogin