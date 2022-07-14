import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/Navbar'
import Category from './pages/Category'
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing'

function App() {
  return (
    < >
    <Router>
     <Routes>
       <Route exact path='/' element={<Explore/>}/>
       <Route exact path='/offers' element={<Offers/>}/>
       <Route  path='/category/:categoryName' element={<Category/>}/>
       <Route exact path='/profile' element={<PrivateRoute/>}> 
        <Route path='/profile' element={<Profile/>}/>
       </Route>
       <Route exact path='/sign-in' element={<SignIn/>}/>
       <Route exact path='/sign-up' element={<SignUp/>}/>
       <Route exact path='/forgot-password' element={<ForgotPassword/>}/>
       <Route exact path='/create-listing' element={<CreateListing/>}/>
       <Route exact path='/category/:categoryName/:listingId' element={<Listing/>}/>
       <Route exact path='/contact/:landlordId' element={<Contact/>}/>
       <Route path='/edit-listing/:listingId' element={<EditListing />} />
     </Routes>
     <Navbar/>
    </Router>
    <ToastContainer/>
     
    </>
  );
}

export default App;
