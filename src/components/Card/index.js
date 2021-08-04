import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

function Card({
	onFavorite,
	imgUrl,
	title,
	price,
	ids,
	onPlus,
	favorited,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(favorited);

	const onClickPlus = () => {
		onPlus({ imgUrl, title, price, ids });
	};

	const onClickFavorite = () => {
		onFavorite({ imgUrl, title, price });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={4}
					width={150}
					height={220}
					viewBox="0 0 150 220"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
					<rect
						x="0"
						y="107"
						rx="10"
						ry="10"
						width="150"
						height="15"
					/>
					<rect
						x="0"
						y="126"
						rx="10"
						ry="10"
						width="93"
						height="15"
					/>
					<rect
						x="0"
						y="164"
						rx="10"
						ry="10"
						width="93"
						height="24"
					/>
					<rect
						x="118"
						y="180"
						rx="10"
						ry="10"
						width="32"
						height="32"
					/>
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite} onClick={onClickFavorite}>
						<img
							src={
								isFavorite
									? "img/heart-liked.svg"
									: "img/heart-unliked.svg"
							}
							alt="unliked"
						></img>
					</div>
					<img width={133} height={112} src={imgUrl} alt="" />
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Ціна: </span>
							<b>{price} грн</b>
						</div>
						<img
							className={styles.plus}
							src={
								isItemAdded(ids)
									? "img/btn-checked.svg"
									: "img/btn-plus.svg"
							}
							alt="button add to cart"
							onClick={onClickPlus}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default Card;
