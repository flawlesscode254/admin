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

  const handleChange = () => {
    db.collection("orders").where("code", "==", Number(view)).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          setName(doc.data().name)
          setPhone(doc.data().phone)
          setPlate(doc.data().plate)
          setEmail(doc.data().email)
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
    </div>
  );
}

export default App;
