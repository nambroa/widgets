import React, { useState, useEffect } from "react";
import Axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  /**
   * DebouncedTerm allows us to use the useEffect hook without needing to check if its the first time we are going to search.
   * Otherwise, in order to do the first search without timeout (for a better UX), we would need to use the term and results pieces of state.
   * This introduces a react warning that could result in a future bug that is difficult to resolve. Adding result to the useEffect array
   * introduces another bug -searching again when you get results-. So a solution was made using debouncedTerm.
   */
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  /**
   * A timeout was introduced to the search in order to avoid hitting the API every single time the user types a letter while trying to form a word.
   */
  useEffect(() => {
    const search = async () => {
      const { data } = await Axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  const renderedResults = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={e => setTerm(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="ui celled list"> {renderedResults}</div>
    </div>
  );
};

export default Search;
