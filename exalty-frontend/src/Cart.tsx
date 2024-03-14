import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { cart, cart_content } from "./Models";
import BasicComponent from "./BasicComponent";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
function Cart() {
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [cart, setCart] = useState<cart>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);

  document.onclick = (e) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.className !== "dropdown-header") {
        setIsOpen(new Array(isOpen.length).fill(false));
      }
    }
  };

  const toggling = (index: number) => () => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  const deleteCartitem = async (content_id: number) => {
    const response = await axios
      .delete("http://localhost:5000/shop/cart/" + content_id)
      .catch((err) => {
        console.error("Error deleting cart item:", err);
        return { data: [] };
      });
    const cart = response.data as cart;
    let total = 0;
    if (cart?.cart_content.length > 0) {
      cart?.cart_content.forEach((content) => {
        total += content.product.basePrice * content.quantity;
      });
    } else {
      total = 0;
    }
    setCartTotal(total);
    setCart(cart);
  };

  const onOptionClicked =
    (index: number, value: number, content: cart_content) => async () => {
      if (value === 0) {
        await deleteCartitem(content.id);
      }

      const newIsOpen = [...isOpen];
      newIsOpen[index] = !newIsOpen[index];
      setIsOpen(newIsOpen);
    };

  const getCart = async () => {
    const response = await axios
      .get("http://localhost:5000/shop/cart/user/" + user.id)
      .catch((err) => {
        console.error("Error fetching cart:", err);
        return { data: [] };
      });
    return response.data as cart;
  };

  // const stripePromise = loadStripe(
  //   "sk_test_51OUHmoF7Ds1MzVzSmVLYqo5RgzLQ1JO2htcF28z7VtIWR85lBwScHW1TVqbRxCmnG5scGXM9owUEamxUiYxjA4ym000mGYqDmM"
  // );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    const fetchCart = async () => {
      const cartFromServer = await getCart();
      setCart(cartFromServer);
      let total = 0;
      if (cartFromServer?.cart_content.length > 0) {
        cartFromServer?.cart_content.forEach((content) => {
          total += content.product.basePrice * content.quantity;
        });
      } else {
        total = 0;
      }
      setCartTotal(total);
    };
    fetchCart();
  }, []);

  return (
    <BasicComponent
      className="Cart"
      title="Panier"
      content={
        // <Elements stripe={stripePromise}>
        <form>
          {cart == null && <div>Votre panier est vide</div>}
          {cart != null && (
            <div className="cart-content">
              <div className="cart-content-list">
                <div className="cart-content-list-title">Votre panier</div>
                {cart?.cart_content.map((content, index) => (
                  <div className="cart-product" key={index}>
                    <div className="cart-product-img">
                      <img
                        src={
                          "http://localhost:5000/uploads/product/" +
                          content.product.img
                        }
                        alt={content.product.img}
                      ></img>
                    </div>
                    <div>{content.product.name}</div>

                    <div className="cart-product-quantity">
                      <div className="dropdown-container">
                        <div
                          className="dropdown-header"
                          onClick={toggling(index)}
                        >
                          Qté : {content.quantity}
                        </div>
                        {isOpen[index] && (
                          <div className="dropdown-list-container">
                            <ul className="dropdown-list">
                              {options.map((option) => (
                                <li
                                  className="dropdown-list-item"
                                  onClick={onOptionClicked(
                                    index,
                                    option,
                                    content
                                  )}
                                  key={Math.random()}
                                >
                                  {option !== 0
                                    ? option
                                    : option + " (Supprimer)"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>{Number(content.product.basePrice).toFixed(2)} €</div>
                  </div>
                ))}
              </div>
              {/* <PaymentElement /> */}
              <div className="cart-pay">
                <div className="cart-pay-total">
                  Sous-total ({cart.cart_content.length} articles) :
                  <b> {cartTotal.toFixed(2)} €</b>
                </div>
                <button className="btn">Passer la commande</button>
              </div>
            </div>
          )}
        </form>
        // </Elements>
      }
    />
  );
}
export default Cart;
