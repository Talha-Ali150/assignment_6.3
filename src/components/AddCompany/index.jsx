import { auth, db, uploadImage } from "../../config/firebase"
import { addDoc, collection } from "firebase/firestore"
export default function AddCompany() {
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
    return (
        <div>
            <h1>Enter Company Details</h1>
            <div className="container-fluid d-flex flex-column my-6">

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
                <button className="btn btn-success w-25" onClick={submitForm}>Add Company</button>
            </div>
        </div>
    )
}