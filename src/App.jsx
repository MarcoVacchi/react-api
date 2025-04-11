import { useState, useEffect } from 'react';
import axios from 'axios';

const endPointActresses = 'https://www.freetestapi.com/api/v1/actresses';
const endPointActors = 'https://www.freetestapi.com/api/v1/actors';

function ProfileCard({ title, name, birth_year, nationality, biography, image, awards }) {
  return (
    <div className="card container mb-5 bg-dark-subtle">
      <div className="card-body">
        <h1 className="text-center">{title}</h1>
        <h2 className="card-title">Name: {name}</h2>
        <hr />
        <h3 className="card-text">Date of Birth: {birth_year}</h3>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-dark-subtle"><h4>Nationality: {nationality}</h4></li>
        <li className="list-group-item bg-dark-subtle"><h5>Biography: {biography}</h5></li>
        <img src={image} className="card-img" alt="profile" />
        <li className="list-group-item bg-dark-subtle"><h6><strong>Awards: {awards}</strong></h6></li>
      </ul>
    </div>
  );
}

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchedName, setSearchedName] = useState('');

  useEffect(() => {
    axios.get(endPointActresses)
      .then(result => setActresses(result.data))
      .catch(error => console.error('Error fetching actresses:', error));
    axios.get(endPointActors)
      .then(result => setActors(result.data))
      .catch(error => console.error('Error fetching actors:', error));
  }, []);

  const filteredActresses = actresses.filter(a =>
    a.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  const filteredActors = actors.filter(a =>
    a.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  return (
    <>
      <div className="container d-flex justify-content-center mt-5 mb-5">
        <input
          type='text'
          placeholder='insert a name'
          value={searchedName}
          onChange={e => setSearchedName(e.target.value)}
        />
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
        {selectedCategory === 'actresses' &&
          filteredActresses.map(({ name, birth_year, nationality, biography, image, awards }, index) => (
            <ProfileCard
              key={`actress-${index}`}
              title="CARD ACTRESS"
              name={name}
              birth_year={birth_year}
              nationality={nationality}
              biography={biography}
              image={image}
              awards={awards}
            />
          ))
        }

        {selectedCategory === 'actors' &&
          filteredActors.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
            <ProfileCard
              key={`actor-${id}`}
              title="CARD ACTOR"
              name={name}
              birth_year={birth_year}
              nationality={nationality}
              biography={biography}
              image={image}
              awards={awards}
            />
          ))
        }

        {selectedCategory === 'all' && (
          <>
            {filteredActresses.map(({ name, birth_year, nationality, biography, image, awards }, index) => (
              <ProfileCard
                key={`actress-${index}`}
                title="CARD ACTRESS"
                name={name}
                birth_year={birth_year}
                nationality={nationality}
                biography={biography}
                image={image}
                awards={awards}
              />
            ))}
            {filteredActors.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
              <ProfileCard
                key={`actor-${id}`}
                title="CARD ACTOR"
                name={name}
                birth_year={birth_year}
                nationality={nationality}
                biography={biography}
                image={image}
                awards={awards}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
