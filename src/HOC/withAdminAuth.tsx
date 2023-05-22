import jwt_decode from "jwt-decode";
import { SD_Roles } from "../utility/SD";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const token = localStorage.getItem("token") ?? "";

    if (token) {
      const decode: {
        roles: string[];
      } = jwt_decode(token);
      console.log(decode.roles);
      if (!decode.roles.includes(SD_Roles.ADMIN)) {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
