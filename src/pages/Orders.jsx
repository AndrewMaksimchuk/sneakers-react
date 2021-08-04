import React from "react";
import AppContext from "../context";
import Card from "../components/Card";
import axios from "axios";

function Orders({ onFavorite, onAddToCart }) {
	const [orders, setOrders] = React.useState([]);
	const { favorites } = React.useContext(AppContext);
	const title = "Мої замовлення";

    // console.log(favorites)

	React.useEffect(() => {
		const urlOrders = "https://6106af761f348700174379f9.mockapi.io/orders";
		(async () => {
			try {
				const { data } = await axios.get(urlOrders);
				const arrayOfItems = data.map((obj) => obj.items).flat();
                const arrayOfItemsWithFavoriteCheck = arrayOfItems.map((obj) => {
                    const check = favorites.some((val) => val.ids === obj.ids);
                    if (check) return { ...obj, inFavorite: true };
                    return { ...obj, inFavorite: false };
                });
				setOrders(arrayOfItemsWithFavoriteCheck);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [favorites]);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>{title}</h1>
			</div>

			<div className="sneakers-container">
				{orders.map((obj, index) => (
					<Card
						key={index}
						title={obj.title}
						price={obj.price}
						imgUrl={obj.imgUrl}
						favorited={obj.inFavorite}
						onFavorite={() => onFavorite}
						onPlus={() => onAddToCart(obj)}
					/>
				))}
			</div>
		</div>
	);
}

export default Orders;
