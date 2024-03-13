import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { product } from "./Models";
import BasicComponent from "./BasicComponent";
import { loadStripe } from "@stripe/stripe-js";
function Cart() {
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {}, []);
  const stripePromise = loadStripe(
    "sk_test_51OUHmoF7Ds1MzVzSmVLYqo5RgzLQ1JO2htcF28z7VtIWR85lBwScHW1TVqbRxCmnG5scGXM9owUEamxUiYxjA4ym000mGYqDmM"
  );
  const options = {
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <BasicComponent
      className="Cart"
      title="Panier"
      content={
        <Elements stripe={stripePromise} options={options}>
          <form>
            {products.length === 0 && <div>Votre panier est vide</div>}
            {products.length > 0 && (
              <div>
                {products.map((product, index) => (
                  <div>
                    <div>{product.name}</div>
                    <div>{Number(product.basePrice).toFixed(2)}</div>
                  </div>
                ))}
                <PaymentElement />
                <button>Passer au paiement</button>
              </div>
            )}
          </form>
        </Elements>
      }
    />
  );
}
export default Cart;
