import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { order } from "./Models";
import "./AccountOrder.css";
function AccountOrder() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<order[]>([] as order[]);
  const getOrder = async () => {
    const response = await axios
      .get("http://localhost:5000/shop/order/user/" + user.id)
      .catch((err) => {
        console.error("Error fetching address:", err);
        return { data: [] };
      });
    return response.data as order[];
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    const fetchAddress = async () => {
      const orderFromServer = await getOrder();
      setOrder(orderFromServer);
      console.log(orderFromServer);
    };
    fetchAddress();
  }, []);
  return (
    <BasicComponent
      className="AccountOrder"
      title="Vos Commandes"
      desc="Suivre, retourner ou acheter à nouveau"
      content={
        <>
          <div className="AccountOrder">
            {order.map((order) => (
              <div key={order.id} className="order">
                <div className="order-header">
                  <div className="order-date">
                    Commande effectue le{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div className="order-price">Total {order.price_ttc} €</div>
                  <div className="order-address">
                    Livraison a {order.shipping_address_id}
                  </div>
                  <div className="order-id">Commande n° {order.id}</div>
                </div>
                <div className="order-content">
                  {order.order_content.map((content) => (
                    <div key={content.id} className="order-product">
                      <div className="order-status">
                        {order.status} :{" "}
                        {new Date(order.updated_at).toLocaleString()}
                      </div>

                      <div className="order-product-img">
                        <img
                          src={
                            "http://localhost:5000/uploads/product/" +
                            content.product.img
                          }
                          alt={content.product.img}
                        ></img>{" "}
                      </div>
                      <div className="order-product-name">
                        {content.product.name}
                      </div>
                      <div className="order-product-quantity">
                        Quantité : {content.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-footer-button">Acheter à nouveau</div>
                  <div className="order-footer-button">Retourner</div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

export default AccountOrder;
