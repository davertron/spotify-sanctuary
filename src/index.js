import React from "react";
import ReactDOM from "react-dom";
import { map, bimap, Left, Right } from "sanctuary";

import Results from "./Results";
import ErrorBox from "./ErrorBox";

import "./styles.css";

import { NOT_FETCHED } from "./constants";

/*
getSearchResults :: () -> Either (Error) (Results)
*/
async function getSearchResults() {
  try {
    let response = await fetch("https://yielding-city.glitch.me/search");
    let json = await response.json();
    if (json.results) {
      return Right(json.results);
    } else if (json.error) {
      return Left({ error: json.error });
    } else {
      return Left({ error: "Server-side error: Unknown Error" });
    }
  } catch (e) {
    return Left({ error: `Client-side error: ${e}` });
  }
}

class App extends React.Component {
  state = {
    query: null,
    results: NOT_FETCHED
  };

  handleUpdate = e => {
    this.setState({ query: e.target.value });
  };

  handleError = ({ error }) => {
    console.error(error);
    this.setState({ error });
  };

  handleSuccessfulSearchResponse = results => {
    this.setState({ results });
  };

  handleSearch = async () => {
    bimap(this.handleError)(this.handleSuccessfulSearchResponse)(
      await getSearchResults()
    );
  };

  render() {
    const { error, query, results } = this.state;

    return (
      <div className="App">
        <h1>Search Spotify Artists</h1>
        {error && <ErrorBox>{error}</ErrorBox>}
        <input type="text" onChange={this.handleUpdate} />
        <button disabled={!query} onClick={this.handleSearch}>
          Search
        </button>
        <Results results={results} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
