import styles from "./chatList.module.css";
import searchImage from "../../assets/images/search.png";
import usrImg from "../../assets/images/profile/avatar.png";
import { Link } from "react-router-dom";

const UsersList = ({ chats = [] }) => {
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
            <Link to={`/chat/${chat?.chatId}`}>
              <div
                key={chat?.id ?? chat?.name ?? Math.random()}
                className={styles.userCard}
              >
                <div className={styles.cardImage}>
                  <img
                    src={chat?.image !== "Not Found" ? chat?.image : usrImg}
                    alt={chat?.name ?? "Unknown"}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.name}>{chat?.name ?? "No Name"}</span>
                  <span className={styles.lastMsg}>
                    {chat?.lastMessage ?? "No message"}
                  </span>
                </div>
                <span className={styles.type}>{chat?.type}</span>
              </div>
            </Link>
          ))
        ) : (
          <div>No chats found</div>
        )}
      </div>
    </>
  );
};

export default UsersList;
