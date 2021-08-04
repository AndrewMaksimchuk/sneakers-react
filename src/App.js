import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartOpened, setCartOpener] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const title = "Sneakers - Інтернет магазин";
	document.title = title;

	React.useEffect(() => {
		const urlCart = "https://6106af761f348700174379f9.mockapi.io/cart";
		const urlItems = "https://6106af761f348700174379f9.mockapi.io/items";
		const urlFavorites =
			"https://6106af761f348700174379f9.mockapi.io/favorites";

		async function fetchData() {
			try {
				const [resFavorite, resCart, resItems] = await Promise.all([
					axios.get(urlFavorites),
					axios.get(urlCart),
					axios.get(urlItems),
				]);
				setFavorites(resFavorite.data);
				setCartItems(resCart.data);
				setItems(resItems.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const onAddToCart = (obj) => {
		if (cartItems.find((item) => item.ids === obj.ids)) {
			setCartItems((prev) => prev.filter((item) => item.ids !== obj.ids));
		} else {
			const urlCart = "https://6106af761f348700174379f9.mockapi.io/cart";
			try {
				axios.post(urlCart, obj).then((res) => {
					setCartItems((prev) => [...prev, res.data]);
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	const onRemoveItem = (id) => {
		const urlCart = "https://6106af761f348700174379f9.mockapi.io/cart";
		axios.delete(`${urlCart}/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onAddToFavorites = (obj) => {
		const urlFavorites =
			"https://6106af761f348700174379f9.mockapi.io/favorites";
		axios.post(urlFavorites, obj).then((res) => {
			setFavorites((prev) => [...prev, res.data]);
		});
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (ids) => {
		return cartItems.some((cartItem) => cartItem.ids === ids);
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				setCartOpener,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					items={cartItems}
					opened={cartOpened}
					onRemove={onRemoveItem}
					onClose={() => setCartOpener(false)}
				/>

				<Header onClickCart={() => setCartOpener(true)} />

				<Route exact path="/">
					<Home
						items={items}
						cartItems={cartItems}
						searchValue={searchValue}
						onChangeSearchInput={onChangeSearchInput}
						onAddToCart={onAddToCart}
						onAddToFavorites={onAddToFavorites}
						isLoading={isLoading}
					/>
				</Route>

				<Route exact path="/favorites">
					<Favorites
						onAddToCart={onAddToCart}
						onFavorite={onAddToFavorites}
					/>
				</Route>

				<Route exact path="/orders">
					<Orders
						onAddToCart={onAddToCart}
						onFavorite={onAddToFavorites}
					/>
				</Route>
			</div>
		</AppContext.Provider>
	);
}

export default App;
