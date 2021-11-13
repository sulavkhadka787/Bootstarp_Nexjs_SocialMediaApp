import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Chatbox from "../components/chatbox/chatbox";
import baseUrl from "../utils/baseUrl";

const Messages = ({ chatsData, errorLoading, user }) => {
  const [chats, setChats] = useState(chatsData);
  const [connectedUsers, setConnectedUsers] = useState([]);

  return (
    <>
      {chats.length > 0 ? (
        <Chatbox
          user={user}
          chats={chats}
          setChats={setChats}
          connectedUsers={connectedUsers}
        />
      ) : (
        <div>No chats</div>
      )}
    </>
  );
};

Messages.getInitialProps = async (ctx) => {
  console.log("messages-get-iniitlaporps");
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/chats`, {
      headers: { Authorization: token },
    });
    return { chatsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Messages;
