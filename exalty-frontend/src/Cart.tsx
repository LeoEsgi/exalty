import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { cart, cart_content, order, stock_size, address } from "./Models";
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
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./Cart.css";
import { CheckoutForm } from "./CheckoutForm";
import StarsIcon from "@mui/icons-material/Stars";

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
  const [loading, setLoading] = useState(false);
  const [unfoldedCart, setUnfoldedCart] = useState<number>(-1);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addressShipping, setAddressShipping] = useState<address | null>(null);
  const [addressBilling, setAddressBilling] = useState<address | null>(null);
  const [isPointPay, setIsPointPay] = useState(false);

  const handleChangeShipping = (value: number) => {
    if (value === 0) {
      setAddressShipping(null);
      return;
    }
    const address_id = user.address.find(
      (address) => address.id === Number(value)
    );
    if (address_id) {
      setAddressShipping(address_id);
    }
  };

  const handleChangeBilling = (value: number) => {
    if (value === 0) {
      setAddressBilling(null);
      return;
    }

    const address_id = user.address.find(
      (address) => address.id === Number(value)
    );
    if (address_id) {
      setAddressBilling(address_id);
    }
  };

  const createAddress = async (isPointPay: boolean) => {
    if (!addressShipping && !addressBilling) {
      const address = document.querySelector<HTMLInputElement>(
        "input[name='address']"
      )?.value;

      const city =
        document.querySelector<HTMLInputElement>("input[name='city']")?.value;
      const zipcode = document.querySelector<HTMLInputElement>(
        "input[name='zipcode']"
      )?.value;

      const title = document.querySelector<HTMLInputElement>(
        "input[name='title']"
      )?.value;

      if (!address || !city || !zipcode || !title) {
        alert(
          "Veuillez remplir tous les champs obligatoires pour l'addresse de livraison"
        );
        return;
      }
      const address2 = document.querySelector<HTMLInputElement>(
        "input[name='address2']"
      )?.value;

      const city2 = document.querySelector<HTMLInputElement>(
        "input[name='city2']"
      )?.value;
      const zipcode2 = document.querySelector<HTMLInputElement>(
        "input[name='zipcode2']"
      )?.value;

      const title2 = document.querySelector<HTMLInputElement>(
        "input[name='title2']"
      )?.value;

      if (!address2 || !city2 || !zipcode2 || !title2) {
        alert(
          "Veuillez remplir tous les champs obligatoires pour l'addresse de facturation"
        );
        return;
      }

      const newAddress = {
        address,
        city,
        zipcode,
        title,
        user_id: user.id,
      };

      const newAddress2 = {
        address: address2,
        city: city2,
        zipcode: zipcode2,
        title: title2,
        user_id: user.id,
      };

      if (
        address === address2 &&
        city === city2 &&
        zipcode === zipcode2 &&
        title === title2
      ) {
        const addr = await axios
          .post("http://localhost:5000/shop/address", newAddress)
          .catch((err) => {
            console.error("Error creating address:", err);
            return { data: [] };
          });

        setAddressShipping(addr.data as address);
        setAddressBilling(addr.data as address);
      } else {
        const shipping = await axios
          .post("http://localhost:5000/shop/address", newAddress)
          .catch((err) => {
            console.error("Error creating address:", err);
            return { data: [] };
          });

        setAddressShipping(shipping.data as address);

        const billing = await axios
          .post("http://localhost:5000/shop/address", newAddress2)
          .catch((err) => {
            console.error("Error creating address:", err);
            return { data: [] };
          });

        setAddressBilling(billing.data as address);
      }
    } else if (!addressShipping && addressBilling) {
      const address = document.querySelector<HTMLInputElement>(
        "input[name='address']"
      )?.value;

      const city =
        document.querySelector<HTMLInputElement>("input[name='city']")?.value;
      const zipcode = document.querySelector<HTMLInputElement>(
        "input[name='zipcode']"
      )?.value;

      const title = document.querySelector<HTMLInputElement>(
        "input[name='title']"
      )?.value;

      if (!address || !city || !zipcode || !title) {
        alert(
          "Veuillez remplir tous les champs obligatoires pour l'addresse de livraison"
        );
        return;
      }

      const newAddress = {
        address,
        city,
        zipcode,
        title,
        user_id: user.id,
      };

      const addr = await axios
        .post("http://localhost:5000/shop/address", newAddress)
        .catch((err) => {
          console.error("Error creating address:", err);
          return { data: [] };
        });

      setAddressShipping(addr.data as address);
    } else if (addressShipping && !addressBilling) {
      const address2 = document.querySelector<HTMLInputElement>(
        "input[name='address2']"
      )?.value;

      const city2 = document.querySelector<HTMLInputElement>(
        "input[name='city2']"
      )?.value;
      const zipcode2 = document.querySelector<HTMLInputElement>(
        "input[name='zipcode2']"
      )?.value;

      const title2 = document.querySelector<HTMLInputElement>(
        "input[name='title2']"
      )?.value;

      if (!address2 || !city2 || !zipcode2 || !title2) {
        alert(
          "Veuillez remplir tous les champs obligatoires pour l'addresse de facturation"
        );
        return;
      }

      const newAddress2 = {
        address: address2,
        city: city2,
        zipcode: zipcode2,
        title: title2,
        user_id: user.id,
      };

      const billing = await axios
        .post("http://localhost:5000/shop/address", newAddress2)
        .catch((err) => {
          console.error("Error creating address:", err);
          return { data: [] };
        });

      setAddressBilling(billing.data as address);
    }

    setShowAddressList(false);
    if (isPointPay) {
      return handlePaymentWithPoints();
    } else {
      return getIntentFromServer();
    }
  };

  const handleSizeChange = (
    content: cart_content,
    index: number,
    value: string
  ) => {
    const newCart = { ...cart };
    const contentIndex = newCart.cart_content.findIndex(
      (c) => c.id === content.id
    );

    if (contentIndex !== -1) {
      const sizes = newCart.cart_content[contentIndex].size;
      if (sizes && sizes.length > index) {
        sizes[index] = { ...sizes[index], size: value };
        newCart.cart_content[contentIndex] = {
          ...newCart.cart_content[contentIndex],
          size: sizes,
        };
        setCart(newCart);
      }
    }
  };

  const handleFlockingChange = (
    content: cart_content,
    index: number,
    value: string
  ) => {
    const newCart = { ...cart };
    const contentIndex = newCart.cart_content.findIndex(
      (c) => c.id === content.id
    );

    if (contentIndex !== -1) {
      const flockings = newCart.cart_content[contentIndex].flocking;
      if (flockings && flockings.length > index) {
        flockings[index] = { ...flockings[index], value };
        newCart.cart_content[contentIndex] = {
          ...newCart.cart_content[contentIndex],
          flocking: flockings,
        };
        setCart(newCart);
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
    if (cart && cart.cart_content && cart.cart_content.length > 0) {
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

    if (addressBilling === null || addressShipping === null) {
      setPaymentMessage(
        "Veuillez renseigner une adresse de facturation et de livraison"
      );
      return;
    }
    const order = await createOrder(
      cartTotal,
      cartTotal,
      cartTotal,
      cartTotal,
      addressBilling.id,
      addressShipping.id,
      0
    );

    const order_content = cart?.cart_content.map((content) => {
      const sizeTab = [];
      const flockingTab = [];

      for (let i = 0; i < content.quantity; i++) {
        sizeTab.push(content.size[i].size);
        flockingTab.push(content.flocking[i].value);
      }
      return {
        quantity: content.quantity,
        product_id: content.product.id,
        order_id: order.id,
        size: sizeTab,
        flocking: flockingTab,
      };
    });

    order_content.forEach(async (content) => {
      await axios
        .post("http://localhost:5000/shop/order/content/" + order.id, {
          product_id: content.product_id,
          quantity: content.quantity,
          size: content.size,
          flocking: content.flocking,
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
        if (cart && cart.cart_content && cart.cart_content.length > 0) {
          cart?.cart_content.forEach((content) => {
            total += content.product.basePrice * content.quantity;
          });
        } else {
          total = 0;
        }
        setCartTotal(Number(Number(total).toFixed(2)));
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
          amount: Number(cartTotal * 100).toFixed(0),
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

    if (cart && cart.cart_content && cart.cart_content.length > 0) {
      cart?.cart_content.forEach((content) => {
        total += content.product.basePrice * content.quantity;
      });
    } else {
      total = 0;
    }

    setCartTotal(Number(Number(total).toFixed(2)));
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
                    <div>
                      <div className="cart-product" key={index}>
                        {content.quantity > 1 && unfoldedCart !== index && (
                          <div
                            className="cart-unfold"
                            onClick={() => setUnfoldedCart(index)}
                          >
                            <ArrowDropDownCircleIcon
                              style={{ fontSize: "3.5rem" }}
                            />
                          </div>
                        )}
                        {content.quantity > 1 && unfoldedCart === index && (
                          <div
                            className="cart-unfold"
                            onClick={() => setUnfoldedCart(-1)}
                          >
                            <ArrowDropUpIcon style={{ fontSize: "3.5rem" }} />
                          </div>
                        )}
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

                        {content.quantity <= 1 && content.product.sizable && (
                          <div className="cart-size">
                            <select
                              className="cart-product-select"
                              value={content.size[0].size}
                              onChange={(e) =>
                                handleSizeChange(content, index, e.target.value)
                              }
                            >
                              {Object.values(stock_size).map((size, index) => (
                                <option key={index} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {content.quantity <= 1 &&
                          content.product.flockingable && (
                            <div className="cart-flocking">
                              <input
                                onChange={(e) =>
                                  handleFlockingChange(
                                    content,
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder="Floquage"
                                value={content.flocking[0].value}
                              ></input>
                            </div>
                          )}
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
                          {Number(
                            content.product.basePrice * content.quantity
                          ).toFixed(2)}
                          €
                        </div>
                      </div>
                      {content.quantity > 1 && (
                        <div
                          className="cart-product-unfold"
                          style={{
                            display: unfoldedCart === index ? "flex" : "none",
                          }}
                        >
                          {Array.from({ length: content.quantity }, (_, i) => (
                            <div className="cart-product" key={i}>
                              <div className="cart-product-img">
                                <img
                                  src={
                                    "http://localhost:5000/uploads/product/" +
                                    content.product.img
                                  }
                                  alt={content.product.img}
                                ></img>
                              </div>
                              {content.size !== null && (
                                <div className="cart-size">
                                  <select
                                    className="cart-product-select"
                                    value={content.size[i].size}
                                    onChange={(e) =>
                                      handleSizeChange(
                                        content,
                                        i,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {Object.values(stock_size).map(
                                      (size, index) => (
                                        <option key={index} value={size}>
                                          {size}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                              )}
                              {content.flocking !== null && (
                                <div className="cart-flocking">
                                  <input
                                    onChange={(e) =>
                                      handleFlockingChange(
                                        content,
                                        i,
                                        e.target.value
                                      )
                                    }
                                    placeholder="Floquage"
                                    value={content.flocking[i].value}
                                  ></input>
                                </div>
                              )}

                              <div>
                                {Number(content.product.basePrice).toFixed(2)} €
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                {cart &&
                  cart.cart_content &&
                  cart.cart_content.length === 0 && (
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
                            onClick={() => setShowAddressList(true)}
                            className="btn"
                          >
                            Passer la commande
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          disabled={user.fidelity_points < cartTotal * 10}
                          onClick={() => {
                            setIsPointPay(true);
                            setShowAddressList(true);
                          }}
                          className="btn"
                          title={
                            user.fidelity_points < cartTotal * 10
                              ? "Vous n'avez pas assez de points pour payer cette commande ( " +
                                (cartTotal * 10 - user.fidelity_points) +
                                " points manquants )"
                              : ""
                          }
                        >
                          Payer avec {cartTotal * 10} points <StarsIcon />
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

                <Dialog
                  fullScreen={fullScreen}
                  open={showAddressList}
                  onClose={() => setShowAddressList(false)}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                    {"Choisir une adresse de facturation et de livraison"}
                  </DialogTitle>
                  <DialogContent>
                    <div>
                      <div>
                        {user.address && user.address.length > 0 ? (
                          <div>
                            <select
                              onChange={(e) =>
                                handleChangeShipping(Number(e.target.value))
                              }
                              className="cart-product-select"
                            >
                              <option value={0}>
                                Choisir une adresse de livraison
                              </option>
                              {user.address.map((address, index) => (
                                <option key={index} value={address.id}>
                                  {address.title} - {address.address} -{" "}
                                  {address.city} - {address.zipcode}
                                </option>
                              ))}
                            </select>
                            <select
                              onChange={(e) =>
                                handleChangeBilling(Number(e.target.value))
                              }
                              className="cart-product-select"
                            >
                              <option value={0}>
                                Choisir une adresse de facturation
                              </option>
                              {user.address.map((address, index) => (
                                <option key={index} value={address.id}>
                                  {address.title} - {address.address} -{" "}
                                  {address.city} - {address.zipcode}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <p>Vous n'avez pas d'adresse enregistrée</p>
                        )}

                        <div className="cart-address-add-list">
                          {addressShipping === null && (
                            <div className="cart-address_add">
                              <div>
                                <p>Adresse de livraison</p>
                                <div className="cart-address_add_form">
                                  <input
                                    name="title"
                                    placeholder="Nom de l'addresse"
                                  ></input>
                                  <input
                                    name="address"
                                    placeholder="Adresse"
                                  ></input>
                                  <input
                                    name="city"
                                    placeholder="Ville"
                                  ></input>
                                  <input
                                    name="zipcode"
                                    placeholder="Code postal"
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                          {addressBilling === null && (
                            <div className="cart-address_add">
                              <div>
                                <p>Adresse de facturation</p>
                                <div className="cart-address_add_form">
                                  <input
                                    name="title2"
                                    placeholder="Nom de l'addresse"
                                  ></input>
                                  <input
                                    name="address2"
                                    placeholder="Adresse"
                                  ></input>
                                  <input
                                    name="city2"
                                    placeholder="Ville"
                                  ></input>
                                  <input
                                    name="zipcode2"
                                    placeholder="Code postal"
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          createAddress(isPointPay);
                        }}
                        className="btn btn-full"
                      >
                        Valider
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
export default Cart;
