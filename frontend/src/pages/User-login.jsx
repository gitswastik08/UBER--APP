import React, { useState } from "react";
import { Link } from "react-router-dom";

const Userlogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [userData, setuserData] = useState({})
  

  
  return (
    <div className="p-7 pt-10 flex flex-col justify-between h-screen w-full">
      <div>
      <img className='w-20 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form className="flex flex-col mt-8" 
        onSubmit={(e)=>{
          e.preventDefault()
          setemail("")
          setpassword("")
          setuserData({
            email: email,
            password: password,
            isLogin: true,
            isCaptain: false,
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
            placeholder="user@email.com"
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
        <p className='text-center'>New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      <div>
      <Link
          to='/captain-login'
          className='bg-[#d7d72b] flex items-center justify-center text-black font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Log in as Captain</Link>
      </div>
    </div>
  );
};

export default Userlogin;
