import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./mainNavComponents/Home";
import About from "./mainNavComponents/About";
import Products from "./mainNavComponents/Products";
import Cart from "./mainNavComponents/Cart";
import Navbar from "./Navbar";
import ProductDetails from "./product/ProductDetails";
import ProductDetailInfo from "./product/ProductDetailInfo";
import ProductDetailNutrition from "./product/ProductDetailNutrition";
import ProductDetailStorage from "./product/ProductDetailStorage";
import Success from "./Success";
import { ContextProvider } from "./AppContext";

function App() {
	return (
		<BrowserRouter>
			<ContextProvider>
				<Navbar></Navbar>
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						<Route path="/about" element={<About />}></Route>
						<Route path="/products" element={<Products />}></Route>
						<Route path="/products/:id" element={<ProductDetails />}>
							<Route path="" element={<ProductDetailInfo />}></Route>
							<Route
								path="nutrition"
								element={<ProductDetailNutrition />}
							></Route>
							<Route path="storage" element={<ProductDetailStorage />}></Route>
						</Route>
						<Route path="/cart" element={<Cart />}></Route>
						<Route path="/success" element={<Success />}></Route>
					</Routes>
				</div>
			</ContextProvider>
		</BrowserRouter>
	);
}

export default App;
