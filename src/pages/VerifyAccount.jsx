import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const baseAPIUrl = "http://localhost:5000/api/v1";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Please enter the OTP to continue.");
    } else {
      try {
        const token = localStorage.getItem("verificationToken");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post(
          `${baseAPIUrl}/users/verifyEmail`,
          {
            otp: otp,
          },
          config
        );

        navigate("/");
      } catch (err) {
        toast.error(err.response.data.error);
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-80 "
      style={{ marginTop: "45px" }}
    >
      <div className="card p-3">
        <h3 className="text-center">Verify OTP</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOTP">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: "15px" }}
            block
          >
            Verify OTP
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
