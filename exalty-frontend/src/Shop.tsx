import { SetStateAction, useEffect, useRef, useState } from "react";
import "./Shop.css";
import BasicComponent from "./BasicComponent";
import { product, cart, cart_content, cart_line_size } from "./Models";
import axios from "axios";
import React from "react";
import { useAuth } from "./AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Shop() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState<product[]>([]);
  const productRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const [productFocus, setProductFocus] = useState<product>();
  const { isAuthenticated, user, setCart } = useAuth();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const getProducts = async () => {
    const response = await axios
      .get("http://localhost:5000/product/")
      .catch((err) => {
        console.error("Error fetching products:", err);
        return { data: [] };
      });
    return response.data as product[];
  };

  const addItemToCart = async (product: product) => {
    if (!isAuthenticated) {
      alert("Vous devez vous connecter pour ajouter un produit au panier");
      return;
    }

    const quantity = document.querySelector<HTMLInputElement>(
      "input[name='quantity']"
    )?.value;

    const size = document.querySelector<HTMLSelectElement>(
      "select[name='size']"
    )?.value;

    if (!quantity || !size) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const content = {
      product: product,
      quantity: parseInt(quantity),
      size: size as cart_line_size,
    };

    const response = await axios
      .post("http://localhost:5000/shop/cart/" + user.id, {
        content,
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        return { data: [] };
      });
    setOpen(true);
    const cart = response.data as cart;
    setCart(cart);
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (Array.isArray(products) && products.length > 0) {
        setProducts(products);
        productRefs.current = products.map(
          (_, i) => productRefs.current[i] || React.createRef()
        );
      } else {
        console.error("Expected an array of products, but got:", products);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (index: number) => {
    if (productRefs.current[index] && productRefs.current[index].current) {
      setProductFocus(products[index]);
      setTimeout(() => {
        productRefs.current[index].current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }, 600);
    }
  };
  return (
    <BasicComponent
      className="Shop"
      title="Boutique"
      desc="Decouvrez les nouvelles couleurs d'Exalty"
      content={
        <>
          <div className="item-list-product">
            {products.map((product, index) => (
              <div
                ref={productRefs.current[index]}
                className="item-product"
                key={index}
                onClick={() => handleClick(index)}
              >
                <img
                  src={"http://localhost:5000/uploads/product/" + product.img}
                  alt={product.img}
                ></img>
                <div className="product-pres-title">{product.name}</div>
              </div>
            ))}
          </div>
          {products.map((product, index) => (
            <div
              tabIndex={-1}
              ref={productRefs.current[index]}
              className="jersey"
              key={index}
              style={{ display: productFocus === product ? "flex" : "none" }}
            >
              <div>
                <div className="jersey-name">{product.name}</div>
                <img
                  src={"http://localhost:5000/uploads/product/" + product.img}
                  alt={product.img}
                ></img>
                {product.img2 && (
                  <img
                    src={
                      "http://localhost:5000/uploads/product/" + product.img2
                    }
                    alt={product.img2}
                  ></img>
                )}
              </div>
              <div className="jersey-infos">
                <div className="jersey-price">
                  {Number(product.basePrice).toFixed(2)} €
                </div>
                <div className="jersey-custom">
                  {product.sizable && (
                    <div className="jersey-size">
                      Taille du maillot
                      <select name="size" value={size} onChange={handleChange}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                  )}
                  {product.flockingable && (
                    <div className="jersey-tag">
                      Flocage <input placeholder="Pseudo"></input>
                    </div>
                  )}
                  <div className="jersey-quantity">
                    Quantité
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                    ></input>
                  </div>
                </div>

                <div className="jersey-add">
                  <button
                    className="btn"
                    onClick={() => addItemToCart(product)}
                  >
                    AJOUTER AU PANIER
                  </button>
                </div>
              </div>
              <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Produit ajouté au panier !"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Vous pouvez maintenant continuer vos achats ou voir votre
                    panier.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={() => setOpen(false)}>
                    Fermer
                  </Button>
                  <Button
                    autoFocus
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Voir Panier
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ))}
        </>
      }
    />
  );
}

export default Shop;
