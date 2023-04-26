import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let url = "/api/v1/users/logs";

  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Report", 15, 15);

    let yOffset = 25;

    autoTable(doc, {
      head: [["ID", "Action", "User Full Name", "Time"]],
      body: logs.map((log, idx) => [
        idx + 1,
        log.action,
        log.user,
        log.createdAt,
      ]),
      startY: yOffset,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: "linebreak",
        halign: "lefter",
        valign: "lefter",
      },
    });

    doc.save(`log-report-${new Date().toJSON()}.pdf`);
  };

  useEffect(() => {
    const fetchLogData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      try {
        const { data } = await axios.get(`${url}`, config);
        console.log(data);
        setLogs(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Get authentication token
    const authToken = localStorage.getItem("token");

    // Fetch user data if authentication token exists
    if (authToken) {
      fetchLogData();
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(url);
    setLogs(data.data);
  };

  return (
    <Container>
      <h5 style={{ textAlign: "center", margin: "25px", fontWeight: "bold" }}>
        <i className="bi bi-people"></i> System Logs
      </h5>
      <hr />
      <Form onSubmit={handleSearch}>
        <Row className="align-items-center">
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
              Start Date
            </Form.Label>
            <Form.Control
              type="date"
              id="inlineFormInputName"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
              End Date
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                id="inlineFormInputGroupUsername"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs="auto" className="my-1">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>{" "}
      <hr />
      <Button className="btn-btn-primary" onClick={generatePdf}>
        Generate Pdf
      </Button>
      <hr />
      <br />
      <Row>
        {logs.length === 0 ? (
          <>
            <p>Slow internet. We are unable to fetch data now.</p>

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
                <th>Action</th>
                <th>User Full Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{log.action}</td>
                  <td>{log.user}</td>
                  <td>{log.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
};

export default Logs;
