import { useState, useEffect, act } from 'react';
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
  console.log(actress)
  // {actress.map(element => (
  //   <li>{element.name}</li>
  // ))}

  return (
    <>
      <div className='container d-flex'>
        {actress.map(({ id, name, birth_year, nationality, biography, image, awards }) => (

          <div className="card" key={id}>
            <div className="card-body">
              <h5 className="card-title">Name: {name}</h5>
              <p className="card-text">Date of Birth: {birth_year}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Nationality: {nationality}</li>
              <li className="list-group-item">Biography: {biography}</li>
              <img src={image} className="card-img" alt="..." />
              <li className="list-group-item">
                <h4><strong>Awards: {awards}</strong></h4>
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