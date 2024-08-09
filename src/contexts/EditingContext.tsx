import React, { createContext, useState, useContext } from "react";

interface EditingContextProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditingContext = createContext<EditingContextProps | undefined>(
  undefined
);

export const EditingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <EditingContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = (): EditingContextProps => {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error("useEditing must be used within an EditingProvider");
  }
  return context;
};
