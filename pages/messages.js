import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { parseCookies } from "nookies";
import Chatbox from "../components/chatbox/chatbox";
import baseUrl from "../utils/baseUrl";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

const Messages = ({ chatsData, errorLoading, user }) => {
  const [chats, setChats] = useState(chatsData);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicUrl: "" });

  //this ref is for persisting the state of the query string in url throughout re-renders.
  //This ref is the query string inside url

  const openChatId = useRef();

  const router = useRouter();

  const socket = useRef();

  //CONNECTION USE effect
  useEffect(() => {
    console.log("1st useeffect ran ");
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });
    }

    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true,
      });
    }

    return () => {
      if (socket.current) {
        console.log("this is cleanup");
        socket.current.emit("disconnect");
        socket.current.off();
      }
    };
  }, []);

  //load messages useeffect
  useEffect(() => {
    console.log("2nd useeffect ran ");
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: router.query.message,
      });

      socket.current.on("messagesLoaded", ({ chat }) => {
        console.log("messagesLoaded", chat);
        setMessages(chat.messages);
        setBannerData({
          name: chat.messagesWith.name,
          profilePicUrl: chat.messagesWith.profilePicUrl,
        });
        openChatId.current = chat.messagesWith._id;
      });
    };

    if (socket.current) {
      loadMessages();
    }
  }, [router.query.message]);

  const sendMsg = (msg) => {
    if (socket.current) {
      console.log("send-msg", msg);
      socket.current.emit("sendNewMsg", {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg,
      });
    }
  };

  //CONFIRMING THE MSG is sent and receiving the messages
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msgSent", ({ newMsg }) => {
        if (newMsg.receiver === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);

          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.receiver
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;
            return [...prev];
          });
        }
      });
    }
  }, []);

  return (
    <>
      {chats.length > 0 ? (
        <Row className="d-flex">
          <Col className="col-md-2">
            <div onClick={() => router.push("/")}>
              <span style={{ cursor: "pointer" }}>Go Back</span>
            </div>
          </Col>
          <Col className="col-md-10">
            {" "}
            <Chatbox
              user={user}
              chats={chats}
              setChats={setChats}
              connectedUsers={connectedUsers}
              bannerData={bannerData}
              messages={messages}
              sendMsg={sendMsg}
            />
          </Col>
        </Row>
      ) : (
        <div>No chats</div>
      )}
    </>
  );
};

Messages.getInitialProps = async (ctx) => {
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
