import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../state/user/userSlice";
import { store } from "../../state/store";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Please enter the OTP to continue.");
    } else {
      dispatch(
        verifyAccount({
          otp: otp,
        })
      );
    }
  };
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newIsLoading = store.getState().user.isVerifyLoading;
      const isSuccess = store.getState().user.isVerifySuccess;
      const error = store.getState().user.verifyError;
      setIsLoading(newIsLoading);
      if (isSuccess) {
        navigate("/");
      } else if (error) {
        toast.error(error);
      }
    });
    return () => unsubscribe();
  });

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-80 "
      style={{ marginTop: "45px" }}
    >
      <div className="card p-3">
        <h4 className=" text-secondary text-center">Verify OTP</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOTP">
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
            style={{ marginTop: "15px", background: "#6736CF" }}
            block
          >
            {!isLoading ? (
              "Verify OTP"
            ) : (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "5px" }}
              />
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
