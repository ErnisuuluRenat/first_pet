import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>Ничего не найдено :(</h1>
      <p className={styles.root}>
        к сожалению у нас отсуствует такая страница(
      </p>
    </div>
  );
};
