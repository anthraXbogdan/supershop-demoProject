import { useOutletContext } from "react-router-dom";
import Button from "../uiKit/Button";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export default function ProductDetailInfo() {
	const context = useContext(AppContext);
	const onProductAdd = context.onProductAdd;
	const product = useOutletContext();

	return (
		<>
			<p>
				{product.description} sold at <strong>${product.price}</strong> per
				piece.
			</p>
			<Button onClick={() => onProductAdd(product)}>${product.price}</Button>
		</>
	);
}
