import { useState, useEffect } from 'react';
import axios from 'axios';

const endPointActresses = 'https://www.freetestapi.com/api/v1/actresses';
const endPointActors = 'https://www.freetestapi.com/api/v1/actors';

function ProfileCard({ title, name, birth_year, nationality, biography, image, awards }) {
  return (
    <div className="card container mb-5 glass">
      <div className="card-body">
        <h1 className="text-center">{title}</h1>
        <h2 className="card-title">Name: {name}</h2>
        <hr />
        <h3 className="card-text">Date of Birth: {birth_year}</h3>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item bg-transparent"><h4>Nationality: {nationality}</h4></li>
        <li className="list-group-item bg-transparent"><h5>Biography: {biography}</h5></li>
        <img src={image} className="card-img" alt="profile" />
        <li className="list-group-item bg-transparent"><h6><strong>Awards: {awards}</strong></h6></li>
      </ul>
    </div>
  );
}

function App() {
  const [actresses, setActresses] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchedName, setSearchedName] = useState('');

  // Data fetching
  useEffect(() => {
    axios.get(endPointActresses)
      .then(result => setActresses(result.data))
      .catch(error => console.error('Error fetching actresses:', error));
    axios.get(endPointActors)
      .then(result => setActors(result.data))
      .catch(error => console.error('Error fetching actors:', error));
  }, []);

  // Dynamic background
  useEffect(() => {
    document.body.classList.remove('default-bg', 'actresses-bg', 'actors-bg', 'all-bg');

    if (selectedCategory === 'actresses') {
      document.body.classList.add('actresses-bg');
    } else if (selectedCategory === 'actors') {
      document.body.classList.add('actors-bg');
    } else if (selectedCategory === 'all') {
      document.body.classList.add('all-bg');
    } else {
      document.body.classList.add('default-bg');
    }
  }, [selectedCategory]);

  const filteredActresses = actresses.filter(result =>
    result.name.toLowerCase().includes(searchedName.toLowerCase())
  );
  const filteredActors = actors.filter(result =>
    result.name.toLowerCase().includes(searchedName.toLowerCase())
  );

  return (
    <>
      <div className="container d-flex flex-wrap justify-content-center gap-3 mt-5 mb-5">
        {selectedCategory === 'all' && (
          <input
            type="text"
            placeholder="Search by name..."
            className="form-control w-50 shadow-sm rounded-pill px-4"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
          />
        )}
        <button onClick={() => setSelectedCategory('actresses')} className="btn btn-outline-primary px-4">Actresses</button>
        <button onClick={() => setSelectedCategory('actors')} className="btn btn-outline-success px-4">Actors</button>
        <button onClick={() => setSelectedCategory('all')} className="btn btn-outline-dark px-4">All</button>
      </div>

      <div className="container d-flex flex-wrap justify-content-center gap-4">
        {(selectedCategory === 'actresses' || selectedCategory === 'all') && (
          <>
            {filteredActresses.map(({ name, birth_year, nationality, biography, image, awards }, index) => (
              <ProfileCard
                key={`actress-${index}`}
                title="CARD ACTRESS"
                {...{ name, birth_year, nationality, biography, image, awards }}
              />
            ))}
          </>
        )}

        {(selectedCategory === 'actors' || selectedCategory === 'all') && (
          <>
            {filteredActors.map(({ id, name, birth_year, nationality, biography, image, awards }) => (
              <ProfileCard
                key={`actor-${id}`}
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