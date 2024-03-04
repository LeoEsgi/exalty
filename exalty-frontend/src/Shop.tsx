import { SetStateAction, useEffect, useState } from "react";
import "./Shop.css";
import jerseyFront from "./asset/shop/shirt_1.png";
import jerseyBack from "./asset/shop/shirt_2.png";
import BasicComponent from "./BasicComponent";
import { product } from "./Models";
import axios from "axios";

function Shop() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState<product[]>([]);

  const getProducts = async () => {
    const response = await axios
      .get("http://localhost:5000/product/")
      .catch((err) => {
        console.error("Error fetching products:", err);
        return { data: [] };
      });
    return response.data as product[];
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
      } else {
        console.error("Expected an array of products, but got:", products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <BasicComponent
      className="Shop"
      title="Boutique"
      desc="Decouvrez les nouvelles couleurs d'Exalty"
      content={
        <>
          {products.map((product, index) => (
            <div className="jersey" key={index}>
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
                <div className="jersey-price">{product.basePrice} €</div>
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
                    onClick={() => alert("Ajouté au panier")}
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
