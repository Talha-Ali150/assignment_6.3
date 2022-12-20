import { signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import { auth, addUserToDb } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate()
    const signInWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const info = result._tokenResponse
                const { displayName, email } = info
                const userId = auth.currentUser.uid

                addUserToDb(displayName, email, userId)
            })
            .catch((error) => {
                console.log(error.message)
            })

    }
    return (
        <div>
            <h1>This is login page</h1>
            <button onClick={signInWithFacebook}>Sign In with FB</button>
        </div>
    );
}