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
import UserProperties from "./component/property/UserPropertiesComponent";
// import UpdateProperty from "./pages/properties/UpdateProperty";
import AddProperty from "./pages/properties/AddProperty";
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
        <Route path="/properties/:id" element={<UpdateProperty />} />
        <Route path="/user/properties" element={<UserProperties />} />
        <Route path="/properties/update" element={<UpdateProperty />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </Provider>
  );
}

export default App;
