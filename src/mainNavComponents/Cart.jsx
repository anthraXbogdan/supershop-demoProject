import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../uiKit/Button";
import Input from "../uiKit/Input";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const stripeLoadedPromise = loadStripe(
   "pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate"
);

export default function Cart() {
   const [email, setEmail] = useState("");
   const [productsCheckout, setProductsCheckout] = useState([]);
   const { cart, getTotalPrice } = useContext(AppContext);

   function handleEmailChange(e) {
      setEmail(e.target.value);
   }

   // useEffect(() => {
   // 	const products = [];
   // 	cart.map((product) => {
   // 		products.push({ price: product.price_id, quantity: product.quantity });
   // 	});
   // 	setProductsCheckout(products);
   // }, [cart]);

   function handleFormSubmit(e) {
      e.preventDefault();

      const lineItems = cart.map((product) => {
         return { price: product.price_id, quantity: product.quantity };
      });

      stripeLoadedPromise
         .then((stripe) => {
            stripe.redirectToCheckout({
               lineItems: lineItems,
               mode: "payment",
               successUrl: "https://supershop.fly.dev/success",
               cancelUrl: "https://supershop.fly.dev/",
               customerEmail: email,
            });
         })
         .then((response) => {
            // this will only log if the redirect did not work
            console.log(response.error);
         })
         .catch((error) => {
            // wrong API key? you will see the error message here
            console.error(error);
         });
   }

   return (
      <>
         <div className="cart-layout">
            <div>
               <h1>Your Cart</h1>
               {cart.length === 0 && (
                  <p>You have not added any product to your cart yet.</p>
               )}

               {cart.length > 0 && (
                  <table className="table table-cart">
                     <thead>
                        <tr>
                           <th width="25%" className="th-product">
                              Product
                           </th>
                           <th width="20%">Unit price</th>
                           <th width="10%">Quanity</th>
                           <th width="25%">Total</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cart.map((product) => {
                           return (
                              <tr key={product.id}>
                                 <td>
                                    <img
                                       src={product.image}
                                       width="30"
                                       height="30"
                                       alt={product.name}
                                    />
                                    {product.name}
                                 </td>
                                 <td>${product.price}</td>
                                 <td>{product.quantity}</td>
                                 <td>
                                    <strong>
                                       ${product.price * product.quantity}
                                    </strong>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                     <tfoot>
                        <tr>
                           <th colSpan="2"></th>
                           <th className="cart-highlight">Total</th>
                           <th className="cart-highlight">
                              ${getTotalPrice()}
                           </th>
                        </tr>
                     </tfoot>
                  </table>
               )}

               {cart.length > 0 && (
                  <form className="pay-form" onSubmit={handleFormSubmit}>
                     <p>
                        Enter your email and then click on pay and your products
                        will be delivered to you on the same day!
                     </p>
                     <Input
                        onChange={handleEmailChange}
                        autoComplete="email"
                        placeholder="Email"
                        type="email"
                        required
                     />
                     <Button type="submit">Pay</Button>
                  </form>
               )}
            </div>
         </div>
      </>
   );
}
