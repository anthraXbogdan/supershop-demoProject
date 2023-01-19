import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Success() {
	const context = useContext(AppContext);
	const onEmptyCart = context.onEmptyCart;

	useEffect(() => {
		onEmptyCart();
	}, []);

	return (
		<>
			<h1>Thanks for your order!</h1>
		</>
	);
}
