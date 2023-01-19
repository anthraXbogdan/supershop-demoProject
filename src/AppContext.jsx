import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

function ContextProvider(props) {
	const [cart, setCart] = useState(() => {
		let savedCart = [];
		try {
			savedCart = JSON.parse(localStorage.getItem("superMcart")) || [];
		} catch (error) {
			savedCart = [];
		}
		return savedCart;
	});

	useEffect(() => {
		if (cart) {
			localStorage.setItem("superMcart", JSON.stringify(cart));
		}
	}, [cart]);

	const handleProductAdd = (newProduct) => {
		// check if the cart contains the product
		const containsProduct = cart.find((product) => {
			return product.id === newProduct.id;
		});

		if (containsProduct) {
			const updatedCart = cart.map((product) => {
				if (product.id === newProduct.id) {
					return { ...product, quantity: product.quantity + 1 };
				}
				return product;
			});
			setCart(updatedCart);
		} else {
			setCart([...cart, { ...newProduct, quantity: 1 }]);
		}
	};

	const handleProductDelete = (id) => {
		const filteredCart = cart.filter((product) => {
			return product.id !== id;
		});
		setCart(filteredCart);
	};

	const getCartCount = () => {
		return cart.reduce((accumulator, product) => {
			return accumulator + product.quantity;
		}, 0);
	};

	const getTotalPrice = () => {
		return cart.reduce((accumulator, product) => {
			return accumulator + product.quantity * product.price;
		}, 0);
	};

	const handleEmptyCart = () => {
		setCart([]);
	};

	const value = {
		cart: cart,
		onProductAdd: handleProductAdd,
		onProductDelete: handleProductDelete,
		onEmptyCart: handleEmptyCart,
		getCartCount: getCartCount,
		getTotalPrice: getTotalPrice,
	};

	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
}

export { AppContext, ContextProvider };
