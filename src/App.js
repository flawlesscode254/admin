import './App.css';
import firebase from 'firebase'
import React, { useState } from 'react'


var firebaseApp =  firebase.initializeApp({
  apiKey: "AIzaSyDBGdkd6yz_shashEWTmiITrKmjlOpPCJ8",
  authDomain: "car-parking-c66bc.firebaseapp.com",
  projectId: "car-parking-c66bc",
  storageBucket: "car-parking-c66bc.appspot.com",
  messagingSenderId: "465885946430",
  appId: "1:465885946430:web:fc7ff7c5bf3f21df99276f"
  })

  const db = firebaseApp.firestore()

function App() {
  const [view, setView] = useState('')
  const [name, setName] = useState([])
  const [phone, setPhone] = useState([])
  const [plate, setPlate] = useState([])
  const [email, setEmail] = useState([])
  const [time, setTime] = useState([])
  const [end, setEnd] = useState([])
  const [total, setTotal] = useState()

  const handleChange = () => {
    db.collection("orders").where("code", "==", Number(view)).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          setName(doc.data().name)
          setPhone(doc.data().phone)
          setPlate(doc.data().plate)
          setEmail(doc.data().email)
          const timeStampDate = doc.data().time;
          const dateInMillis  = (timeStampDate * 1000)
          var date = new Date(dateInMillis).toLocaleTimeString()
          setTime("Time of start: " + date)

          let d = new Date().getHours() * 60;
          let e = new Date().getMinutes();
          let f = d + e

          let g = timeStampDate * 1000
          let h = new Date(g).getMinutes()
          let i = new Date(g).getHours() * 60
          let j = h + i
          let k = (f - j)
          setEnd("Total minutes taken: " + k)
          let l = k * 0.8
          setTotal("Total amount to be paid: Ksh" + l)
      })
  })
  setView('')
  }

  return (
    <div className="App">
      <input type="text" placeholder="Enter the unique code" value={view}
      onChange={(e) => setView(e.target.value)} />
      <br/>
      <br/>
      <button onClick={handleChange}>Submit</button>
      <br/>
      <br/>
      <p>{name}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{plate}</p>
      <p>{time}</p>
      <p>{end}</p>
      <p>{total}</p>
    </div>
  );
}

export default App;
