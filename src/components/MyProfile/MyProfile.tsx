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
  }, []);

  useEffect(() => {}, [editing]);

  const editView = () => {
    setEditing(!editing);
  };

  console.log(editing);

  return (
    <div className="myprofile-box">
      <h2>{profileData.username}</h2>
      <div className={editing ? "hidden" : " "}>
        <div
          className={
            !profileData.first_name && !profileData.last_name
              ? "only-editlink"
              : "fullname-editlink"
          }
        >
          <div className="full-name bold">
            <p>
              {profileData.first_name} {profileData.last_name}
            </p>
          </div>
          <div className="link-to-edit">
            <p>
              <span onClick={editView} className="link-style">
                Edit your profile
              </span>
            </p>
          </div>
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
