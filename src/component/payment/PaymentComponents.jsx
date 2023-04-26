import { useEffect, useState } from "react";
import axios from "axios";

import { Container, Table, Row } from "react-bootstrap";

const baseAPIUrl = "/api/v1";

const PaymentComponent = () => {
  const [payments, setPayments] = useState([]);

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    seconds: "numeric",
  });

  useEffect(() => {
    // Make API request to fetch user data
    const fetchPaymentData = async () => {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      try {
        const { data } = await axios.get(
          `${baseAPIUrl}/payments/view-all-payments`,
          config
        );
        setPayments(data.data);
        console.log(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentData();
  }, []);

  return (
    <Container>
      <h5 style={{ textAlign: "center", margin: "25px", fontWeight: "bold" }}>
        <i className="bi bi-credit-card-2-front-fill"></i>
        {"  "}All Payments
      </h5>
      <hr />
      <Row>
        {payments.length === 0 ? (
          <>
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              No Payment Found
            </p>

            <img
              src="/images/preview.gif"
              alt=""
              height="148px"
              width="428px"
              style={{ objectFit: "cover", align: "center" }}
            />
          </>
        ) : (
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Section</th>
                <th>Created At</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{payment.name}</td>
                  <td>{payment.email}</td>
                  <td>{payment.property.title}</td>
                  <td>{payment.property.description}</td>
                  <td>{payment.property.category}</td>
                  <td>{payment.property.section}</td>
                  <td>{formatter.format(new Date(payment.createdAt))}</td>
                  <td>{payment.property.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default PaymentComponent;
