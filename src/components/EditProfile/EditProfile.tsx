import { useEffect, useState } from "react";
import { useEditing } from "../../contexts/EditingContext";
import { useAuth } from "../../contexts/AuthContext";
import { getMyProfile, updateProfile } from "../../services/userApiCalls";
import "./EditProfile.css";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    description: "",
    email: "",
    password: "",
  });

  const [editData, setEditData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    description: "",
    email: "",
    password: "",
  });

  const { editing, setEditing } = useEditing();
  const { passport } = useAuth();

  useEffect(() => {
    const bringMyProfile = async () => {
      const response = await getMyProfile(passport!.token);
      setProfileData(response.data);
      setEditData(response.data);
    };
    bringMyProfile();
  }, [passport]);

  const handleSubmit = async () => {
    const dataToSubmit = { ...profileData, ...editData };

    Object.keys(dataToSubmit).forEach((key) => {
      if (dataToSubmit[key as keyof typeof dataToSubmit] === "") {
        delete dataToSubmit[key as keyof typeof dataToSubmit];
      }
    });

    const response = await updateProfile(dataToSubmit, passport!.token);
    if (response.success) {
      const bringMyProfile = async () => {
        const response = await getMyProfile(passport!.token);
        setProfileData(response.data);
      };
      bringMyProfile();
      setEditing(!editing);
    }
  };

  const profileView = () => {
    setEditing(!editing);
  };

  const editInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="editprofile-page">
      <div className="input-label-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={editData.username}
          placeholder="Leave empty to keep current"
          onChange={editInputHandler}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          defaultValue={editData.description}
          placeholder="Leave empty to keep current"
          onChange={editInputHandler}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          name="first_name"
          defaultValue={editData.first_name}
          placeholder="Leave empty to keep current"
          onChange={editInputHandler}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          name="last_name"
          defaultValue={editData.last_name}
          placeholder="Leave empty to keep current"
          onChange={editInputHandler}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={editData.email}
          placeholder="Leave empty to keep current"
          onChange={editInputHandler}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
          onChange={editInputHandler}
        />
      </div>
      <div className="edit-buttons">
        <button id="submit-button" onClick={handleSubmit}>
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
