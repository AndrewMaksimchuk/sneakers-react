import Card from "../components/Card";

function Home({
	items,
	searchValue,
	onChangeSearchInput,
	onAddToCart,
	onAddToFavorites,
	cartItems = [],
	isLoading,
}) {
	const renderItems = () => {
		const filteredItems = items.filter((item) =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(8)] : filteredItems).map((obj, index) => (
			<Card
				key={index}
				loading={isLoading}
				added={cartItems.some((cartItem) => cartItem?.ids === obj?.ids)}
				onFavorite={() => onAddToFavorites(obj)}
				onPlus={() => onAddToCart(obj)}
				{...obj}
			/>
		));
	};

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>
					{searchValue
						? `Пошук за запитом: "${searchValue}"`
						: "Всі кросівки"}
				</h1>
				<div className="search-block d-flex">
					<img src="/img/search.svg" alt="search" />
					<input
						onChange={onChangeSearchInput}
						type="text"
						placeholder="Пошук..."
					/>
				</div>
			</div>
			<div className="sneakers-container">{renderItems()}</div>
		</div>
	);
}

export default Home;
