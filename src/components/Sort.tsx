import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { FilterSliceItem, setSort } from "../redux/slices/filterSlice";

type PopUpClick = MouseEvent & {
  composedPath: (tar?: HTMLElement) => EventTarget[];
  target: HTMLElement;
};

type SortProps = {
  value: FilterSliceItem;
};

export const sortName: FilterSliceItem[] = [
  { title: "популярности (DECS)", sortProp: "rating" },
  { title: "популярности (ASC)", sortProp: "-rating" },
  { title: "цене (DESC)", sortProp: "price" },
  { title: "цене (ASC)", sortProp: "-price" },
  { title: "алфавиту (DESC)", sortProp: "title" },
  { title: "алфавиту (ASC)", sortProp: "-title" },
];

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const [popUp, setPopUp] = React.useState(false);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const selectedSortValue = (obj: FilterSliceItem) => {
    dispatch(setSort(obj));
    setPopUp(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as PopUpClick;
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setPopUp(false);
        console.log(_event.composedPath());
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      return document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopUp(!popUp)}>{value.title}</span>
      </div>
      {popUp && (
        <div className="sort__popup">
          <ul>
            {sortName.map((obj, i) => (
              <li
                key={obj.title + i}
                className={value.sortProp === obj.sortProp ? "active" : ""}
                onClick={() => selectedSortValue(obj)}
              >
                {obj.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
