import { useState, useEffect } from 'react'
import { Logo, FormRow ,Alert} from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/RegisterPage'
import {useNavigate} from 'react-router-dom'

// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
// if possible prefer local state
// global state


const Register = ()=>{
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)

  const {user,isLoading,showAlert,displayAlert,registerUser,loginUser,setupUser} = useAppContext()
  

  const toggleMember = ()=>{
    setValues({...values,isMember : !values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name] : e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {name,email,password,isMember} = values 
    if(!email || !password || (!isMember && !name)){
      displayAlert()
      return
    }

    const currentUser = {name,email,password}
    if(isMember){
      setupUser({currentUser , endpoint : 'login' ,alertText : 'Login Successful! Redirecting...'})
    }
    else{
      setupUser({currentUser , endpoint: 'register' , alertText : 'User Created!Redirecting...'})
    }   
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return ( 
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && <FormRow
          name='name' 
          type='text' 
          value={values.name} 
          handleChange={handleChange} 
        />
        }

        {/* email field */}
        <FormRow
          name='email'
          type='email'
          value={values.email}
          handleChange={handleChange} 
        />

        {/* password field */}
        <FormRow
          name='password'
          type='password'
          value={values.password}
          handleChange={handleChange} 
        />

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register