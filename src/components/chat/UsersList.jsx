import React, { useState } from "react";
import styles from "./chatList.module.css";
import searchImage from "../../assets/images/search.png";
import usrImg from "../../assets/images/profile/avatar.png";
import { Link, useNavigate } from "react-router-dom";

const UsersList = ({ chats = [] }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Search */}
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <img src={searchImage} alt="search" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      {/* Users Section */}
      <div className={styles.usersSection}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat?.id ?? chat?.name ?? Math.random()}
              className={styles.userCard}
            >
              <div
                onClick={() => navigate(`/profile/${chat?.id}`)}
                className={styles.cardImage}
              >
                <img
                  src={chat?.image !== "Not Found" ? chat?.image : usrImg}
                  alt={chat?.name ?? "Unknown"}
                />
              </div>
              <Link to={`/chat/${chat?.chatId}`}>
                <div className={styles.cardInfo}>
                  <span className={styles.name}>{chat?.name ?? "No Name"}</span>
                  <span className={styles.lastMsg}>
                    {chat?.lastMessage ?? "No message"}
                  </span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No chats found</div>
        )}
      </div>
    </>
  );
};

export default UsersList;
