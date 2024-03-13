import { SetStateAction, useEffect, useRef, useState } from "react";
import "./Shop.css";
import BasicComponent from "./BasicComponent";
import { product } from "./Models";
import axios from "axios";
import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

function Shop() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState<product[]>([]);
  const productRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const [productFocus, setProductFocus] = useState<product>();
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
    localStorage.setItem("cart", JSON.stringify(product));
    alert("Ajouté au panier");
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
                      <select value={size} onChange={handleChange}>
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
            </div>
          ))}
        </>
      }
    />
  );
}

export default Shop;
