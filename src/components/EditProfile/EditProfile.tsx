import { useEffect } from "react";
import { useEditing } from "../../contexts/EditingContext";

const EditProfile = () => {
  const { editing, setEditing } = useEditing();

  useEffect(() => {}, [editing]);

  const handleSubmit = () => {
    setEditing(!editing);
  };

  return (
    <div>
      EditProfile
      <button onClick={handleSubmit}>Submit Changes</button>
    </div>
  );
};

export default EditProfile;
