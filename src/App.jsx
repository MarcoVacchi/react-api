import { useState, useEffect } from 'react';
import axios from 'axios';


const endPoint = ' https://www.freetestapi.com/api/v1/actresses';

function App() {

  const [actress, setActress] = useState([]);


  function fetchActor() {

    axios.get(endPoint)
      .then(result => {
        setActress(result.data)
      });
  };

  useEffect(fetchActor, []);
  // console.log(actress)

  return (
    <>
      <div className='container'>
        {actress.map(element => (
          <li>{element.name}</li>
        ))}
      </div>
    </>
  )
};

export default App

// MILESTONE 2
// Prepariamo una card per ciascun attore/attrice, mostrandone le seguenti informazioni:
// - nome
// - anno nascita
// - nazionalità
// - biografia
// - immagine
// - riconoscimenti
// - immagine

// MILESTONE 3
// Mostriamo in pagina una card per ciascun attore, con grafica a piacimento!