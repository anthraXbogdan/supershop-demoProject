import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import useFetch from "../customHooks/useFetch.js";
import Loader from "../Loader.jsx";

export default function ProductDetails() {
	const { get, loading } = useFetch(
		"https://react-tutorial-demo.firebaseio.com/"
	);
	const [productDetails, setProductDetails] = useState({});
	const params = useParams();

	useEffect(() => {
		get(`productinfo/id${params.id}.json`)
			.then((data) => {
				setProductDetails(data);
			})
			.catch((error) => {
				console.log("Could not load product details", error);
			});
	}, []);

	return (
		<>
			{loading && <Loader />}
			{
				<div className="product-details-layout">
					<div>
						<h2>{productDetails.name}</h2>
						<img
							src={productDetails.image}
							width="135"
							height="135"
							className="product-details-image"
							alt={productDetails.name}
						/>
					</div>
					<div>
						<div className="tabs">
							<ul>
								<li>
									<NavLink
										className={({ isActive }) => (isActive ? "tab-active" : "")}
										to=""
										end
									>
										Details
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({ isActive }) => (isActive ? "tab-active" : "")}
										to="nutrition"
									>
										Nutrition
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({ isActive }) => (isActive ? "tab-active" : "")}
										to="storage"
									>
										Storage
									</NavLink>
								</li>
							</ul>
						</div>
						<Outlet context={productDetails} />
					</div>
				</div>
			}
		</>
	);
}
