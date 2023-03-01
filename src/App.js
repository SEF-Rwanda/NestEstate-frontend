import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SendingEmail from "./pages/SendResetPasswordEmail";
import ResetPassword from "./pages/NewPassword";
import UpdateProfile from "./pages/UpdateProfile";
import MyProfile from "./pages/MyProfile";
import Register from "./pages/Register";
import HeaderComponent from "./component/HeaderComponent";
import { store } from "./state/store";
import VerifyAccount from "./pages/VerifyAccount";
import "./App.css";

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
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </Provider>
  );
}

export default App;
