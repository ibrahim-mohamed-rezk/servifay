import { toast } from "react-toastify";
import backendURL from "../axios/backend";
import { firebaseConf } from "./firebase-init";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const firestoreDB = getFirestore(firebaseConf);

export const sendMessage = async (userId, receiverId, message, chatId) => {
  try {
    await addDoc(collection(firestoreDB, `chats/${chatId}/messages`), {
      ...message,
      createdAt: serverTimestamp(),
    });
    updateLastMessage(userId, message.text, receiverId, chatId);
  } catch (err) {
    toast.error(err.message || "Error submitting rating");
    toast.error("Error occurred! Please try again.");
  }
};

export const getChatMessages = (chatId, callback) => {
  const q = query(
    collection(firestoreDB, `chats/${chatId}/messages`),
    orderBy("createdAt")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

export const getUserChats = (userId, callback, token) => {
  onSnapshot(doc(firestoreDB, "userChats", `${userId}`), async (doc) => {
    if (doc) {
      const items = doc.data()?.chats || [];

      const promises = items.map(async (item) => {
        if (item.receiverId) {
          try {
            const userdata = await backendURL.get(`/user/${item.receiverId}`, {
              headers: {
                Authorization: token,
              },
            });
            const data = userdata.data.data;
            return { ...item, ...data };
          } catch (err) {
            toast.error(err.message || "Error submitting rating");
            toast.error("Error occurred! Please try again.");
          }
        }
      });
      const chatData = await Promise.all(promises);

      callback(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    }
  });
};

export const addToChatHistory = async (userId, chatId, receiverId) => {
  const userChatsRef = doc(firestoreDB, "userChats", `${userId}`);
  const recieverChatsRef = doc(firestoreDB, "userChats", `${receiverId}`);

  const docSnapshot = await getDoc(userChatsRef);
  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    const chats = userData.chats || [];

    if (!chats.some((chat) => chat.chatId === chatId)) {
      await updateDoc(userChatsRef, {
        chats: arrayUnion({
          chatId,
          lastMessage: "",
          receiverId,
          updatedAt: Date.now(),
        }),
      });
    }
  }

  const receiveDocSnapshot = await getDoc(recieverChatsRef);
  if (receiveDocSnapshot.exists()) {
    const userData = receiveDocSnapshot.data();
    const chats = userData.chats || [];

    if (!chats.some((chat) => chat.chatId === chatId)) {
      await updateDoc(recieverChatsRef, {
        chats: arrayUnion({
          chatId,
          lastMessage: "",
          receiverId: userId,
          updatedAt: Date.now(),
        }),
      });
    }
  }
};

export const updateLastMessage = async (
  userId,
  message,
  receiverId,
  chatId
) => {
  const senderChatsRef = doc(firestoreDB, "userChats", `${userId}`);
  const receiverChatsRef = doc(firestoreDB, "userChats", `${receiverId}`);

  const senderDocSnapshot = await getDoc(senderChatsRef);
  if (senderDocSnapshot.exists()) {
    const senderUserData = senderDocSnapshot.data();
    const senderChats = senderUserData.chats || [];

    const updatedSenderChats = senderChats.map((chat) => {
      if (chat.chatId === chatId) {
        return { ...chat, lastMessage: message, updatedAt: Date.now() };
      } else {
        return chat;
      }
    });

    await updateDoc(senderChatsRef, {
      chats: updatedSenderChats,
    });
  } else {
    console.log("Sender document does not exist!");
  }

  const receiverDocSnapshot = await getDoc(receiverChatsRef);
  if (receiverDocSnapshot.exists()) {
    const receiverUserData = receiverDocSnapshot.data();
    const receiverChats = receiverUserData.chats || [];

    const updatedReceiverChats = receiverChats.map((chat) => {
      if (chat.chatId === chatId) {
        return { ...chat, lastMessage: message, updatedAt: Date.now() };
      } else {
        return chat;
      }
    });

    await updateDoc(receiverChatsRef, {
      chats: updatedReceiverChats,
    });
  } else {
    console.log("Receiver document does not exist!");
  }
};
