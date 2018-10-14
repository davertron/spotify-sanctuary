import React from "react";
import S from "sanctuary";

import { FETCHING, NOT_FETCHED } from "./constants";

export default function Results({ results }) {
  let body = null;
  if (results === NOT_FETCHED) {
    body = <span>Type something above and click "Search"</span>;
  } else if (results === FETCHING) {
    body = <span>Loading...</span>;
  } else if (typeof results === "object" && results.artists.items) {
    body = (
      <div id="results">
        {results.artists.items.map(({ id, name, images }) => (
          <div className="result-card" key={id}>
            <img width="100px" src={S.map(i => i.url)(S.head(images)).value} />
            <div className="info">{name}</div>
          </div>
        ))}
      </div>
    );
  } else if (typeof results === "object" && results.error) {
    body = <span>Uh oh...something went wrong: {results.error}</span>;
  } else {
    throw new Error(`Unrecognized results type: ${results}`);
  }

  return <div>{body}</div>;
}
