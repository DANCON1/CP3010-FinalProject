import './App.css';
import { Route, Routes } from "react-router-dom";
import Navigation from './Navigation';
import Hangman from './Hangman';
import Stats from './Stats';
import React, { useState, useEffect } from "react";


function App() {

  let [word, setWords] = useState(null);

  useEffect ( () => {
    fetch("/api/hangman")
    .then(response => response.json())
    .then(setWords)
    .catch(e=>console.log(e.message))
  }, [])

  return (
    <>
      <Navigation />
         <Routes>
           <Route path="/" element={<Hangman word={(word)} setWords={(setWords)}/>} />
           <Route path="/stats" element={<Stats />} />
         </Routes>
    </>
    );
}

export default App;
