import React, { useEffect, useState } from "react";
import axios from "axios";
import BasicManagement from "./BasicManagement";
import "./NewsLetter.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { membership, user, user_membership } from "../Models";

export default function NewsLetter() {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState<user[]>([]);
  const [memberShips, setMemberShips] = useState<membership[]>([]);
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
  const [emailList, setEmailList] = useState("");

  const getUsers = async () => {
    const response = await axios
      .get("http://localhost:5000/user/")
      .catch((err) => {
        console.error("Error fetching users:", err);
        return { data: [] };
      });
    return response.data;
  };

  const getMemberShips = async () => {
    const response = await axios
      .get("http://localhost:5000/membership/")
      .catch((err) => {
        console.error("Error fetching matches:", err);
        return { data: [] };
      });
    return response.data as membership[];
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      if (Array.isArray(fetchedUsers)) {
        const sortedUsers = fetchedUsers.sort((a, b) => a.role_id - b.role_id);
        setUsers(sortedUsers);
        const fetchedMember = await getMemberShips();
        if (Array.isArray(fetchedMember)) {
          setMemberShips(fetchedMember);
        } else {
          console.error(
            "Expected an array of matches, but got:",
            fetchedMember
          );
        }
      } else {
        console.error("Expected an array of users, but got:", fetchedUsers);
      }
    };
    fetchUsers();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedUserEmails(selectedOptions);
  };

  useEffect(() => {
    setEmailList(selectedUserEmails.join("; "));
  }, [selectedUserEmails]);

  const selectUsersByRole = (roleId: number) => {
    const emailsOfRole = users
      .filter((user) => user.role_id === roleId)
      .map((user) => user.email);
    setSelectedUserEmails(emailsOfRole);
  };

  const selectAllUsers = () => {
    const allEmails = users.map((user) => user.email);
    setSelectedUserEmails(allEmails);
  };

  const sendMail = async () => {
    const subject = document.getElementById("subject") as HTMLInputElement;
    const cronTime = document.getElementById("cronTime") as HTMLInputElement;

    if (!emailList || !subject || !cronTime) {
      console.error("Missing fields");
      return;
    }

    try {
      const response =
        cronTime && cronTime.value
          ? await axios.post("http://localhost:5000/mail/cron", {
              email: emailList,
              subject: subject.value,
              message: content,
              html: content,
              cronTime: cronTime.value,
            })
          : await axios.post("http://localhost:5000/mail", {
              email: emailList,
              subject: subject.value,
              message: content,
              html: content,
            });
      console.log("Mail sent successfully", response);
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  const handleChange = (content: string) => {
    setContent(content);
  };

  return (
    <BasicManagement
      className="NewsLetter"
      title="Gestion de la Newsletter"
      content={
        <>
          <button onClick={selectAllUsers}>
            Sélectionner tous les utilisateurs
          </button>
          {Array.from(new Set(users.map((user) => user.role_id))).map(
            (roleId) => (
              <button key={roleId} onClick={() => selectUsersByRole(roleId)}>
                Sélectionner Rôle {roleId}
              </button>
            )
          )}

          {Array.from(
            new Set(
              users
                .filter((user) => user.membership_id)
                .map((user) => user.membership_id)
            )
          ).map((membership_id) => (
            <button
              key={membership_id}
              onClick={() => selectUsersByRole(membership_id)}
            >
              Sélectionner{" "}
              {memberShips &&
                memberShips.find(
                  (membership) => membership.id === membership_id
                )?.name}
              s
            </button>
          ))}
          <select
            multiple
            value={selectedUserEmails}
            onChange={handleSelectChange}
            className="user-select"
          >
            {users.map((user) => (
              <option key={user.id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <input
            required
            id="email"
            type="mail"
            disabled
            style={{ display: "none" }}
            value={emailList}
            placeholder="Email"
          />
          <input required id="subject" type="text" placeholder="Sujet" />
          <input
            id="cronTime"
            style={{ display: "none" }}
            type="text"
            placeholder="Cron Time"
          />
          <ReactQuill theme="snow" value={content} onChange={handleChange} />
          <button className="btn btn-full" onClick={sendMail}>
            Envoyer
          </button>
        </>
      }
    />
  );
}
