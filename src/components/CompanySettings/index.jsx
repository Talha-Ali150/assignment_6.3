import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc,getDoc,  } from "firebase/firestore";

export default function CompanySettings() {
    const [tokenLimit, setTokenLimit] = useState(0)
    const [showTokenLimit, setShowTokenLimit] = useState(true)
    const [tokenCounter, setTokenCounter] = useState(+(localStorage.getItem('currentToken')))
    const [estimatedTime, setEstimatedTime] = useState(localStorage.getItem('estimatedTime'))

    const tokenLimitFunc = (event) => {
        setTokenLimit(event.target.value)
    }

    const clickHandle = () => {
        alert('updated')
        setShowTokenLimit(false)
    }


    const buttonFunc= async ()=>{
        setTokenCounter(1)
        updateToken()
        await updateDoc(doc(db, "companies", localStorage.getItem('compId')), {
            token: tokenLimit,
            createdAt : Date.now()
          });
          localStorage.setItem('tokenLimit', tokenLimit)
    }
    const updateToken= async ()=>{
        await updateDoc(doc(db, "companies", localStorage.getItem('compId')), {
            currentToken: tokenCounter
          });
    }

    const updateTokenBtn=async()=>{
      const docRef = doc(db, "companies", localStorage.getItem('compId'))
      const docSnap = await getDoc(docRef);
      let myValue;
      
      if (docSnap.exists()) {
        myValue = (docSnap.data()).currentToken
        console.log('abcd')

      } else {
        console.log("No such document!");
      }
      setTokenCounter(myValue+1)
      localStorage.setItem('currentToken', myValue+1)
      await updateDoc(doc(db, "companies", localStorage.getItem('compId')), {
        currentToken: tokenCounter
      });
    }

    const currentTokenValue= async()=>{
        const docRef = doc(db, "companies", localStorage.getItem('compId'))
        const docSnap = await getDoc(docRef);
        let myValue;
        
        if (docSnap.exists()) {
          myValue = (docSnap.data()).currentToken

        } else {
          console.log("No such document!");
        }
        setTokenCounter(myValue)
        localStorage.setItem('currentToken', myValue)
    }

    
    useEffect(() => {
        const interval = setInterval(async () => {
                currentTokenValue()
                updateToken()
                const docRef = doc(db, "companies", localStorage.getItem('compId'))
                const docSnap = await getDoc(docRef);
                let myValue;
                
                if (docSnap.exists()) {
                  myValue = (docSnap.data()).token

                } else {
                  console.log("No such document!");
                }
              


            if (tokenCounter<myValue){                
            setTokenCounter(tokenCounter+1)
            }
        }, (localStorage.getItem('estimatedTime') * 1000));
        return () => clearInterval(interval);
      }, [tokenCounter]);

      const resetCounter= async()=>{
        setTokenCounter(1)
        localStorage.setItem('currentToken', tokenCounter)
        updateToken()
      }

      const giveAlert=async()=>{
        const docRef = doc(db, "companies", localStorage.getItem('compId'))
        const docSnap = await getDoc(docRef);
        let createTime;
        let estimatedTime;
        
        if (docSnap.exists()) {
          createTime = (docSnap.data()).createdAt
          estimatedTime = (docSnap.data()).estimatedTime

          if( Math.ceil((Date.now()/1000/60) - (createTime/1000/60)) > estimatedTime )  {
            alert('abc')
          }
          else{
            alert('xyz')
          }

        } else {
          console.log("No such document!");
        }
      }

      const sendEstimatedTime=async()=>{        
        localStorage.setItem('estimatedTime', estimatedTime)
        await updateDoc(doc(db, "companies", localStorage.getItem('compId')), {
          estimatedTime: estimatedTime
        });
      }

      const estimatedTimeFunc=(e)=>{
        setEstimatedTime(e.target.value)
      }


      

    return (
        <div>
            {/* {showTokenLimit && <div>
                <input value={tokenLimit} type="number" placeholder="Enter Token Limit" onChange={tokenLimitFunc} />
                <button onClick={clickHandle}>SET</button>
            </div>}

            {showTokenLimit || <button onClick={() => { setShowTokenLimit(true) }}>SET token Limit</button>}

<div>
    <p>{tokenCounter}</p>
    {(tokenCounter < tokenLimit) && <button onClick={()=>{setTokenCounter(tokenCounter+1)}}>Update Token</button>}
</div> */}


<input type="number"  value={tokenLimit}  onChange={tokenLimitFunc} />
<button onClick={buttonFunc}> sned firebase</button>

<h1>Current TOKEN</h1>
<p>current Toekn is: {tokenCounter}</p>
<p>{typeof(tokenCounter)}</p>


<button>GET DOC</button>

<button onClick={resetCounter}>RSET counter</button>


<button onClick={giveAlert}>Alert</button>

<div>
  <input type="number" onChange={estimatedTimeFunc} />
  <button onClick={sendEstimatedTime}>SEND TIME</button>
</div>

<div>
{ (+(localStorage.getItem('currentToken')) < +(localStorage.getItem('tokenLimit'))) &&  <button onClick={updateTokenBtn}>update yoken btn</button>}
</div>
        </div>
    );

}