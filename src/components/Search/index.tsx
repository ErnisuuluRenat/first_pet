import React from "react";
import { useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { setVal } from "../../redux/slices/searchSlice";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = (e: React.MouseEvent<SVGSVGElement>) => {
    dispatch(setSearchValue(""));
    setValue("");
    //оператор опциональной последовательности '?' если есть что то вызови
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((v) => {
      dispatch(setSearchValue(v));
    }, 250),
    []
  );

  const onChangeInp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInp(e)}
        type={"search"}
        className={styles.input}
        placeholder={"Поиск пиццы ..."}
      ></input>
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.close}
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
        </svg>
      )}
    </div>
  );
};
