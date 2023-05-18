import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';


const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
    
    const body = {
        username: username,
        password: password
    }
    
    const authCtx = useContext(AuthContext);
    
    const submitHandler = e => {
        e.preventDefault()
        
        const url = 'http://localhost:6789'
        console.log(body)
        axios.post(register ? `${url}/register` : `${url}/login`, body)
            .then((res) => {
                console.log(res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch(err => {
                alert('Please enter a valid username and password')
                setPassword('')
                setUsername('')
            })
 
       console.log('submitHandler called')
   }

   
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text'
                   placeholder='Username'
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type='text'
                   placeholder='Password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={(prevState) => setRegister(!prevState)} >Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth