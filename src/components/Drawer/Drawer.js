import React from "react";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

function Drawer({ onClose, onRemove, items = [], opened }) {
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [orderId, setOrderId] = React.useState(undefined);
	const { cartItems, setCartItems, totalPrice } = useCart();

	const onClickOrder = async () => {
		const urlOrders = "https://6106af761f348700174379f9.mockapi.io/orders";
		try {
			axios
				.post(urlOrders, {
					items: cartItems,
				})
				.then((res) => {
					const { id } = res.data;
					setOrderId(id);
					setIsOrderComplete(true);
					setCartItems([]);
				});
		} catch (error) {
			console.error(error);
		}
		try {
			const urlCart = "https://6106af761f348700174379f9.mockapi.io/cart";

			for (let i = 0; i < cartItems.length; i++) {
				const element = cartItems[i];
				await axios.delete(`${urlCart}/${element.id}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className={`${styles.overlay} ${
				opened ? styles.overlayVisible : ""
			}`}
			onClick={onClose}
		>
			<div className={styles.drawer}>
				<h2 className="mb-30 d-flex justify-between">
					Корзина
					<img
						onClick={onClose}
						className="removeBtn cu-p"
						src="/img/btn-remove.svg"
						alt="remove"
					/>
				</h2>

				{items.length > 0 ? (
					<div>
						<div className="items">
							{items.map((obj, index) => (
								<div
									key={index}
									className="cartItem d-flex align-item mb-20"
								>
									<div
										style={{
											backgroundImage: `url(${obj.imgUrl})`,
										}}
										className="cartItemImg"
									></div>
									<div className="mr-20">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} грн</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="remove"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Всього: </span>
									<div></div>
									<b>{totalPrice} грн</b>
								</li>
								<li>
									<span>Податок 5%: </span>
									<div></div>
									<b>
										{(
											parseFloat(totalPrice) * 0.05
										).toFixed(2)}{" "}
										грн
									</b>
								</li>
							</ul>
							<button
								className="greenButton"
								onClick={onClickOrder}
							>
								Оформити замовлення
								<img src="/img/arrow.svg" alt="arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={
							isOrderComplete
								? `Замовлення №${orderId} оформлено!`
								: "Корзина спустошена..."
						}
						description={
							isOrderComplete
								? "Ваше замовлення скоро буде відрпавлене..."
								: "Додайте пару кросівок, хоча б одну парочку;-)"
						}
						image={
							isOrderComplete
								? "/img/complete-order.jpg"
								: "/img/empty-cart.jpg"
						}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;

// complete-oreder.jpg
