import { createContext } from "react";

const authContext = createContext({
  uuid: "1234",
  profileImage: "https://api.adorable.io/avatars/285/abott@adorable.png",
});

export default authContext;
