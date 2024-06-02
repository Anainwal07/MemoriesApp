import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name , setName] = useState('') ; 
    const [username , setUsername] = useState('') ;
    const [password , setPassword] = useState('') ; 
    const [picturePath , setPicturePath] = useState('') ;
    const navigate = useNavigate() ; 

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name', name)  ;
          formData.append('username', username);
          formData.append('password', password);
          formData.append('picturePath', picturePath); // Append the file object
      
          const response = await axios.post(`http://localhost:5000/auth/signup`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data' ,// Ensure proper content type for file upload
            }
          });
          if (response) {
            const token = res.data.token ; 
            localStorage.setItem("token" , token) ; 
    
            const name = res.data.user.name ;
            console.log(name) ; 
            localStorage.setItem("currentUser" , name) ; 

            const CurrentUsername = res.data.user.username ; 
            console.log(CurrentUsername); 
            localStorage.setItem("CurrentUsername" , CurrentUsername) ; 
            
            navigate("/dashboard") ;
          } else {
            console.log("Error Registering User");
          }
        } catch (error) {
          console.error('Error Registering User', error);
        }        
    }
  return (
    <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' onChange={(e) => {
                    setName(e.target.value) ;
                }} value={name}/>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id='username' name='username'  onChange={(e) => {
                    setUsername(e.target.value) ;
                }} value={username}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password'  onChange={(e) => {
                    setPassword(e.target.value) ;
                }} value={password}/>
            </div>
            <div>
                <input type="file" accept='file'  onChange={(e) => {
                    setPicturePath(e.target.files[0]) ;
                }} />
            </div>
            <div>
                <button type='submit'>Register</button>
                <button onClick={() => {
                    navigate('/');
                }}>Login</button>
            </div>
        </div>
    </form>
  )
}

export default Signup ; 