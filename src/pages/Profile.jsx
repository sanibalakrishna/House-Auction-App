import { Link } from 'react-router-dom'
import {getAuth, updateProfile} from 'firebase/auth'
import {useState ,useEffect} from 'react'
import {db} from '../firebase.config'
import {useNavigate} from 'react-router-dom'
import {updateDoc,doc,collection,query,orderBy,where,deleteDoc, getDocs} from 'firebase/firestore'
import {toast} from 'react-toastify'
import ListingItem from '../components/ListingItem'
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth()
  const [loading,setLoading] = useState(true)
  const [listings,setListings] = useState(null)
  const [changeDetails,setChangeDetails] = useState(false)
  const[formData,setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
  })
  const {name,email} = formData
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])
  const onLogout=()=>{
    auth.signOut();
    navigate('/')
  }
  const onSubmit= async() =>{
    try {
      if(auth.currentUser.displayName!==name)
      {
        // update display name
        await updateProfile(auth.currentUser,{displayName:name})

      }
      // update in firestore
      const userRef = doc(db,'users',auth.currentUser.uid)
      await updateDoc(userRef,{
        name
      })
    } catch (error) {
      toast.error('Could not update profile details')
    }

  }
  const onChange =(e) =>{
   setFormData((prevstate)=>({
    ...prevstate,
    [e.target.id]:e.target.value
   }))
  }
  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
  return<div className='profile'>
    <header className='profileHeader'>
      <p className="pageHeader">My Profile</p>
      <button type='button' className="logOut" onClick={onLogout}>Logout</button>
    </header>
    <main>
      <div className='profileDetailsHeader'>
        <p className="profileDetailsText">Personal Details</p>
        <p className='changePersonalDetails' onClick={()=>{
          changeDetails && onSubmit()
          setChangeDetails((prevstate)=>!prevstate)
        }}>
          {
            changeDetails ? 'done' : 'change'
          }
        </p>


      </div>
      <div className="profileCard">
        <form>
          <input type='text' id='name' className={!changeDetails?'profileName':'profileNameAction'} disabled={!changeDetails} onChange={onChange} value={name}/>
          <input type='text' id='email' className={!changeDetails?'profileEmail':'profileEmailAction'} disabled={!changeDetails} onChange={onChange} value={email}/>
        </form>
      </div>
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt='home'/>
        <p>Sell or Rent your Home</p>
        <img src={ArrowRight} alt='arrow'/>
      </Link>
      {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                  
                />
              ))}
            </ul>
          </>
        )}
    </main>
  </div>
}

export default Profile