import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getMyProfile } from "../../services/userApiCalls";

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
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
    <div>
      <h2>
        {profileData.first_name} {profileData.last_name}
      </h2>
    </div>
  );
};

export default MyProfile;
