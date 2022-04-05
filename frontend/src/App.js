import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom"
import axios from 'axios'

export const App = () => {
    const [isLogged, setIsLogged] = useState(false)
    return(
        <>
        <div>
          <h2>Home</h2>
        </div>

        <Routes>
            <Route path="/" element={<Home isLogged={isLogged} />}>
          {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="*" element={<NoMatch />} /> */}
            </Route>
        </Routes>
      </>
    )
}
function Home(isLogged) {
    if (isLogged) {
        return (<div>
            <h2>Homesdfsdg</h2>
          </div>)
    } else {
        return (
            <div>
                <h2>Home</h2>
            </div>
        )
    }  
}
// const Login = async (isLogged, setIsLogged) => {
//     if (isLogged) {
//         window.location.replace("http://localhost:3000/")
//     }
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const loginUser = async () => {
//         try {
//             await axios.post('/account/login', { username, password })
//             setIsLogged(true)
//             window.location.replace("http://localhost:3000/")
//         } catch (e) {
//             console.log(e)
//             alert("login error")
//         }
        
//     }
//     return (<>
//         Username: <input onChange={e => setUsername(e.target.value)} />
//         <br />
//         Password: <input onChange={e => setPassword(e.target.value)} />
//         <br />
//         <button onClick={() => loginUser()}> Submit </button>
//         <button onClick={() => "http://localhost:3000/signup/"}>Sign up!</button>
//         </>)
// }
// const Signup = async (isLogged, setIsLogged) => {
//     if (isLogged) {
//         window.location.replace("http://localhost:3000/")
//     }
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const signupUser = async () => {
//         try {
//             await axios.post('/account/signup', { username, password })
//             setIsLogged(true)
//             window.location.replace("http://localhost:3000/")
//         } catch (e) {
//             console.log(e)
//             alert("signup error")
//         }
        
//     }
//     return (<>
//         Username: <input onChange={e => setUsername(e.target.value)} />
//         <br />
//         Password: <input onChange={e => setPassword(e.target.value)} />
//         <br />
//         <button onClick={() => signupUser()}> Submit </button>
//         <button onClick={() => "http://localhost:3000/login/"}>Log in here!</button>
//         </>)
// }

