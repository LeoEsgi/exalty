import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { address } from "./Models";
export const CheckoutForm = ({ onPaymentSuccess = () => {} }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = useState<address[]>([]);
  const getAddress = async () => {
    const response = await axios
      .get("http://localhost:5000/shop/address/user/" + user.id)
      .catch((err) => {
        console.error("Error fetching address:", err);
        return { data: [] };
      });
    return response.data as address[];
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;
    const elm = elements.getElement(PaymentElement);
    if (elm !== null) {
      await stripe
        .confirmPayment({
          elements: elements,
          confirmParams: {
            return_url: "http://localhost:3000/cart",
          },
          redirect: "if_required",
        })
        .finally(() => {
          setLoading(false);
        })
        .then((result) => {
          if (result?.error) {
            console.error("Error confirming payment:", result.error);
          } else {
            onPaymentSuccess();
          }
        })
        .catch((err) => {
          console.error("Error confirming payment:", err);
        });
    }
  };
  useEffect(() => {
    const fetchAddress = async () => {
      const addressFromServer = await getAddress();
      setAddress(addressFromServer);
    };
    fetchAddress();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <div style={{ textAlign: "center" }}>
        {loading ? (
          <CircularProgress className="progress-bar" />
        ) : (
          <button type="submit" className="btn btn-full" disabled={!stripe}>
            Payer
          </button>
        )}
      </div>
    </form>
  );
};
