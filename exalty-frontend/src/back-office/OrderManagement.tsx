import { useEffect, useState } from "react";
import {
  DialogMsg,
  order,
  order_payment_status,
  order_status,
} from "../Models";
import axios from "axios";
import BasicManagement from "./BasicManagement";
import DownloadIcon from "@mui/icons-material/Download";
import { CircularProgress } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as XLSX from "xlsx";
function OrderManagement() {
  const [orders, setOrders] = useState<order[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [unfoldedOrder, setUnfoldedOrder] = useState<number>(-1);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );
  const getOrders = async () => {
    const response = await axios.get("http://localhost:5000/shop/order");
    return response.data as order[];
  };
  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const orderSheet = XLSX.utils.json_to_sheet(orders);

    XLSX.utils.book_append_sheet(workbook, orderSheet, "Commandes");

    XLSX.writeFile(
      workbook,
      `Liste-des-Commandes-${new Date().toLocaleDateString()}.xlsx`
    );
  };
  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrders();
      if (Array.isArray(order)) {
        setOrders(order);
      } else {
        console.error("Expected an array of order, but got:", order);
      }
    };

    fetchOrder();
  }, []);

  return (
    <BasicManagement
      className={"OrderManagement"}
      title={"Gestion des commandes"}
      content={
        <div>
          <div className="object-fct">
            <button
              className="btn-excel"
              onClick={() => {
                extractToExcell();
              }}
            >
              <div>Extraire vers Excel </div>
              <DownloadIcon />
            </button>
          </div>
          <table className="basic-table">
            <thead>
              <tr>
                <th></th>
                <th>Numéro de commande</th>
                <th>Status Paiement</th>
                <th>Status Commande</th>
                <th>Total (TTC)</th>
                <th>Total (HT)</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => !order.deleted)
                .map((order) => (
                  <>
                    <tr key={order.id}>
                      {unfoldedOrder !== order.id ? (
                        <td onClick={() => setUnfoldedOrder(order.id)}>
                          <ArrowDropDownCircleIcon
                            style={{ fontSize: "3.5rem" }}
                          />
                        </td>
                      ) : (
                        <td onClick={() => setUnfoldedOrder(-1)}>
                          <ArrowDropUpIcon style={{ fontSize: "3.5rem" }} />
                        </td>
                      )}

                      <td>{order.id}</td>
                      <td>
                        <select
                          onChange={(e) => {
                            setOrders(
                              orders.map((g) => {
                                if (g.id === order.id) {
                                  return {
                                    ...g,
                                    payment_status: e.target
                                      .value as order_payment_status,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                          value={order.payment_status}
                        >
                          {Object.entries(order_payment_status).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td>
                        <select
                          onChange={(e) => {
                            setOrders(
                              orders.map((g) => {
                                if (g.id === order.id) {
                                  return {
                                    ...g,
                                    status: e.target.value as order_status,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                          value={order.status}
                        >
                          {Object.entries(order_status).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{Number(order.price_ttc).toFixed(2)} €</td>
                      <td>{Number(order.price_ht).toFixed(2)} €</td>
                      <td>
                        <RemoveIcon
                          className="order-delete"
                          onClick={async () => {
                            order.deleted = true;
                            setOrders(
                              orders.map((g) => {
                                if (g.id === order.id) {
                                  return {
                                    ...g,
                                    deleted: true,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></RemoveIcon>
                      </td>
                    </tr>
                    {unfoldedOrder === order.id && (
                      <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Taille</th>
                        <th>Flocage</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th></th>
                      </tr>
                    )}
                    {unfoldedOrder === order.id &&
                      order.order_content.map((content, index) => (
                        <>
                          {content.quantity === 1 && (
                            <tr key={content.id}>
                              <td></td>
                              <td>
                                <img
                                  src={
                                    "http://localhost:5000/uploads/product/" +
                                    content.product.img
                                  }
                                  alt={content.product.img}
                                ></img>
                              </td>
                              <td>{content.product.name}</td>
                              <td>{content.size[0].size}</td>
                              <td>{content.flocking[0].value}</td>
                              <td>{content.quantity}</td>
                              <td>
                                {Number(content.product.basePrice).toFixed(2)} €
                              </td>
                              <td></td>
                            </tr>
                          )}

                          {content.quantity > 1 && (
                            <>
                              {Array.from(Array(content.quantity)).map(
                                (_, i) => (
                                  <tr key={content.id + "-" + i}>
                                    <td></td>
                                    <td>
                                      <img
                                        src={
                                          "http://localhost:5000/uploads/product/" +
                                          content.product.img
                                        }
                                        alt={content.product.img}
                                      ></img>
                                    </td>
                                    <td>{content.product.name}</td>
                                    <td>{content.size[i].size}</td>
                                    <td>{content.flocking[i].value}</td>
                                    <td>1</td>
                                    <td>
                                      {Number(
                                        content.product.basePrice
                                      ).toFixed(2)}{" "}
                                      €
                                    </td>
                                    <td></td>
                                  </tr>
                                )
                              )}
                            </>
                          )}
                        </>
                      ))}
                  </>
                ))}
            </tbody>
          </table>
          {loading ? (
            <CircularProgress className="progress-bar" />
          ) : (
            <button
              className="btn btn-full"
              disabled={!isModified}
              onClick={async () => {
                setLoading(true);

                const updatePromises = orders.map((order) =>
                  axios.put("http://localhost:5000/shop/order/" + order.id, {
                    status: order.status as order_status,
                    payment_status:
                      order.payment_status as order_payment_status,
                  })
                );

                await Promise.all(updatePromises);
                const dialog = new DialogMsg(
                  "Succès",
                  "Les modifications ont été sauvegardées",
                  false,
                  () => setDialogOuvert(false)
                );
                setDialogInstance(dialog);
                setDialogOuvert(true);
                setLoading(false);
              }}
            >
              Sauvegarder les modifications
            </button>
          )}
          {dialogOuvert && DialogMsg.openDialog(dialogInstance)}
        </div>
      }
    />
  );
}

export default OrderManagement;
