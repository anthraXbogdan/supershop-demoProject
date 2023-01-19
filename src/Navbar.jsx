import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import Button from "./uiKit/Button";

function getClassName({ isActive }) {
	return isActive ? "active" : "";
}

export default function Navbar() {
	const { getCartCount } = useContext(AppContext);
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const handleSwitchThemeClick = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	useEffect(() => {
		if (isDarkTheme) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	});

	useEffect(() => {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		console.log(prefersDark);

		if (prefersDark) {
			setIsDarkTheme(true);
		}
	}, []);

	return (
		<nav className="navbar">
			<NavLink to="/" className="nav-brand">
				SuperM
			</NavLink>
			<ul>
				<li className="nav-item">
					<Button className="theme-switcher" onClick={handleSwitchThemeClick}>
						{isDarkTheme ? "Dark" : "Light"}
					</Button>
				</li>
				<li className="nav-item">
					<NavLink className={getClassName} to="/">
						Home
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className={getClassName} to="/about">
						About us
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className={getClassName} to="/products">
						Products
					</NavLink>
				</li>
				<li>
					<NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
						Cart ({getCartCount()})
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
