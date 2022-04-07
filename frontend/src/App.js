import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link, useRoutes } from "react-router-dom"
import axios from 'axios'
// import Login from './routes/Login'

export const App = () => {
    const [isLogged, setIsLogged] = useState(false)
    const checkLogged = async () => {
        try {
            const log = await axios.get('/account/isLogged')
            setIsLogged(log)
        } catch (e) {
            console.log(e)
            alert("error")
        }
    }
    checkLogged()

    let element = useRoutes([{path:"/", element:<Home isLogged={isLogged.data} />},
    {path:"/Login", element:<Login isLogged={isLogged.data}/>},
    {path:"/Signup", element:<Signup isLogged={isLogged.data}/>}
])
    return element
}


function Login ({isLogged}) {
    if (isLogged) {
        window.location.replace("http://localhost:3000/")
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = async () => {
        try {
            const error = await axios.post('/account/login', { username, password })
            if (error.data === 'error occured') {
                alert('login error or incorrect username')
            } else if (error.data ==='incorrect username or password') {
                alert('incorrect username or password')
            }
        } catch (e) {
            console.log(e)
            alert("login error")
        }
        
    }
    return (<>
        Username: <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={() => loginUser()}> Login </button>
        <button onClick={() => window.location.replace("http://localhost:3000/signup/")}>Sign up!</button>
        </>)
}

function Signup ({isLogged}) {
    if (isLogged) {
        window.location.replace("http://localhost:3000/")
    }
    const [username, setUsername] = useState('')
    const [password1, setPassword] = useState('')
    const signupUser = async () => {
        try {
            const error = await axios.post('/account/signup', { username, "password":password1 })
            if (error.data === 'username taken') {
                alert('username taken')
            } else {
                alert('signup successful')

            }
        } catch (e) {
            console.log(e)
            alert("signup error")
        } 
    }
    return (<>
        Username: <input onChange={e => setUsername(e.target.value)} />
        <br />
        Password: <input onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={() => signupUser()}> SignUp </button>
        <button onClick={() => window.location.replace("http://localhost:3000/login/")}>Log in here!</button>
        </>)
}

function Home ({isLogged}) {
    const [questions, setQuestions] = useState([])
    const logoutUser = async () => {
        try {
            await axios.post('/account/logout')
            window.location.replace("http://localhost:3000/")
        } catch (e) {
            console.log(e)
            alert("logout error")
        }
        
    }
    useEffect(() => {
        const getQuestions = async() => {
            const { data } = await axios.get('/api/questions')
            setQuestions(data)
        }
        const interval=setInterval(()=>{
    getQuestions()
}, 2000)
        return()=>clearInterval(interval)
    }, [])
    return (
        <>
        <p>Hello</p>
        {isLogged && <button onClick={() => logoutUser()}> Logout </button>}
        {isLogged && <Question/>}
        {!isLogged && <button onClick={() => window.location.replace("http://localhost:3000/login")}> Login to answer question </button>}
        {isLogged && questions.map(question => <><p>Author:{question.author}</p><p> Question:{question.questionText}</p> <p>Answer:{question.answer}</p>
        <Answer _id={question._id}/>
        </>)}
        {!isLogged && questions.map(question => <><p>Author:{question.author}</p><p> Question:{question.questionText}</p> <p>Answer:{question.answer}</p>
        </>)}
        </>
    )
}

function Answer (_id) {
    const [answer, setAnswer] = useState('')
    const answerQuestion = async () => {
        try {
            await axios.post('/api/questions/answer', {_id, answer })
        } catch (e) {
            console.log(e)
            alert("answer error")
        }
        
    }
    return (<>
    Answer: <input onChange={e => setAnswer(e.target.value)} />
    <br />
    <button onClick={() => answerQuestion()}> Submit </button>
    </>)
    
}

function Question() {
    const [questionText, setQuestionText] = useState('')
    const addQuestion = async() => {
        try {
            await axios.post('/api/questions/add', {questionText})
        } catch (e) {
            console.log(e)
            alert('addQuestion error')
        }
    }
    return (
        <>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Add Question
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      Question: <input onChange={e => setQuestionText(e.target.value)} />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={() => addQuestion()}data-dismiss="modal">ADD</button>
      </div>
    </div>
  </div>
</div>
        </>
    )
}
