import { useState, useEffect } from 'react';
import axios from 'axios';


const endPoint = ' https://www.freetestapi.com/api/v1/actresses';

function App() {

  const [actor, setActor] = useState([]);


  function fetchTodos() {

    axios.get(endPoint)
      .then(result => {
        console.log(result.data)
        setActor(result.data)
      });
  };
  useEffect(fetchTodos, []);

  return (
    <>

    </>
  )
};

export default App


// MILESTONE 1
// Al caricamento dell'applicazione, recuperiamo la lista degli attori (o attrici) dalle API e stampiamoli in console.

// MILESTONE 2
// Prepariamo una card per ciascun attore/attrice, mostrandone le seguenti informazioni:
// - nome
// - anno nascita
// - nazionalità
// - biografia
// - immagine
// - riconoscimenti
// - immagine