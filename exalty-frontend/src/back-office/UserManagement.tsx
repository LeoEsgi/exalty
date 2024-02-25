import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import { DialogMsg, user } from "../Models";
import { CircularProgress } from "@mui/material";
import "./UserManagement.css";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

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
            <div className="object-list">
              <div className="object-fields">
                <label className="column-pseudo">pseudo</label>
                <label className="column-firstname">prénom</label>
                <label className="column-lastname">nom</label>
                <label className="column-email">email</label>
                <label className="column-discord">discord tag</label>
                <label className="column-lastco">dernière connection</label>
                <label className="column-created">créé le</label>
                <label className="column-updated">mis à jour le</label>
                <label className="column-role">role</label>
                <label className="column-active">actif</label>
              </div>
              {users.map((user, index) => {
                return (
                  <div className="object" key={index}>
                    <div className="object-field field-pseudo">
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
                    </div>
                    <div className="object-field field-firstname">
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
                    </div>
                    <div className="object-field field-lastname">
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
                    </div>

                    <div className="object-field field-email">
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
                    </div>
                    <div className="object-field field-discord">
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
                    </div>

                    <div className="object-field field-lastco">
                      <input
                        type="text"
                        value={new Date(user.last_connection).toLocaleString()}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index].last_connection = new Date(
                            e.target.value
                          );
                          setUsers(newUsers);
                          setIsModified(true);
                        }}
                      />
                    </div>
                    <div className="object-field field-created">
                      <input
                        type="text"
                        value={new Date(user.created_at).toLocaleString()}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index].created_at = new Date(e.target.value);
                          setUsers(newUsers);
                          setIsModified(true);
                        }}
                      />
                    </div>
                    <div className="object-field field-updated">
                      <input
                        type="text"
                        value={new Date(user.updated_at).toLocaleString()}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index].updated_at = new Date(e.target.value);
                          setUsers(newUsers);
                          setIsModified(true);
                        }}
                      />
                    </div>

                    <div className="object-field field-role">
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
                    </div>
                    <div className="object-field field-active">
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
                    </div>
                    <div className="object-field">{/* delete account */}</div>
                  </div>
                );
              })}
            </div>
            {loading ? (
              <CircularProgress className="progress-bar" />
            ) : (
              <button
                className="btn"
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
