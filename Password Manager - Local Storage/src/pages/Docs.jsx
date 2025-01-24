import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Container from '../components/Container.jsx'

const Docs = () => {
  return (
    <div>
      <Navbar />
      <Container />
      <div className='absolute top-80 flex flex-col items-center justify-center h-screen font-mono'>
        <h1 className='text-2xl font-extrabold text-gray-900 mb-6'>Hello World!!</h1>
        <p className='text-gray-700'>This is a password manager app for those who regularly keep on forgetting their Credntials. It is a secure and easy to use app that allows you to store your login credentials in a secure manner.</p>
        <br />
        <p className='text-gray-700'>Here the passwords are encrypted with AES-256 encryption and stored in the local storage of the browser so that no one can access your passwords without your permission. Moreover, even you also need to verify your identity before you can access your passwords.</p>
        <br />
        <p className='text-gray-700'>The app is built using React, Node.js, Express, and MongoDB. The app is hosted on the Vercel platform.</p>
        <br />
        <h2>How to use this website?</h2>
        <p className='text-gray-700'>Well, just like any other password manager website, you need to sign up first. After signing up, you can add your credentials and then you can access them whenever you want. Some of the features of this website are explained below:</p>
        <br />
        <img src="/images/Dashboard.png" alt="docs" className='w-4/5 h-auto' />
        <br />
        <p className='text-gray-700'>This is the dashboard of the website. You can see all the credentials that you have added here. You can also add new credentials by filling the form and saving your credentials by clicking the Save" button.</p>
        <br />
        <p className='text-gray-700'>You can modify or delete your saved credentials by clicking on the respective icons as well as you can also view the encrypted password by clicking on the unlock icon.</p>
      </div>
    </div>
  )
}

export default Docs
