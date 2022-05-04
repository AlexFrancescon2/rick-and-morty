import React from "react";

import styles from "./Loader.module.scss";
import portal from '../img/portal.gif'
console.log(portal)

function Loader() {
  return (
    <div className={styles.wrapper}>
      <img src={portal}></img>
    </div>
  );
}

export default Loader;
