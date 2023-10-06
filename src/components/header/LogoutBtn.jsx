import { useDispatch } from "react-redux";

import authService from "../../services/auth_service";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button onClick={logoutHandler}>Logout</button>;
}

export default LogoutBtn;
