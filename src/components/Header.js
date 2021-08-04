import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
	const { totalPrice } = useCart();

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img
						width={40}
						height={40}
						className="mr-15"
						src="img/logo.png"
						alt="logo"
					/>
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p>Магазин кращих кросівок</p>
					</div>
				</div>
			</Link>

			<ul className="d-flex column-gap">
				<li className="mr-30 cu-p" onClick={props.onClickCart}>
					<img
						width={18}
						height={18}
						className="mr-10"
						src="img/cart.svg"
						alt="Відобразити корзину"
					/>
					<span>{totalPrice} грн</span>
				</li>
				<li>
					<Link to="/favorites">
						<img
							className="cu-p"
							width={18}
							height={18}
							src="img/favorite.svg"
							alt="Перейти на сторінку з вподобайками"
						/>
					</Link>
				</li>
				<li>
					<Link to="/orders">
						<img
							className="cu-p"
							width={18}
							height={18}
							src="img/user.svg"
							alt="Перейти на сторінку користувача"
						/>
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
