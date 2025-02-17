import React, { createContext, useState } from "react";
export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    emal: "",
    password: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  return (
    <div>
      <UserDataContext.Provider value={"ankit"}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
