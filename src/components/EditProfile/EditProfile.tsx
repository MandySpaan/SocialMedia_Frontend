import { useEffect, useState } from "react";
import { useEditing } from "../../contexts/EditingContext";
import { useAuth } from "../../contexts/AuthContext";
import { getMyProfile } from "../../services/userApiCalls";
import "./EditProfile.css";

const EditProfile = () => {
  const { editing, setEditing } = useEditing();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    description: "",
    email: "",
    password: "",
  });

  useEffect(() => {}, [editing]);

  const { passport } = useAuth();

  useEffect(() => {
    const bringMyProfile = async () => {
      const response = await getMyProfile(passport!.token);
      setProfileData(response.data);
    };
    bringMyProfile();
  }, []);

  useEffect(() => {}, [editing]);

  const handleSubmit = () => {
    setEditing(!editing);
  };

  const profileView = () => {
    setEditing(!editing);
  };

  return (
    <div className="editprofile-page">
      <h3>Edit your profile</h3>
      <div className="input-label-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder={profileData.username}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder={profileData.description}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          name="first_name"
          placeholder={profileData.first_name}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          name="last_name"
          placeholder={profileData.last_name}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={profileData.email}
        />
      </div>
      <div className="input-label-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
        />
      </div>
      <div className="edit-buttons">
        <button id="submit-button" onClick={handleSubmit}>
          Submit Changes
        </button>
        <button id="cancel-button" onClick={profileView}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
