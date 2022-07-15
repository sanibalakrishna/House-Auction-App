import React from 'react'
import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {Link,useNavigate} from 'react-router-dom'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {ReactComponent as ArrowRightIcon}  from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const {email,password} = formData
  const navigate = useNavigate();
  const onChange=(e)=>{
    setFormData((prevstate)=>({
      ...prevstate,
      [e.target.id]:e.target.value
    }))

  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const onSubmit = async(e)=>{
    e.preventDefault()
   try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    if(userCredential.user)
    {
      navigate('/')
    }

   } catch (error) {
    toast.error('Bad User Credentials')
   }
    

  }
  return (
    <div className='pageContainer'>
      <header>
          <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/8032/8032993.png" height={50} alt='icon'/>
          <p className='logoHeader'>House Auction Place</p>
          </div>
          
        
      </header>
      <main>
         <p className='pageHeader'>Welcome Back!</p>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
           <div className="passwordInputDiv">
             <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
              <img src={visibilityIcon} alt="showpassword" className="showPassword" onClick={()=>setShowPassword((prevstate)=>!prevstate)}/>
           </div>
           <Link to='/forgot-password' className='forgotPasswordLink'>forgot password</Link>
           <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'><ArrowRightIcon fill='#ffffff' width='34px' height='34px'/></button>

           </div>
        </form>
       
        <OAuth/>
       
        
      </main>
      <div className="registerLinkDiv"> <p>Already have an account?<nbsp></nbsp> </p>
      <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link></div>
     
    
    </div>
  )
}

export default SignIn