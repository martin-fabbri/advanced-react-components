import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      commits: [],
    }
  }

  loadGithubCommits = () => {
    const { page } = this.state;
    fetch(`https://api.github.com/search/commits?q=repo:facebook/react+css&page=${page}`, {
      method: "GET",
      headers: new Headers({"Accept": "application/vnd.github.cloak-preview"}),
    })
      .then(data => data.json())
      .then(response => this.setState({commits: response.items}))
      .catch(error => console.error(error))
  }

  nextPage = () => this.setState(
      {
        ...this.state,
        page: this.state.page + 1,
      }
    );

  firstPage = () => this.setState(
    {
      ...this.state,
      page: 1,
    }
  );

  componentDidMount() {
    this.loadGithubCommits();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.loadGithubCommits();
    }
  }

  render() {
    const { commits } = this.state;
    return (
      <div>
        {commits.length !== 0
        && <button onClick={this.nextPage}> next page </button>}

        {commits.length === 0
        && <button onClick={this.firstPage}> first Page </button>}

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
}

export default App;

