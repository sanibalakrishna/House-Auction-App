import React from 'react'
import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {ReactComponent as ArrowRightIcon}  from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password} = formData
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
  const onSubmit=async(e)=>{
    e.preventDefault()
    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth,email,password)
      const user = userCredential.user
      updateProfile(auth.currentUser,{displayName:name})
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp =serverTimestamp()
      await setDoc(doc(db,'users',user.uid),formDataCopy)
      navigate('/')
    }
    catch(error)
    {
      toast.error('Something Went With Registration Please try again')
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
      <p className='pageHeader'>
          Register!
        </p>
        <form onSubmit={onSubmit}>
          <input type='text' className='nameInput' placeholder='Name' id = 'name' value={name} onChange={onChange}/>
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
           <div className="passwordInputDiv">
             <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
              <img src={visibilityIcon} alt="showpassword" className="showPassword" onClick={()=>setShowPassword((prevstate)=>!prevstate)}/>
           </div>
          
           <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'><ArrowRightIcon fill='#ffffff' width='34px' height='34px'/></button>

           </div>
        </form>
        <OAuth/>
        
      </main>
      <div className="registerLinkDiv"> <p>Already have an account?<nbsp></nbsp> </p>
      <Link to='/sign-in' className='registerLink'>Sign In Instead</Link></div>
     
    </div>
  )
}

export default SignIn