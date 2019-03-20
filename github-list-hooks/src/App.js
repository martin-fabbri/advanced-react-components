import React, { useState, useEffect } from 'react';

function usePager() {
  const [page, setPage] = useState(1);
  const nextPage = () => setPage(page + 1);
  const firstPage = () => setPage(1);
  return {page, nextPage, firstPage}
}

function useCommits(page) {
  const [commits, setCommits] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`, {
      method: "GET",
      headers: new Headers({"Accept": "application/vnd.github.cloak-preview"}),
    })
      .then(data => data.json())
      .then(response => setCommits(response.items))
      .catch(error => console.error(error))
  }, [page]);
  return commits;
}

function App(props) {
  const { page, firstPage, nextPage} = usePager();
  const commits = useCommits(page);

  return (
    <div>
      {commits.length !== 0
      && <button onClick={nextPage}> next page </button>}

      {commits.length === 0
      && <button onClick={firstPage}> first Page </button>}

      {commits.map(c => (
        <div key={c.sha}>
          {
            c.commit && (
              <div className="commit-container">
                <p> {c.commit.committer.name}</p>
                <p> {c.commit.message}</p>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default App;

