import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const Pizza: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          `https://63b575f358084a7af394fe1e.mockapi.io/pizza-items/${id}`
        );
        setItem(data);
      } catch (error) {
        alert("Ошибка с получением данных о пицце");
        navigate("/");
      }
    }
    fetchItem();
  }, []);

  if (!item) {
    return <h3>Подождите идет загрузка...</h3>;
  }

  return (
    <div className="container">
      <img src={item.imageUrl} alt="" />
      <h2>{item.title}</h2>
      <p>{item.price}</p>
    </div>
  );
};
