import { useState, useEffect } from 'react';
import axios from 'axios';

const endPointActresses = 'https://www.freetestapi.com/api/v1/actresses';
const endPointActors = 'https://www.freetestapi.com/api/v1/actors';

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchedName, setSearchedName] = useState('');

  function searchName() {
    if (actresses === '') {
      alert('Insert a name!')
    }
  }

  function fetchActresses() {
    axios.get(endPointActresses)
      .then(result => {
        setActresses(result.data);
      });
  }

  function fetchActors() {
    axios.get(endPointActors)
      .then(result => {
        setActors(result.data);
      });
  }

  useEffect(() => {
    if (selectedCategory === 'actresses') {
      fetchActresses();
    } else if (selectedCategory === 'actors') {
      fetchActors();
    } else if (selectedCategory === 'all') {
      fetchActresses();
      fetchActors();
    }
  }, [selectedCategory]);

  useEffect(fetchActresses, []);
  useEffect(fetchActors, []);

  return (
    <>
      <div className="container d-flex justify-content-center mt-5 mb-5">
        <input type='text' placeholder='insert a name' onChange={searchName}></input>
        <button
          onClick={() => setSelectedCategory('actresses')}
          type="button"
          className="btn btn-secondary mx-3">
          Actresses
        </button>
        <button
          onClick={() => setSelectedCategory('actors')}
          type="button"
          className="btn btn-secondary mx-3">
          Actors
        </button>
        <button
          onClick={() => setSelectedCategory('all')}
          type="button"
          className="btn btn-secondary mx-3">
          All
        </button>
      </div>

      <div className="container d-flex flex-wrap mt-3 mb-3">
        {selectedCategory === 'actresses' && actresses.map(({ name, birth_year, nationality, biography, image, awards }, index) => (
          <div className="card container mb-5 bg-dark-subtle" key={index}>
            <div className="card-body">
              <h1 className="text-center">CARD ACTRESSES</h1>
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

        {selectedCategory === 'actors' && actors.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
          <div className="card container mb-5 bg-dark-subtle" key={id}>
            <div className="card-body">
              <h1 className="text-center">CARD ACTOR</h1>
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

        {selectedCategory === 'all' && (
          <>
            {actresses.map(({ name, birth_year, nationality, biography, image, awards }, index) => (
              <div className="card container mb-5 bg-dark-subtle" key={`actress-${index}`}>
                <div className="card-body">
                  <h1 className="text-center">CARD ACTRESS</h1>
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
            {actors.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
              <div className="card container mb-5 bg-dark-subtle" key={`actor-${id}`}>
                <div className="card-body">
                  <h1 className="text-center">CARD ACTOR</h1>
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
          </>
        )}
      </div>
    </>
  );
}

export default App;
// *BONUS 1 :rilassato:*
// Stampare sia una lista delle attrici che degli attori, separatamente.


// *BONUS 3* :testa_che_esplode:
// Inserire un filtro di ricerca che permetta di cercare gli attori o le attrici per nome.
// Per fare questo bonus avrai bisogno di consultare la documentazione: