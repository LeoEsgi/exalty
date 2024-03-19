import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { cart, cart_content, order } from "./Models";
import BasicComponent from "./BasicComponent";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import "./Cart.css";
import { CheckoutForm } from "./CheckoutForm";
import StarsIcon from "@mui/icons-material/Stars";
import React from "react";
const stripePromise = loadStripe(
  "pk_test_51OUHmoF7Ds1MzVzS9YK9cgn32JWD9SjXuhUC1rabUOEFzIlfRLBPzZ10g88rugrbbXyUN7OcDGnPJDW3QNCc04vL00ukMTWuTj"
);
function Cart() {
  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { user, isAuthenticated, cart, setCart, setUser } = useAuth();
  const navigate = useNavigate();
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean[]>([]);
  const [clientSecret, setClientSecret] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [loading, setLoading] = React.useState(false);

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

  const createOrder = async (
    price_ht: number,
    price_ttc: number,
    paid_price_ht: number,
    paid_price_ttc: number,
    billing_address_id: number,
    shipping_address_id: number,
    discount: number
  ) => {
    const response = await axios
      .post("http://localhost:5000/shop/order/" + user.id, {
        price_ht,
        price_ttc,
        paid_price_ht,
        paid_price_ttc,
        billing_address_id,
        shipping_address_id,
        discount,
      })
      .catch((err) => {
        console.error("Error creating order:", err);
        return { data: [] };
      });

    return response.data as order;
  };

  const handlePaymentWithPoints = async () => {
    if (user.fidelity_points < cartTotal * 10) {
      setPaymentMessage(
        "Vous n'avez pas assez de points pour payer cette commande, vous avez besoin de " +
          (Math.floor(cartTotal * 10) - user.fidelity_points) +
          " points supplémentaires"
      );
      return;
    }
    await handlePaymentSuccess();
    updateUserPoints(
      user.fidelity_points -
        Math.floor(cartTotal * 10) -
        Math.floor(cartTotal / 10)
    );
    setUser({
      ...user,
      fidelity_points: user.fidelity_points - cartTotal * 10,
    });
  };

  const handlePaymentSuccess = async () => {
    setOpen(false);
    cart?.cart_content.forEach(async (content) => {
      await deleteCartitem(content.id);
    });

    const order = await createOrder(
      cartTotal,
      cartTotal,
      cartTotal,
      cartTotal,
      1,
      1,
      0
    );

    const order_content = cart?.cart_content.map((content) => {
      return {
        quantity: content.quantity,
        product_id: content.product.id,
        order_id: order.id,
      };
    });

    order_content.forEach(async (content) => {
      await axios
        .post("http://localhost:5000/shop/order/content/" + order.id, {
          product_id: content.product_id,
          quantity: content.quantity,
        })
        .catch((err) => {
          console.error("Error creating order content:", err);
          return { data: [] };
        });
    });

    updateUserPoints(user.fidelity_points + Math.floor(cartTotal / 10));
    setPaymentMessage("Votre paiement a été effectué avec succès");
    const newCart = cart;
    newCart.cart_content = [];
    setCart(newCart);

    setCartTotal(0);
  };

  const updateUserPoints = async (points: number) => {
    const response = await axios
      .put("http://localhost:5000/user/update_point/" + user.id, {
        fidelity_points: points,
      })
      .catch((err) => {
        console.error("Error updating user points:", err);
        return { data: [] };
      });
    return response.data;
  };

  const onOptionClicked =
    (index: number, value: number, content: cart_content) => async () => {
      if (value === 0) {
        await deleteCartitem(content.id);
      } else {
        const response = await axios
          .put("http://localhost:5000/shop/cart/" + content.id, {
            quantity: value,
          })
          .catch((err) => {
            console.error("Error updating cart item:", err);
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
      }

      const newIsOpen = [...isOpen];
      newIsOpen[index] = !newIsOpen[index];
      setIsOpen(newIsOpen);
    };

  const getIntentFromServer = async () => {
    setLoading(true);
    try {
      const response = await axios
        .post("http://localhost:5000/stripe/create-payment-intent", {
          amount: cartTotal * 100,
          currency: "eur",
        })
        .catch((err) => {
          console.error("Error getting intent:", err);
          return { data: [] };
        });
      setClientSecret(response.data.clientSecret);
      setOpen(true);
      setLoading(false);
    } catch (err) {
      console.error("Error getting intent:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }

    let total = 0;
    if (cart && cart.cart_content != null) {
      if (cart.cart_content.length > 0) {
        cart?.cart_content.forEach((content) => {
          total += content.product.basePrice * content.quantity;
        });
      } else {
        total = 0;
      }
    }
    setCartTotal(total);
  }, []);

  useEffect(() => {
    document.onclick = (e) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.className !== "dropdown-header") {
          setIsOpen(new Array(isOpen.length).fill(false));
        }
      }
    };
    return () => {
      document.onclick = null;
    };
  }, []);

  return (
    <BasicComponent
      className="Cart"
      title="Panier"
      content={
        <div>
          {cart == null && <div>Votre panier est vide</div>}
          {cart != null && (
            <div className="cart-content">
              <div className="cart-content-list">
                <div className="cart-content-list-title">Votre panier</div>
                {Object.keys(cart).length > 0 &&
                  cart.cart_content != null &&
                  cart.cart_content.length > 0 &&
                  cart.cart_content.map((content, index) => (
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
                      <div>
                        {Number(content.product.basePrice).toFixed(2)} €
                      </div>
                    </div>
                  ))}

                {cart.cart_content.length === 0 && (
                  <div>Votre panier est vide</div>
                )}
              </div>

              <div className="cart-pay">
                {Object.keys(cart).length > 0 &&
                  cart.cart_content != null &&
                  cart.cart_content.length > 0 && (
                    <>
                      <div className="cart-pay-total">
                        Sous-total ({cart.cart_content.length} articles) :
                        <b> {cartTotal.toFixed(2)} €</b>
                      </div>
                      <div className="cart-pay-valid">
                        {loading ? (
                          <CircularProgress className="progress-bar" />
                        ) : (
                          <button
                            onClick={() => getIntentFromServer()}
                            className="btn"
                          >
                            Passer la commande
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handlePaymentWithPoints()}
                          className="btn"
                        >
                          Payer avec vos points <StarsIcon />
                        </button>
                      </div>
                    </>
                  )}

                <button onClick={() => navigate("/shop")} className="btn">
                  Continuer mes achats
                </button>

                {open && (
                  <Dialog
                    fullScreen={fullScreen}
                    open={clientSecret !== null}
                    onClose={() => setOpen(false)}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Remplir les informations de paiement"}
                    </DialogTitle>
                    <DialogContent>
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                        }}
                      >
                        <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
                      </Elements>
                    </DialogContent>
                  </Dialog>
                )}
                {paymentMessage && (
                  <Dialog
                    fullScreen={fullScreen}
                    open={paymentMessage !== ""}
                    onClose={() => setPaymentMessage("")}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Paiement"}
                    </DialogTitle>
                    <DialogContent>{paymentMessage}</DialogContent>
                    <DialogActions>
                      <button onClick={() => setPaymentMessage("")}>
                        Fermer
                      </button>
                    </DialogActions>
                  </Dialog>
                )}
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
export default Cart;
