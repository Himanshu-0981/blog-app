import React from "react";
import { useDispatch } from "react-redux";

import authService from "./services/auth_service";
import { login, logout } from "./features/authSlice";
import { Header, Footer } from "./components";

function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    statusLoginLogout();
  });

  const statusLoginLogout = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) dispatch(login({ userData }));
      dispatch(logout());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <>
      <Header />
      <Footer />
    </>
  ) : null;
}

export default App;
