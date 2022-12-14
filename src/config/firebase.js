// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, setDoc, doc} from "firebase/firestore"
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5_QSyIVAegGfPSZ64YCX5qKH3lcWkzg",
  authDomain: "qapp-saylani-123.firebaseapp.com",
  projectId: "qapp-saylani-123",
  storageBucket: "qapp-saylani-123.appspot.com",
  messagingSenderId: "682387569350",
  appId: "1:682387569350:web:a3d02cf53a78dcb909f5c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app)
export const auth = getAuth(app)


export function addUserToDb(displayName,email,userId) {  
  return setDoc(doc(db, "users",userId), {displayName, email,userId})
}

export async function uploadImage(image) {
  const storageRef = ref(storage, `images/${image.name}`)
  const snapshot = await uploadBytes(storageRef, image)
  const url = await getDownloadURL(snapshot.ref)
  return url
}






// my privacy policy
// https://www.privacypolicygenerator.info/live.php?token=UbGG6KQODXCq5GcUEuHjIXwq3iNJ87dM