import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import {app} from "./initializeFirebase";
import { getFirestore } from "firebase/firestore";
import { Album } from './screens/album';
import { useState } from 'react';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


function App() {
  const [screen, setScreen] = useState("home");
  const [albumId, setAlbumId] = useState("");

  function displayAblum(id){
    setAlbumId(id)
    setScreen("album");
  
  }
  return (
    <div className="App">
        <Header/>
   
          <Album  />
        
    
    </div>
  );
}

export default App;
