import { useState, useEffect, act } from 'react';
import axios from 'axios';


const endPoint = ' https://www.freetestapi.com/api/v1/actresses';

function App() {

  const [actresses, setActresses] = useState([]);


  function fetchActor() {

    axios.get(endPoint)
      .then(result => {
        setActresses(result.data)
      });
  };

  useEffect(fetchActor, []);
  console.log(actresses)


  return (
    <>
      <div className='container d-flex flex-wrap'>
        {actresses.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
          <div className="card container mb-5 bg-dark-subtle" key={id}>
            <div className="card-body">
              <h1 className='text-center'>CARD ACTRESSES</h1>
              <h2 className="card-title">Name: {name}</h2>
              <hr />
              <h3 className="card-text">Date of Birth: {birth_year}</h3>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-dark-subtle"><h4>Nationality: {nationality}</h4></li>
              <li className="list-group-item bg-dark-subtle"><h5>Biography: {biography}</h5></li>
              <img src={image} className="card-img" alt="image-current" />
              <li className="list-group-item bg-dark-subtle">
                <h6><strong>Awards: {awards}</strong></h6>
              </li>
            </ul>
          </div>
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

// MILESTONE 3
// Mostriamo in pagina una card per ciascun attore, con grafica a piacimento!