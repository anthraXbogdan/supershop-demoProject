import { Link } from "react-router-dom";
import Button from "./uiKit/Button";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Product(props) {
	const { details } = props;
	const { description, name, image, price, id } = details;
	const context = useContext(AppContext);
	const { cart, onProductAdd, onProductDelete } = context;

	const productFromCart = cart.find((product) => {
		return product.id === id;
	});

	const quantity = productFromCart ? productFromCart.quantity : 0;

	return (
		<div className="product">
			<div className="product-image-container">
				<Link to={`/products/${id}`}>
					<img
						src={image}
						width="100"
						height="100"
						className="product-image"
						alt={name}
					/>
				</Link>
				{quantity !== 0 && (
					<div className="product-quantity-container">
						<div className="product-quantity">{quantity}</div>
					</div>
				)}
			</div>
			<div className="product-info">
				<h3>{name}</h3>
				<p>{description}</p>
			</div>
			<div className="product-checkout">
				<div>
					{quantity !== 0 && (
						<Button
							className="product-delete"
							outline
							onClick={() => onProductDelete(id)}
						>
							X
						</Button>
					)}
				</div>
				<Button outline onClick={() => onProductAdd(details)}>
					${price}
				</Button>
			</div>
		</div>
	);
}
