import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Login from "./pages/user/Login";
import Home from "./pages/Home";
import SendingEmail from "./pages/user/SendResetPasswordEmail";
import ResetPassword from "./pages/user/NewPassword";
import UpdateProfile from "./pages/user/UpdateProfile";
import MyProfile from "./pages/user/MyProfile";
import Register from "./pages/user/Register";
import HeaderComponent from "./component/HeaderComponent";
import { store } from "./state/store";
import VerifyAccount from "./pages/user/VerifyAccount";
import UpdateProperty from "./pages/properties/UpdateProperty";
import UserProperties from "./pages/properties/UserPropertiesComponent";
import AdminProperties from "./pages/properties/AdminProperties";
import AddProperty from "./pages/properties/AddProperty";
import AdminUsers from "./pages/user/AdminUsers";
import "./App.css";
import SingleProperty from "./pages/properties/SingleProperty";
import DashboardInterface from "./pages/admin/DashboardInterface";
import ChatPage from "./pages/user/ChatPage";
import UserDashboardInterface from "./pages/user/UserDashboard";
import Logs from "./pages/admin/Logs";

function App() {
  return (
    <Provider store={store}>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/send-email" element={<SendingEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/properties/:id" element={<UpdateProperty />} />
        <Route path="/user/properties" element={<UserProperties />} />
        <Route path="/properties/update" element={<UpdateProperty />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/all-properties/:id" element={<SingleProperty />} />
        <Route path="/admin/analytics" element={<DashboardInterface/>} />
        <Route path="/user/dashboard" element={<UserDashboardInterface/>} />
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/admin/logs" element={<Logs/>} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </Provider>
  );
}

export default App;
