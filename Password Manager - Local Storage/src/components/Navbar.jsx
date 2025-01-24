import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Navbar = () => {

  const handleLogout = (e) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('UserName');
      localStorage.removeItem('passwords');
      localStorage.removeItem('UserEnrollmentNumber');
      handleSuccess('Log Out Successfully');
      setTimeout(() => {
          window.location.reload();
      }, 1500)
    } catch (error) {      
      handleError('Error Logging Out');
    }
  }
  return (
    <>
    <div className="Navbar">
      <div className="logo">Password Manager</div>
      <div className="links">
        <a href="/Home">Home</a>
        <a href="/Docs">How to Use?</a>
        <a href="#" onClick={handleLogout}>Log Out</a>
      </div>
    </div>
    <ToastContainer />      
    </>
  )
}

export default Navbar
