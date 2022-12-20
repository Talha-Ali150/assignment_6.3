import { db } from "../../config/firebase"
import { doc,setDoc,addDoc, collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function CompanySettings(){
    const [tokenLimit, setTokenLimit] = useState('')
    const [estimatedTime, setEstimatedTime] = useState('')
    const [tokenValue, setTokenValue] = useState(0)

    const tokenLimitFunc=(e)=>{
        setTokenLimit(e.target.value)
        setTokenValue(0)
    }

    const estimatedTimeFunc=(e)=>{
        setEstimatedTime((e.target.value)*(60000))
    }

    const updateTokenFunc=()=>{
        setTokenValue(+(tokenValue)+1)
    }


    const addTokenLimitFirebase=async()=>{
        try{
    await addDoc(collection(db, "TokenLimit"),{tokenLimit})
    alert(`success`)
}
    catch(error){
        console.log(error)
    }
}


useEffect(() => {
    onSnapshot(collection(db, "TokenLimit"), (querySnapshot) => {

        querySnapshot.forEach((doc) => {
            // comList.push({ id: doc.id, ...doc.data() })
            console.log(doc.data())
        });
        // setCompaniesList(comList)
    })
}, [])

const sendDetailsFirebase = async()=>{
    try{
    await setDoc(doc(db, "tokenDetails", localStorage.getItem('compId')), {
        currentTokenValue : 12,
        estimatedTime : 1000,
        tokenLimit : tokenLimit 
    })
alert(`success`)}
    catch(error){
        console.log(error)
    }
}




    return (
        <div>
            <h1>This is company settings page</h1>
            <p>{localStorage.getItem('compId')}</p>

            <label htmlFor="total-token">total tokens for today:
                    <input value={tokenLimit} onChange={tokenLimitFunc} type="number" placeholder="Enter limit of tokens" id="total-token" />
            </label>
            <button onClick={addTokenLimitFirebase}>DONE</button>

            {/* <label htmlFor="estimated-time">Enter estimated time for next:
                    <input value={estimatedTime} onChange={estimatedTimeFunc} type="number" placeholder="Enter time in minutes" id="total-token" />
            </label>
            {(tokenValue <= tokenLimit) && <button onClick={updateTokenFunc}>Update Token</button>}

            <button>allow</button>
            <button>disallow</button> */}

            <button onClick={sendDetailsFirebase}>Add Details to Firebase</button>

            </div>
    )
}