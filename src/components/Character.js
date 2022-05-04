import React from "react";

import styles from "./Character.module.scss";

function Character({ character }) {
  return (
    <>
      <div className="mb-3 col-12 col-md-6 col-xl-4">
        <div className={styles.rmcard}>
          <img src={character.image} alt="" />
          <div className={styles["text-container"]}>
            <h3>{character.name}</h3>
            <p className="status d-flex align-items-center">
              <span className={character.status}></span>
              {character.status} · {character.species}
            </p>
            <p>Last seen on: {character.location.name} </p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Character;
