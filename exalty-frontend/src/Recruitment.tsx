import { useEffect, useState } from "react";
import "./Recruitment.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import {
  recruitement_sub_category,
  recruitement_category,
  recruitement,
  DialogMsg,
} from "./Models";
import axios from "axios";

function Recruitment() {
  const [show, setShow] = useState<recruitement_category>();
  const [showSub, setShowSub] = useState<recruitement_sub_category | null>();
  const [categories, setCategories] = useState<recruitement_category[]>();
  const [sub_categories, setSubCategories] =
    useState<recruitement_sub_category[]>();
  const [recruitements, setRecruitements] = useState<recruitement[]>();
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );
  const [dialogOuvert, setDialogOuvert] = useState(false);

  const getCategories = async () => {
    const response = await axios.get(
      "http://localhost:5000/recruitment/category"
    );
    return response.data as recruitement_category[];
  };

  const getSubCategories = async (categorie: number) => {
    const response = await axios.get(
      "http://localhost:5000/recruitment/category/" +
        categorie +
        "/sub-category"
    );
    return response.data as recruitement_sub_category[];
  };

  const getRecruitements = async () => {
    const response = await axios.get("http://localhost:5000/recruitment/");
    return response.data as recruitement[];
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = categories?.find(
      (category) => category.id.toString() === event.target.value
    );
    setShow(value);
  };

  const handleChangeSub = (id: number) => {
    const value = sub_categories?.find((sub) => sub.id === id);
    if (value?.id !== showSub?.id) setShowSub(value);
    else setShowSub(null);
  };

  const handleInfoClick = (id: number) => {
    const recrutement = recruitements?.find(
      (recrutement) => recrutement.id === id
    );
    if (recrutement) {
      setDialogOuvert(true);
      const dialog = new DialogMsg(
        recrutement.title,
        recrutement.description,
        false,
        () => setDialogOuvert(false)
      );
      setDialogInstance(dialog);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      if (Array.isArray(categories)) {
        setCategories(categories);
        setShow(categories[0]);
        const sub_categories = await getSubCategories(categories[0].id);
        if (Array.isArray(sub_categories)) {
          setSubCategories(sub_categories);
          setShowSub(sub_categories[0]);
          const recruitements = await getRecruitements();
          if (Array.isArray(recruitements)) {
            setRecruitements(recruitements);
          } else {
            console.error(
              "Expected an array of recruitements, but got:",
              recruitements
            );
          }
        } else {
          console.error(
            "Expected an array of sub_categories, but got:",
            sub_categories
          );
        }
      } else {
        console.error("Expected an array of categories, but got:", categories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <TopBar />
      <div
        className="Recruitment"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="recruitment-content">
          <div className="title">Trouvez votre place !</div>
          <div className="title-desc">
            Voici les postes disponibles pour vous
          </div>
          <div className="categories-selector">
            <select
              onChange={handleChange}
              className="categories-selector-select"
            >
              {categories?.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="sub-categories-selector">
            <div className="sub-categories-selector-select">
              {sub_categories?.map((sub_category) => (
                <div
                  onClick={() => handleChangeSub(sub_category.id)}
                  className={showSub?.id === sub_category.id ? "active" : ""}
                >
                  {sub_category.name}
                </div>
              ))}
            </div>
          </div>

          <div
            className="categorie-list"
            style={{ display: show !== null ? "flex" : "none" }}
          >
            {sub_categories
              ?.filter((sub_category) => sub_category.id === showSub?.id)

              .map((sub_category) => (
                <div className="categorie">
                  <div className="categorie-title">{sub_category.name}</div>
                  <div className="functions">
                    {recruitements
                      ?.filter(
                        (recruitement) =>
                          recruitement.recruitement_sub_categoryId ===
                          sub_category.id
                      )
                      .map((recruitement) => (
                        <div className="card-r">
                          <div className="recruit-title">
                            {recruitement.title}
                          </div>
                          <button
                            onClick={() => handleInfoClick(recruitement.id)}
                            className="btnInfo"
                          >
                            EN SAVOIR PLUS
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div
            className="categorie-list"
            style={{ display: showSub !== null ? "none" : "flex" }}
          >
            {sub_categories?.map((sub_category) => (
              <div className="categorie">
                <div className="categorie-title">{sub_category.name}</div>
                <div className="functions">
                  {recruitements
                    ?.filter(
                      (recruitement) =>
                        recruitement.recruitement_sub_categoryId ===
                        sub_category.id
                    )
                    .map((recruitement) => (
                      <div className="card-r">
                        <div className="recruit-title">
                          {recruitement.title}
                        </div>
                        <button
                          onClick={() => handleInfoClick(recruitement.id)}
                          className="btnInfo"
                        >
                          EN SAVOIR PLUS
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="categorie-list"
            style={{ display: show === null ? "none" : "flex" }}
          ></div>
        </div>
      </div>

      {dialogOuvert && DialogMsg.openDialog(dialogInstance)}
    </>
  );
}

export default Recruitment;
