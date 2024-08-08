import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getMyProfile } from "../../services/userApiCalls";
import "./MyProfile.css";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const { passport } = useAuth();

  useEffect(() => {
    const bringMyProfile = async () => {
      const response = await getMyProfile(passport!.token);
      setProfileData(response.data);
    };
    bringMyProfile();
  }, []);

  return (
    <div className="myprofile-box">
      <h2>{profileData.username}</h2>
      <p>
        {profileData.first_name} {profileData.last_name}
      </p>
    </div>
  );
};

export default MyProfile;
