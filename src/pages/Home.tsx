import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { useSelector } from "react-redux";
import { setActiveCategory, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizza, Status } from "../redux/slices/pizzasSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { useWhyDidYouUpdate } from "ahooks";

type ItemsObj = {
  id: string;
  title: string;
  types: number[];

  price: number;
  imageUrl: string;
  sizes: number[];
};

type PizzaBlockObj = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const Home = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const { activeCategory, currentPage, sort, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setActiveCategory(id));
  }, []);

  const onChangeCurrentPage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const sortType = sort.sortProp;

  //function for fetch request

  const getPizza = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortValue = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    //fetchPizza одновреммено запрашивает данные и их же сохраняет

    dispatch(
      fetchPizza({
        sortValue,
        activeCategory,
        currentPage,
        order,
        search,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizza();
  }, [activeCategory, sortType, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProp: sortType,
  //     activeCategory,
  //     currentPage,
  //   });
  // }, [activeCategory, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h1>Извините возникли неожиданные проблемы :(</h1>
        </div>
      ) : (
        <div className="content__items">
          {status === "isLoad"
            ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
            : items
                .filter((obj: ItemsObj) => {
                  if (
                    obj.title.toLowerCase().includes(searchValue.toLowerCase())
                  ) {
                    return true;
                  }
                  return false;
                })
                .map((obj: PizzaBlockObj) => (
                  <PizzaBlock key={obj.id} {...obj}></PizzaBlock>
                ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={onChangeCurrentPage}
      />
    </div>
  );
};
