import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000/";
let socket, selectedChatCompare;

const messageStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "30px",

  color: "white",
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);
  return (
    <Container
      fluid
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        width: "80%",
      }}
    >
      <Row style={{ flexGrow: 1 }}>
        <Col xs={12} md={3} className="mb-3 mb-md-0">
          <h3>Chats</h3>
          <ListGroup
            style={{
              height: "600px",

              overflowY: "scroll",
              border: "1px solid #000000 ",
              borderRadius: "10px 10px 10px 10px",
            }}
          >
            <ListGroup.Item
              className="mt-3 mb-3 "
              style={{
                backgroundColor: "#cccccc",
                color: "white",
                cursor: "pointer",
                width: "90%",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              John
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                cursor: "pointer",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Jane
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Mike
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Alice
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Bob
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Bob
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Bob
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Bob
            </ListGroup.Item>
            <ListGroup.Item
              className="mb-3"
              style={{
                backgroundColor: "#7F7F7F",
                width: "90%",
                color: "white",
                margin: "0px auto",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              Bob
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={12} md={9}>
          <h3>John</h3>
          <Container
            style={{
              border: "1px solid #000000 ",
              borderRadius: "10px 10px 10px 10px",
            }}
          >
            <Container
              style={{
                height: "500px",
                overflowY: "scroll",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginRight: "50%",
                }}
              >
                <p
                  className="text-start col-12 d-inline-block"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#6736CF",
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Alice: HeY Alice,How Are you doing.{" "}
                  </span>
                </p>
              </div>
              <div
                style={{
                  marginLeft: "50%",
                }}
              >
                <p
                  className="text-end"
                  style={{
                    ...messageStyle,
                  }}
                >
                  <span
                    style={{
                      borderRadius: "10px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      backgroundColor: "#666666",
                    }}
                  >
                    {" "}
                    Mike: Not bad, just finishing up some work.{" "}
                  </span>
                </p>
              </div>
            </Container>
            <Form className="mt-3 mb-3">
              <Row>
                <Col xs={9} md={9}>
                  <Form.Group controlId="formMessage">
                    <Form.Control
                      type="text"
                      placeholder="Enter message"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3} md={3}>
                  <img
                    src="images/send_icon.svg"
                    alt="send"
                    style={{
                      height: "30px",
                      cursor: "pointer",
                      width: "30px",
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
