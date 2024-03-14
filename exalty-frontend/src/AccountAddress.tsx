import axios from "axios";
import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
import { address } from "./Models";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./AccountAddress.css";
function AccountAddress() {
  const [address, setAddress] = useState<address[]>([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const getAddress = async () => {
    const response = await axios
      .get("http://localhost:5000/shop/address/user/" + user.id)
      .catch((err) => {
        console.error("Error fetching address:", err);
        return { data: [] };
      });
    return response.data as address[];
  };

  const createAddress = async () => {
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
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newAddress = {
      address,
      city,
      zipcode,
      title,
      user_id: user.id,
    };

    const response = await axios
      .post("http://localhost:5000/shop/address", newAddress)
      .catch((err) => {
        console.error("Error creating address:", err);
        return { data: [] };
      });
    return response.data as address;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    const fetchAddress = async () => {
      const addressFromServer = await getAddress();
      setAddress(addressFromServer);
    };
    fetchAddress();
  }, []);

  return (
    <BasicComponent
      className="AccountAddress"
      title="Vos Adresses"
      desc="Modifier ou ajouter des adresses"
      content={
        <>
          <div className="address_list">
            {address.map((address) => (
              <div key={address.id} className="address">
                <div>
                  <p>{address.title}</p>
                  <p>{address.address}</p>
                  <p>{address.city}</p>
                  <p>{address.zipcode}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="address_add">
            <div>
              <p>Ajouter une nouvelle adresse</p>
              <form className="address_add_form">
                <input name="title" placeholder="Nom de l'addresse"></input>
                <input name="address" placeholder="Adresse"></input>
                <input name="city" placeholder="Ville"></input>
                <input name="zipcode" placeholder="Code postal"></input>

                <button className="btn" onClick={() => createAddress()}>
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </>
      }
    />
  );
}

export default AccountAddress;
