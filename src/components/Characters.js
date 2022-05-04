import React, { useState } from "react";
import { useQuery } from "react-query";

//import modules
import Loader from "./Loader";
import Character from "./Character";

// Iimport images
import rick from "../img/angryrick.gif";

function Characters() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const fetchCharacters = async ({ queryKey }) => {
    console.log(queryKey);
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}&name=${search}`
    );
    return response.json();
  };

  const inputChange = (value) => {
    setPage(1);
    setSearch(value);
  };

  // Usequery
  const { data, status, isPreviousData } = useQuery(
    ["characters", page, search],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "success") {
    console.log(data);
    console.log("Esiste", data.results);
  }

  return (
    <>
      <div className="input-wrapper">
        <input
          autoFocus
          placeholder="Type here the name of the personage you are looking for..."
          onChange={(e) => {
            inputChange(e.target.value);
          }}
        />
      </div>
      {data.results && (
        <>
          <div className="row justify-content-center">
            {data.results.map((char) => {
              return <Character character={char} />;
            })}
          </div>
          <div className="pagination-wrapper">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((old) => {
                  return old - 1;
                });
              }}
            >
              Previous
            </button>
            <span className="pagination">
              Page {page} of {data.info.pages}
            </span>
            <button
              disabled={isPreviousData || !data.info.next}
              onClick={() => {
                setPage((old) => {
                  return old + 1;
                });
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
      {data.error && (
        <>
          <div className="d-flex justify-content-center align-items-center">
            <img className="rickerror" src={rick}></img>
          </div>
          <p className="error">{data.error}!</p>
        </>
      )}
    </>
  );
}

export default Characters;
