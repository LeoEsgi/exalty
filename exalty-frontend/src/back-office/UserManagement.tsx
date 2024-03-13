import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import { DialogMsg, user } from "../Models";
import { CircularProgress } from "@mui/material";
import "./UserManagement.css";
import axios from "axios";

import RemoveIcon from "@mui/icons-material/Remove";
import DownloadIcon from "@mui/icons-material/Download";
import * as XLSX from "xlsx";

function UserManagement() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const usersSheet = XLSX.utils.json_to_sheet(users);

    XLSX.utils.book_append_sheet(workbook, usersSheet, "Utilisateurs");

    XLSX.writeFile(
      workbook,
      `Liste-des-Utilisateurs-${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/user/");
    return response.data as user[];
  };

  useEffect(() => {
    const fetchGames = async () => {
      const users = await getUsers();
      if (Array.isArray(users)) {
        setUsers(users);
      } else {
        console.error("Expected an array of games, but got:", users);
      }
    };

    fetchGames();
  }, []);

  return (
    <BasicManagement
      className={"UserManagement"}
      title={"Gestion des utilisateurs"}
      content={
        <div className="object-editor">
          <div className="object-edit">
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
                  <th>pseudo</th>
                  <th>prénom</th>
                  <th>nom</th>
                  <th>email</th>
                  <th>discord tag</th>
                  <th>role</th>
                  <th>actif</th>
                  <th>supprimer</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => !user.deleted)
                  .map((user, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={user.pseudo}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].pseudo = e.target.value;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={user.first_name}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].first_name = e.target.value;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={user.last_name}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].last_name = e.target.value;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          value={user.email}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].email = e.target.value;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={user.discord_tag}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].discord_tag = e.target.value;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          value={user.role_id}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].role_id = parseInt(e.target.value);
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={user.active}
                          onChange={(e) => {
                            const newUsers = [...users];
                            newUsers[index].active = e.target.checked;
                            setUsers(newUsers);
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td className="delete-icon">
                        <RemoveIcon
                          onClick={async () => {
                            user.deleted = true;
                            setUsers(
                              users.map((g) => {
                                if (g.id === user.id) {
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
                  const updatePromises = users.map((user: user) =>
                    axios.put("http://localhost:5000/user/" + user.id, user)
                  );

                  await Promise.all(updatePromises);

                  setLoading(false);

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

export default UserManagement;
