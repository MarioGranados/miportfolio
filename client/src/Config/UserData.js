import {createContext, useState} from "react";

export const UserData = createContext({});

export function UserDataProvider({children}) {
  const [userInfo,setUserInfo] = useState({});
  return (
    <UserData.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserData.Provider>
  );
}