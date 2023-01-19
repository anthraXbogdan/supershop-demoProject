import useFetch from "../customHooks/useFetch.js";
import { useEffect, useState } from "react";
import Product from "../Product.jsx";
import Loader from "../Loader.jsx";

export default function Products(props) {
	const { cart, onProductAdd, onProductDelete } = props;
	const [products, setProducts] = useState([]);
	const { get, loading } = useFetch(
		"https://react-tutorial-demo.firebaseio.com/"
	);

	useEffect(() => {
		get("supermarket.json").then((data) => {
			setProducts(data);
		});
	}, []);

	return (
		<>
			<div className="products-layout">
				<h1>Products</h1>
				<p>Take a look at our products</p>
				<div className="products-grid">
					{loading && <Loader />}
					{products.map((product) => (
						<Product
							key={product.id}
							details={product}
							cart={cart}
							onProductAdd={onProductAdd}
							onProductDelete={onProductDelete}
						/>
					))}
				</div>
			</div>
		</>
	);
}
