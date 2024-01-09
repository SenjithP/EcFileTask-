import { Routes, Route } from "react-router-dom";
import NoPageFound from "../Pages/NoPageFound";
import UserRegisterPage from "../Pages/UserSide/UserRegisterPage.jsx";
import UserLoginPage from "../Pages/UserSide/UserLoginPage.jsx";
import UserHomePage from "../Pages/UserSide/UserHomePage.jsx";
import UserPrivateRoute from "../Components/UserPrivateRoute.jsx"
import AdminPrivateRoute from "../Components/AdminPrivateRoute.jsx"
import AdminLoginPage from "../Pages/AdminSide/adminLoginPage.jsx";
import AdminHomePage from "../Pages/AdminSide/adminHomePage.jsx";

const Routers = () => {
  return (
    <Routes>
    {/* No Page Found */}
      <Route path="*" element={<NoPageFound />} />

      {/* User Side */}
      <Route path="/" element={<UserRegisterPage />} />
      <Route path="/userRegistration" element={<UserRegisterPage />} />
      <Route path="/userLogin" element={<UserLoginPage />} />
      <Route path="/userHome" element={<UserPrivateRoute><UserHomePage /></UserPrivateRoute>} />

      {/* Admin Side */}
      <Route path="/adminHome" element={<AdminPrivateRoute><AdminHomePage /></AdminPrivateRoute>} />
      <Route path="/adminLogin" element={<AdminLoginPage />} />
    </Routes>
  );
};

export default Routers;
