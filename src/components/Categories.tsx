import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

type CategoriesProps = {
  activeCategory: number;
  onChangeCategory: (i: number) => void;
};

const list = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategory, onChangeCategory }) => {
    useWhyDidYouUpdate("Categories", {
      activeCategory,
      onChangeCategory,
    });

    return (
      <div className="categories">
        <ul>
          {list.map((lis, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(i)}
              className={activeCategory === i ? "active" : ""}
            >
              {lis}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
