import { useEffect, useState } from "react";
import { DialogMsg, product } from "../Models";
import BasicManagement from "./BasicManagement";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import * as XLSX from "xlsx";
import { CircularProgress } from "@mui/material";
import { handleUpload, imageUpload } from "../ImageUpload";
import "./ShopManagement.css";
import RemoveIcon from "@mui/icons-material/Remove";

function ShopManagement() {
  const [products, setProducts] = useState<product[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const handleImgProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "gameImage-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setProducts(
            products.map((product) => {
              if (product.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...product,
                  img: imgDataUrl,
                  new_img: event.target.files![0],
                };
              }
              return product;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const handleImg2ProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "gameImage2-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setProducts(
            products.map((product) => {
              if (product.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...product,
                  img2: imgDataUrl,
                  new_img2: event.target.files![0],
                };
              }
              return product;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const getProducts = async () => {
    const response = await axios
      .get("http://localhost:5000/product/")
      .catch((err) => {
        console.error("Error fetching products:", err);
        return { data: [] };
      });
    return response.data as product[];
  };

  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const sponsorSheet = XLSX.utils.json_to_sheet(products);

    XLSX.utils.book_append_sheet(workbook, sponsorSheet, "Products");

    XLSX.writeFile(
      workbook,
      `Liste-des-Produits-${new Date().toLocaleDateString()}.xlsx`
    );
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
    <BasicManagement
      className={"ShopManagement"}
      title={"Gestion de la boutique"}
      content={
        <div className="object-editor">
          <div className="object-edit">
            <div className="object-fct">
              <button
                className="btn"
                onClick={() => {
                  setProducts([
                    new product(
                      0,
                      false,
                      "Description du produit",
                      "Nom du produit",
                      false,
                      "image",
                      0,
                      "image2",
                      new Date(),
                      new Date(),
                      null,
                      null,
                      null,
                      []
                    ),
                    ...products,
                  ]);
                  setIsModified(true);
                }}
              >
                Ajouter <AddIcon className="add-icon"></AddIcon>
              </button>

              <button
                className="btn"
                onClick={() => {
                  extractToExcell();
                }}
              >
                Extraire vers Excel
              </button>
            </div>
            <div className="object-list">
              <div className="object-fields">
                <label className="column-name">Nom</label>
                <label className="column-desc">Description</label>
                <label className="column-flockingable">flockage</label>
                <label className="column-sizable">dimension</label>
                <label className="column-basePrice">prix</label>
                <label className="column-img">img</label>
                <label className="column-img2">img2</label>
                <label className="column-delete">delete</label>
              </div>
              {products
                .filter((product) => !product.deleted)
                .map((product, index) => {
                  return (
                    <div className="object" key={index}>
                      <div className="object-field field-name">
                        <input
                          value={product.name}
                          onChange={(event) => {
                            setProducts(
                              products.map((g) => {
                                if (g.id === product.id) {
                                  return { ...g, name: event.target.value };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <div className="object-field field-desc">
                        <textarea
                          value={product.description}
                          onChange={(event) => {
                            setProducts(
                              products.map((g) => {
                                if (g.id === product.id) {
                                  return {
                                    ...g,
                                    description: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <div className="object-field field-flockingable">
                        <input
                          type="checkbox"
                          checked={product.flockingable}
                          onChange={(event) => {
                            setProducts(
                              products.map((g) => {
                                if (g.id === product.id) {
                                  return {
                                    ...g,
                                    flockingable: event.target.checked,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <div className="object-field field-sizable">
                        <input
                          type="checkbox"
                          checked={product.sizable}
                          onChange={(event) => {
                            setProducts(
                              products.map((g) => {
                                if (g.id === product.id) {
                                  return {
                                    ...g,
                                    sizable: event.target.checked,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <div className="object-field field-basePrice">
                        <input
                          type="number"
                          value={product.basePrice}
                          onChange={(event) => {
                            setProducts(
                              products.map((g) => {
                                if (g.id === product.id) {
                                  return {
                                    ...g,
                                    basePrice: +event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id={"img-upload-change-" + product.id}
                        style={{ display: "none" }}
                        onChange={handleImgProductChange}
                      />
                      <div className="object-field field-img">
                        <img
                          src={
                            product.new_img
                              ? product.img
                              : "http://localhost:5000/uploads/product/" +
                                product.img
                          }
                          alt={product.name}
                          id={"gameImage-" + product.id}
                          onClick={() => {
                            const input = document.getElementById(
                              "img-upload-change-" + product.id
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id={"img2-upload-change-" + product.id}
                        style={{ display: "none" }}
                        onChange={handleImg2ProductChange}
                      />
                      <div className="object-field field-img2">
                        <img
                          src={
                            product.new_img2
                              ? product.img2
                              : "http://localhost:5000/uploads/product/" +
                                product.img2
                          }
                          alt={product.name}
                          id={"gameImage2-" + product.id}
                          onClick={() => {
                            const input = document.getElementById(
                              "img2-upload-change-" + product.id
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        />
                      </div>

                      <RemoveIcon
                        onClick={async () => {
                          product.deleted = true;
                          setProducts(
                            products.map((g) => {
                              if (g.id === product.id) {
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
                    </div>
                  );
                })}
            </div>
            {loading ? (
              <CircularProgress className="progress-bar" />
            ) : (
              <button
                className="btn btn-full"
                disabled={!isModified}
                onClick={async () => {
                  setLoading(true);
                  const promises = products.map(async (product) => {
                    if (product.new_img) {
                      const uploadedFile = await handleUpload(
                        new imageUpload(
                          product.new_img,
                          product.name + ".png",
                          "product"
                        )
                      );
                      if (uploadedFile) {
                        if (product.new_img2) {
                          const uploadedFile2 = await handleUpload(
                            new imageUpload(
                              product.new_img2,
                              product.name + ".png",
                              "product"
                            )
                          );

                          if (uploadedFile2) {
                            return {
                              ...product,
                              img: uploadedFile.fileName,
                              img2: uploadedFile2.fileName,
                            };
                          }
                        }

                        return {
                          ...product,
                          img: uploadedFile.fileName,
                        };
                      }
                    }

                    return product;
                  });

                  const newProducts = await Promise.all(promises);

                  const updatePromises = newProducts.map((product) =>
                    axios.put(
                      "http://localhost:5000/product/" + product.id,
                      product
                    )
                  );

                  await Promise.all(updatePromises);

                  setLoading(false);
                  setIsModified(false);
                  const dialog = new DialogMsg(
                    "Succès",
                    "Les modifications ont été sauvegardées",
                    false,
                    () => setDialogOuvert(false)
                  );
                  setDialogInstance(dialog);
                  setDialogOuvert(true);
                }}
              >
                Sauvegarder les modifications
              </button>
            )}
            {dialogOuvert && DialogMsg.openDialog(dialogInstance)}
          </div>
        </div>
      }
    />
  );
}

export default ShopManagement;
