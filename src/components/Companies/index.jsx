import { auth } from "../../config/firebase";
import {query, where, getDocs } from "firebase/firestore";

import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
// import { Spin } from "antd";
import CircularStatic from "../Loader";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Companies() {

    const fetchUSINGwhere=async()=>{
        const q = query(collection(db, "companies"), where(`userId`, "==", `${auth.currentUser.uid}`));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(" => ", doc.data());
        });
    }

    const [companiesList, setCompaniesList] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
const compSettings=async(id)=>{
 navigate('/company-settings')   
localStorage.setItem('compId', id)
}

    // useEffect(() => {
    //     const loadCompanies=()=>{
    //         try{
                
    //     }
    //     }
    //     catch(e){
    //     }
    //     loadCompanies()
    // }, [])

    useEffect(() => {
        const loadCompanies = () => {      
          try {
            setLoading(true)
            onSnapshot(collection(db, "companies"), (querySnapshot) => {
                const comList = []

                querySnapshot.forEach((doc) => {
                    comList.push({ id: doc.id, ...doc.data() });
                })
                setCompaniesList(comList);
                setLoading(false)
            })
          } catch{       
            setLoading(true)     
            console.log('this is eror')
            setLoading(false)
          }
        }
      loadCompanies()
      }, [])


    return (
        <div>
            <h1>
                This is Companies Page</h1>
            <img onClick={() => navigate('/add-company')} src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_1280.png" alt="" height={50} width={50} />
            <div>
                            <h1>Your Companies</h1>
                            <button onClick={fetchUSINGwhere}>Fetc</button>
            </div>
            <h1>Existing Companies</h1>
            
            <div>
                {loading && <CircularStatic/>}
            </div>

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

            <div>
                <h1>USER ID</h1>
                <p>{auth.currentUser.uid}</p>
            </div>
        </div>
    );
}