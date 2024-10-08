import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [submitted,setSubmitted] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    setRepos(data.items);
    setSubmitted(true);
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="header">
          <h1>GitHub RepoFinder</h1>
          <h4>By: Masfort Boima</h4>
          <p>Discover popular repositories on GitHub</p>
        </header>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search GitHub Repositories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="repo-list">
          {repos.length > 0 ? (
            repos.map(repo => (
              <div className="repo-card" key={repo.id}>
                <h3>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h3>
                <p className="repo-description">
                  {repo.description ? repo.description : 'No description available'}
                </p>
                <p className="repo-stats">
                  <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count} Stars
                  <span style={{ marginLeft: '20px' }}>
                    <FontAwesomeIcon icon={faCodeBranch} /> {repo.forks_count} Forks
                  </span>
                </p>
                <button className="repo-btn">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    View Repo
                  </a>
                </button>
              </div>
            ))
          ) : (
            submitted && <p>No repositories found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


