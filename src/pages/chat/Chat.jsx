import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getChatMessages,
  getUserChats,
  sendMessage,
} from "../../firebase/chat";
import usrImg from "../../assets/images/profile/avatar.png";
import sendImg from "../../assets/images/send.png";
import { useSelector } from "react-redux";
import UsersList from "../../components/chat/UsersList";
import backendURL from "../../axios/backend";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import bertURL from "../../axios/bert";

const Chat = () => {
  const user = useSelector((state) => state.auth);
  const { chatId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const navigate = useNavigate();
  const reff = useRef(null);

  useEffect(() => {
    if (reff.current) {
      reff.current.scrollTo({
        top: reff.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (chatId && !chatId.split("_").includes(`${user.id}`)) {
      navigate("/chat");
    }
  }, [user.id]);

  useEffect(() => {
    if (user.id) {
      const unSub = getUserChats(user.id + "", setChats, user.token);

      return unSub;
    }
  }, [user.id]);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = getChatMessages(chatId, setChatMessages);
      return () => unsubscribe();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      const recId = chatId.split("_").find((id) => id !== `${user.id}`);
      if (recId) {
        backendURL
          .get(`/user/${recId}`, {
            headers: {
              Authorization: user.token,
            },
          })
          .then((res) => {
            setCurrentChat(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [chatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    bertURL
      .post(
        "/check-message",
        { text: newMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    sendMessage(
      user.id,
      chatId.split("_").find((id) => id !== user.id),
      {
        text: newMessage,
        senderId: user.id,
        user2: chatId.split("_").find((id) => id !== user.id),
        participants: [chatId.split("_").find((id) => id !== user.id), user.id],
      },
      chatId
    );
    setNewMessage("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.users}>
        <UsersList chats={chats} />
      </div>
      {/* chat */}
      {chatId ? (
        <div className={styles.chat}>
          <div className={styles.top}>
            <div className={styles.user}>
              <img
                src={
                  currentChat?.image !== "Not Found"
                    ? currentChat.image
                    : usrImg
                }
                alt="usrImg"
              />
              <div className={styles.texts}>
                <span>{currentChat?.name}</span>
                <p>{currentChat?.role || "user"}</p>
              </div>
            </div>
          </div>
          <div ref={reff} className={styles.chatMessages}>
            {chatMessages.map((message) => (
              <div
                className={
                  message.senderId === user.id
                    ? `${styles.message} ${styles.own}`
                    : styles.message
                }
                key={message.id}
              >
                <div className={styles.texts}>
                  {message.img && <img src={message.img} alt="" />}
                  <p>
                    <MessageBox
                      className={
                        message.senderId === user.id
                          ? `${styles.message} ${styles.own}`
                          : styles.message
                      }
                      position={message.senderId === user.id ? "right" : "left"}
                      type={"text"}
                      text={message.text}
                      date={new Date(message.createdAt?.seconds * 1000)}
                      styles={{
                        background:
                          message.senderId === user.id ? "#ff9300" : "#e9eaed",
                      }}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* send message */}
          <form>
            <div className={styles.bottom}>
              <input
                type="text"
                placeholder={"Type a message..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <button
                type="submit"
                className={styles.sendButton}
                onClick={handleSendMessage}
              >
                <img src={sendImg} alt="sendImg" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p style={{ fontSize: "20px", margin: "50px auto 0 auto" }}>
          Select a user to start chat
        </p>
      )}
    </div>
  );
};

export default Chat;
