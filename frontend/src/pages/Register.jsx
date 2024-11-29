import axios from 'axios'
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import axiosInstance from '../utils/AxiosInstance'




const Register = () => {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')

  

  const { getLoggedIn } = useContext(AuthContext)

  const register = async (e) => {
    e.preventDefault()

    try {
      const registerData = {
        username,
        email,
        password,
        passwordVerify,
      }

      const response = await axios.post('http://localhost:7684/api/register', registerData)
      await getLoggedIn()

      Cookies.set('userId', response.data.user._id, { expires: 1 });

      Swal.fire({
        title: 'Login Successful!',
        text: 'You have logged in successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      })

    } catch (error) {
      console.error(error)
      if (error.response) {
        const { status, data } = error.response;
  
        // Handle specific error statuses
        if (status === 400 || status === 401) {
          // Extract the errorMessage from the backend response
          const errorMessage = data.errorMessage || "An error occurred";
  
          // Show SweetAlert with the error message
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          // Generic error for other statuses
          Swal.fire({
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        // Network or other errors
        Swal.fire({
          title: 'Network Error',
          text: 'Unable to reach the server. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <>
      <div className='flex justify-center mt-40'>
        <div className='p-4  w-4/6'>
          <div className='flex justify-center'>
              <h1 className='font-sans font-bold text-6xl py-6'>HR</h1>
          </div>
          <div className='flex justify-center'>
              <p className='font-sans font-bold py-6 text-xl'>Login</p>
          </div>
          <div className='flex justify-center'>
            <form className="px-20 w-3/4" onSubmit={register}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="username" className="input input-bordered" onChange={(e) => setUsername(e.target.value)} value={username}/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} value={email}/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} value={password}/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPasswordVerify(e.target.value)} value={passwordVerify}/>
              </div>
              <div className='text-sm mt-2'>
                <p>Already have an account? <a href='/login' className='underline hover:text-blue-500'>Login</a></p>
              </div>
              <div className="form-control mt-4">
                <button className="p-3 rounded-lg hover:bg-orange-300 bg-orange-500 text-white">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register