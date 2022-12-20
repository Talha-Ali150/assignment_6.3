import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Companies() {

    const [companiesList, setCompaniesList] = useState([])
    const navigate = useNavigate()
    
const compSettings=async(id)=>{
 navigate('/company-settings')   
localStorage.setItem('compId', id)
}

    useEffect(() => {
        onSnapshot(collection(db, "companies"), (querySnapshot) => {
            const comList = []

            querySnapshot.forEach((doc) => {
                comList.push({ id: doc.id, ...doc.data() })
            });
            setCompaniesList(comList)
        })
    }, [])


    return (
        <div>
            <h1>
                This is Companies Page</h1>
            <img onClick={() => navigate('/add-company')} src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_1280.png" alt="" height={50} width={50} />
            <h1>Your Companies</h1>
            <h1>Existing Companies</h1>
            <div>
                {companiesList.map(item => {
                    return <> <div className="card" style={{width: '18rem'}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.companyName}</h5>
                                <p className="card-text">Since:{item.establishDate}</p>
                                <h1>{item.id}</h1>
                                <a onClick={()=> compSettings(item.id)} className="btn btn-primary">Company Options</a>
                            </div>
                    </div>
                    </>
                })}

            </div>
        </div>
    );
}