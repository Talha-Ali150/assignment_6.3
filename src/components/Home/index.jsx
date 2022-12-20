import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
export default function Home(){
    const signOutFacebook = async()=>{
        await signOut(auth).then(() => {
            localStorage.setItem('userLoggedIn', JSON.stringify(false))
            alert(`Sign-out successful.`)
          }).catch((error) => {
            console.log(error.message)
          });
    }
    const navigate = useNavigate()
    return(
        <div>
            <h1>this is homepage</h1>
            <button onClick={signOutFacebook}>SignOut</button>
            <button onClick={() => navigate('/companies')}>Company</button>
            <button onClick={() => navigate('/normal-user')}>Normal User</button>
        </div>
    )
}