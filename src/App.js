import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/users/Login";
import Home from "./component/pages/Home";
import SendingEmail from "./component/users/SendResetPasswordEmail";
import ResetPassword from "./component/users/NewPassword";
import Profile from "./component/users/Profile";
import Register from "./pages/Register";
import HeaderComponent from "./component/HeaderComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/send-email" element={<SendingEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      {/* <FooterComponent /> */}
    </div>
  );
}

export default App;
