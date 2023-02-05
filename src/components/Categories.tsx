import { useWhyDidYouUpdate } from "ahooks";
import React from "react";

type CategoriesProps = {
  activeCategory: number;
  onChangeCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  onChangeCategory,
}) => {
  useWhyDidYouUpdate("Categories", { activeCategory, onChangeCategory });

  const list = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

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
};
