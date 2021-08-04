import React from 'react';
import AppContext from '../context';
import Card from "../components/Card";

function Favorites({ onFavorite, onAddToCart }) {
  const { favorites } = React.useContext(AppContext);

  return (
    <div className="content p-40">

      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої вподобайки</h1>
      </div>

      <div className="sneakers-container">
        {favorites
          .map((obj, index) => (
            <Card
              key={index}
              title={obj.title}
              price={obj.price}
              imgUrl={obj.imgUrl}
              favorited={true}
              onFavorite={() => onFavorite}
              onPlus={() => onAddToCart(obj)}
            />
          ))}
      </div>

    </div>
  );
}

export default Favorites;