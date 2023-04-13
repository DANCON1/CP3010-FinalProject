import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Navigation from './Navigation';
import Hangman from './Hangman';
import Stats from './Stats';
import React, { useState, useEffect } from "react";


function App() {

  let [word, setWord] = useState(null);

  useEffect ( () => {
    fetch("./wordList.json")
    .then(response => response.json())
    .then(setWord)
    .catch(e=>console.log(e.message))
  }, [])

  return (
    <>
      <Navigation />
         <Routes>
           <Route path="/" element={<Hangman word={(word)} setWord={(setWord)}/>} />
           <Route path="/stats" element={<Stats />} />
         </Routes>
    </>
    );
}

export default App;
