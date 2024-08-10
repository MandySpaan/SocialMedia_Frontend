import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getMyProfile } from "../../services/userApiCalls";
import EditProfile from "../EditProfile/EditProfile";
import "./MyProfile.css";
import { useEditing } from "../../contexts/EditingContext";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    description: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const { editing, setEditing } = useEditing();

  const { passport } = useAuth();

  useEffect(() => {
    const bringMyProfile = async () => {
      const response = await getMyProfile(passport!.token);
      setProfileData(response.data);
    };
    bringMyProfile();
  }, [editing]);

  const editView = () => {
    setEditing(!editing);
  };

  return (
    <div className="myprofile-box">
      <h2>{profileData.username}</h2>
      {!editing ? (
        <span onClick={editView} id="edit-profile" className="link-style">
          Edit your profile
        </span>
      ) : (
        <span onClick={editView} id="edit-profile" className="link-style">
          Cancel editting
        </span>
      )}
      <div className={editing ? "hidden" : "profile-view"}>
        <div className="full-name bold">
          <p>
            {profileData.first_name} {profileData.last_name}
          </p>
        </div>
        <p>{profileData.description}</p>
      </div>
      <div className={!editing ? "hidden" : " "}>
        <EditProfile />
      </div>
    </div>
  );
};

export default MyProfile;
