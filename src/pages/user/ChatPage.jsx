import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { store } from "../../state/store";
import {
  getAllChats,
  setNotifications,
  resetIsCreateChatSuccess,
} from "./../../state/chat/chatSlice";
import { getUserProfile } from "./../../state/user/userSlice";
import { getAllMessage, sendMessage } from "../../state/message/MessageSlice";
import TypingIndicator from "../../component/utils/TypingIndicator";

const ENDPOINT = "http://172.29.98.230:5000";
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
  const [chats, setChats] = useState([]);
  const [isSender, setIsSender] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  const selectChat = (state) => state.chat.selectedChat;
  const selectNotifications = (state) => state.chat.notifications;
  let xxchat = useSelector(selectChat);
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllChats());
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (selectedChat !== null) {
      dispatch(getAllMessage(selectedChat._id));
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    socket = io(ENDPOINT);
    if (loggedInUser !== null) {
      socket.emit("setup", loggedInUser);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", (isTyping) => {
        setIsTyping(isTyping);
      });
      socket.on("stop typing", (isTyping) => {
        setIsTyping(isTyping);
      });
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [loggedInUser]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const isSuccess = store.getState().chat.isFetchingChatsSuccess;
      const error = store.getState().chat.fetchingChatsError;
      const fetchedChats = store.getState().chat.chats;
      const loggedInProfile = store.getState().user.userProfile;
      const fetchedMessages = store.getState().message.messages;

      const sendMessageSuccess = store.getState().message.isSendingMsgSuccess;
      const sendMessageFailed = store.getState().message.isFetchingMsgFailed;

      const newMessage = store.getState().message.newMessage;

      setMessages(fetchedMessages);
      if (sendMessageSuccess) {
        socket.emit("new message", newMessage);
        setMessages([...messages, newMessage]);
      }
      if (isSuccess) {
        setChats(fetchedChats);
        setLoggedInUser(loggedInProfile);
      } else if (error) {
        toast.error(error);
      }
      if (sendMessageFailed) {
        toast.error("Sending message has failed try again");
      }
    });
    return () => unsubscribe();
  });

  useEffect(() => {
    if (xxchat !== null) {
      setSelectedChat(xxchat);
      if (loggedInUser !== null) {
        setActiveChat(getSender(loggedInUser, xxchat.users));
      }
    }
    dispatch(resetIsCreateChatSuccess());
  }, [xxchat, loggedInUser, dispatch]);

  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id
      ? `${users[1]?.firstName} ${users[1]?.lastName}`
      : `${users[0]?.firstName} ${users[0]?.lastName}`;
  };

  const sendNewMessage = (event) => {
    event.preventDefault();
    socket.emit("stop typing", selectedChat._id);

    try {
      setNewMessage("");
      dispatch(
        sendMessage({
          content: newMessage,
          chatId: selectedChat._id,
        })
      );
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notifications.includes(newMessageReceived)) {
          dispatch(setNotifications([newMessageReceived, ...notifications]));
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleKeyDown = (event) => {
    setNewMessage(event.target.value);
    if (
      /[0-9]/.test(event.key) ||
      /[a-zA-Z]/.test(event.key) ||
      /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(event.key)
    ) {
      socket.emit("typing", true);
      setIsTyping(true);
    } else {
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength) {
          socket.emit("stop typing", false);

          setIsTyping(false);
        }
      }, timerLength);
    }
  };

  const getSelectedChat = (chat) => {
    if (selectedChat?._id === chat?._id) {
      return true;
    } else {
      return false;
    }
  };

  const checkNewNot = (chatId, allNot) => {
    if (allNot.find((notification) => notification.chat._id === chatId)) {
      return true;
    } else return false;
  };

 

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
      {chats.length ? (
        <Row style={{ flexGrow: 1 }}>
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            <h6>Chats</h6>
            <ListGroup
              style={{
                height: "600px",

                overflowY: "scroll",
                border: "1px solid #000000 ",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <ListGroup.Item
                    key={chat._id}
                    className="mt-3 mb-3 "
                    onClick={() => {
                      setSelectedChat(chat);
                      setActiveChat(getSender(loggedInUser, chat.users));
                      xxchat = null;
                      setNotifications([]);
                    }}
                    style={{
                      backgroundColor: getSelectedChat(chat)
                        ? "#7F7F7F"
                        : "#cccccc",
                      color: "white",
                      cursor: "pointer",
                      width: "90%",
                      margin: "0px auto",

                      borderRadius: "10px 10px 10px 10px",
                    }}
                  >
                    <h6>
                      {getSender(loggedInUser, chat.users)}{" "}
                      {checkNewNot(chat._id, notifications) ? (
                        <span style={{ color: "red" }}>1</span>
                      ) : (
                        ""
                      )}
                    </h6>
                  </ListGroup.Item>
                ))
              ) : (
                <></>
              )}
            </ListGroup>
          </Col>

          <Col xs={12} md={9}>
            {selectedChat !== null ? (
              <>
                <h6> Active Chat: {activeChat !== null ? activeChat : ""}</h6>{" "}
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
                    {messages.length > 0 ? (
                      messages.map((msg, i) => (
                        <div
                          key={i}
                          style={{
                            marginRight:
                              msg.sender._id === loggedInUser._id ? "30%" : 0,
                            marginLeft:
                              msg.sender._id !== loggedInUser._id ? "30%" : 0,
                          }}
                        >
                          <h6
                            className="text-start col-12 "
                            style={{
                              ...messageStyle,
                              backgroundColor:
                                msg.sender._id === loggedInUser._id
                                  ? "#6736CF"
                                  : "#666666",
                              marginRight:
                                msg.sender._id !== loggedInUser._id
                                  ? "0px"
                                  : "50px",
                              borderRadius: "10px",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            {msg.content}
                          </h6>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </Container>
                  <Form className="mt-3 mb-3">
                    {isTyping && !isSender ? <TypingIndicator /> : <></>}

                    <Row>
                      <Col xs={9} md={9}>
                        <Form.Group controlId="formMessage">
                          <Form.Control
                            value={newMessage}
                            onChange={(e) => {
                              typingHandler(e);
                              setIsSender(true);
                              handleKeyDown(e);
                            }}
                            onBlur={() => setIsSender(false)}
                            type="text"
                            placeholder="Enter message"
                            style={{ backgroundColor: "#D9D9D9" }}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={3} md={3}>
                        <Button onClick={(event) => sendNewMessage(event)}>
                          <img
                            src="images/send_icon.svg"
                            alt="send"
                            style={{
                              height: "30px",
                              cursor: "pointer",
                              width: "30px",
                            }}
                          />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </>
            ) : (
              <p
                className="d-flex justify-content-center align-content-center"
                style={{
                  marginTop: "50px",
                }}
              >
                {" "}
                Choose your chat to send
              </p>
            )}
          </Col>
        </Row>
      ) : (
        <p
          className="d-flex justify-content-center align-content-center"
          style={{
            marginTop: "50px",
          }}
        >
          {" "}
          you don't have messages
        </p>
      )}
    </Container>
  );
};

export default ChatPage;
