import { useOutletContext } from "react-router-dom";

export default function ProductDetailStorage({ storage }) {
	const data = useOutletContext();

	return (
		<>
			<p>
				<strong>Storage instructions:</strong> {data.storage}
			</p>
		</>
	);
}
