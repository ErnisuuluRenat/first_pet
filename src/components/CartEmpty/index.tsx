import React from "react";
import { Link } from "react-router-dom";
import empty from "../../assets/img/empty-cart.png";

export const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is Empty :(</h2>
        <p>Вероятнее всего, вы еще не успели заказать пиццу</p>
        <p>Для того чтобы заказать пиццу перейдите на главную страницу</p>
        <br />
        <img src={empty}></img>
        <Link to={"/"}>На главную страницу</Link>
      </div>
    </>
  );
};
