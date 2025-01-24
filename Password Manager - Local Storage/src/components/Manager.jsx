const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const UserName = localStorage.getItem("UserName")
    const EnrollNo = localStorage.getItem("UserEnrollmentNumber")

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }



    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >5){
            try {
                const encryptedPassword = CryptoJS.AES.encrypt(form.password, SECRET_KEY).toString();
                const passwordData = {
                    site: form.site,
                    username: form.username,
                    password: encryptedPassword,
                    id: uuidv4()
                };
                setPasswordArray([...passwordArray, passwordData]);
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, passwordData]));
                setform({ site: "", username: "", password: "" });
                toast('Password saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Encryption error:", error);
                toast.error('Error saving password!');
            }
        } else {
            toast.error('Please fill all fields correctly!');
        }
    }

    const decryptedPassword = (encryptedPassword) => {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
            
    }
    const editPassword = (id) => {
         
        console.log("Editing password with id ", id)
        setform(passwordArray.filter(i=>i.id===id)[0]) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 

    }

    const decryptPassword = (id) => {
        let c = prompt("Enter your enrollment number")
        if(c===EnrollNo){
            alert(`the required password is: ${decryptedPassword(passwordArray.filter(item=>item.id===id)[0].password)}`)
        }
        else{
            alert("You are not authorized to view this password")
        }
    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            
            <ToastContainer />
            
            <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
                <h1 className='text-4xl text font-bold text-center font-mono'>

                    Welcome {UserName}!!

                </h1>
                <p className='text-blue-900 text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Website URL' className='rounded-full border border-violet-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Email Id' className='rounded-full border border-violet-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full border border-violet-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center text-white items-center gap-2 bg-purple-700 hover:bg-violet-500 rounded-full font-mono px-8 py-2 w-fit border border-green-900'>
                        Save</button>
                </div>

                <div className="passwords bg-white/70 bg-transparent backdrop-blur-md shadow-lg rounded-lg p-6 w-full">
                    <h2 className='font-extrabold text-2xl py-4 font-mono'>Your Credentials</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10 font-mono">
                        <thead className='bg-purple-500 backdrop-blur-md text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Encrypted Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-violet-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <img style={{ "width": "20px", "height": "20px", "paddingTop": "6px", "paddingLeft": "5px" }}
                                                    src="/images/copy.png" alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                            <img style={{ "width": "20px", "height": "20px", "paddingTop": "6px", "paddingLeft": "5px" }}
                                                    src="/images/copy.png" alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <img style={{ "width": "20px", "height": "20px", "paddingTop": "6px", "marginLeft":"10px"}} src="/images/copy.png" alt="copy" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center flex flex-items-center justify-around'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <img src="/images/edit.png"
                                                style={{"width":"25px", "height":"25px"}} alt="edit" />
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{decryptPassword(item.id)}}>
                                            <img src="/images/decrypt.png"
                                                style={{"width":"25px", "height":"25px"}} alt="decrypt" />
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <img src="/images/delete.png" style={{"width":"25px", "height":"25px"}} alt="delete" />
                                            
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
