import React, { useState  } from 'react' ; 
import { useNavigate } from "react-router-dom"
import axios from "axios" ;

const Login = () => {
    const [username , setUsername] = useState("") ; 
    const [password , setPassword] = useState("") ; 

    const navigate = useNavigate() ;

    const login = (e) => {
      e.preventDefault() ;
        const reqBody = {
            username ,
            password
        } ; 

        axios.post("http://localhost:5000/auth/login" , reqBody ).then((res) => {
            setUsername("");
            setPassword("");
            console.log(res.data) ; 

            const token = res.data.token ; 
            localStorage.setItem("token" , token) ; 
    
            const name = res.data.user.name ;
            console.log(name) ; 
            localStorage.setItem("currentUser" , name) ; 

            const CurrentUsername = res.data.user.username ; 
            console.log(CurrentUsername); 
            localStorage.setItem("CurrentUsername" , CurrentUsername) ; 
            
            navigate("/dashboard") ;
        }).catch((err) => {
            console.log(err.response.data.message) ;
        })
    }
  return (
    <form onSubmit={login}>
        <div>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id='username' onChange={(e) => {
                    setUsername(e.target.value) ;
                }} value={username}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' onChange={(e) => {
                    setPassword(e.target.value) ;
                }} value={password}/>
            </div>
            <div>
                <button type='submit'>Login</button>
                <button onClick={(e) => {
                  navigate("/signup")
                }}>Register</button>
            </div>
        </div>
    </form>
  )
}

export default Login ; 
