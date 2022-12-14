import './App.css';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import { uploadImage, addUserToDb, auth, db } from './config/firebase';
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [addCompany, setAddCompany] = useState(false)
  const [companiesList, setCompaniesList] = useState([])
  const [show, setShow] = useState(false)

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoggedIn(true)
        setShow(true)
        const info = result._tokenResponse
        const { displayName, email } = info
        const userId = auth.currentUser.uid

        addUserToDb(displayName, email, userId)
      })
      .catch((error) => {
        console.log(error.message)
        console.log(loggedIn)
      })

  }

  const submitForm = async () => {
    const companyName = document.querySelectorAll('input')[0].value
    const establishDate = document.querySelectorAll('input')[1].value
    const timingFrom = document.querySelectorAll('input')[3].value
    const timingTo = document.querySelectorAll('input')[4].value



    const images = document.querySelectorAll('input')[2].files
    const imagesList = (Object.values(images).slice(0, 3))

    if (imagesList.length !== 3) {
      alert('please select 3 images')
    }
    if ((companyName !== '') && (establishDate !== '') && (timingFrom !== '') && (timingTo !== '') && (imagesList.length === 3)) {
      try {
        const [img1, img2, img3] = imagesList
        const imgURL1 = await uploadImage(img1)
        const imgURL2 = await uploadImage(img2)
        const imgURL3 = await uploadImage(img3)
        const userID = auth.currentUser.uid
        await addDoc(collection(db, "companies"), {
          companyName, establishDate, timingFrom, timingTo, userID, imgURL1, imgURL2, imgURL3
        })
        setAddCompany(false)
        alert(`submitted successfully`)
      } catch (e) {
        alert(e.message)
        alert(`error`)
      }
    }
    else {
      alert(`error fill every field`)
    }
  }

  const showCompanies = () => {
    setShow(true)
    onSnapshot(collection(db, "companies"), (querySnapshot) => {
      const comList = []

      querySnapshot.forEach((doc) => {
        comList.push({ id: doc.id, ...doc.data() })
      });
      setCompaniesList(comList)
    })
  }

  return (
    <>
      <div className="App">
        {loggedIn || <button onClick={signInWithFacebook}>Sign In with FB</button>}
        {loggedIn && <div><h1>Welcome to Homepage</h1></div>}
        {loggedIn &&
          <div><button onClick={() => { setAddCompany(true) }}> Add a Company</button>
            <button>Normal User</button></div>}
      </div>

      {addCompany && <div className="container-fluid d-flex flex-column my-6">

        <label htmlFor="company-name">name:
          <input type="text" placeholder="Enter name of Company" id="company-name" />
        </label>
        <label htmlFor="establishment-year">since:
          <input type="month" id="establishment-year"></input>
        </label>
        <label htmlFor="certificate-images"  >images(choose any 3 ):
          <input type="file" id="certificate-images" multiple="multiple" />
        </label>
        <h3>Timings</h3>
        <label htmlFor="timings-from">From:<input type="time" id="timings-from" /></label>
        <label htmlFor="timings-to">To<input type="time" id="timings-to" /></label>
        <button className="btn btn-success w-25" onClick={submitForm}>Submit</button>
      </div>}
      <div>
        {show &&<button onClick={showCompanies}>View Companies</button>}
      </div>

        {show && companiesList.map(item => {
          return <div className="container-fluid text-center">
          <h1>{item.companyName}</h1>
          <h2>{item.establishDate}</h2>
          <h3>{item.timingFrom}</h3>
          <h3>{item.timingTo}</h3>
          <div className="container-fluid text-center">
            <img src={item.imgURL1} alt="" srcSet="" />
            <img src={item.imgURL2} alt="" srcSet="" />
            <img src={item.imgURL3} alt="" srcSet="" />
          </div>
        </div>
           
    
        })} 



    </>
  );
}

export default App;
