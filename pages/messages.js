import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { parseCookies } from "nookies";
import Chatbox from "../components/chatbox/chatbox";
import baseUrl from "../utils/baseUrl";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import getUserInfo from "../utils/getUserInfo";
import newMsgSound from "../utils/newMsgSound";
import cookie from "js-cookie";

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

  const scrollDivToBottom = (divRef) => {
    divRef.current !== null &&
      divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const divRef = useRef();

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
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on("noChatFound", async () => {
        const { name, profilePicUrl } = await getUserInfo(router.query.message);
        setBannerData({ name, profilePicUrl });
        setMessages([]);
        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) {
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

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        let senderName;
        //WHEN CHAT IS OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMsg]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMsg.sender
            );
            previousChat.lastMessage = newMsg.msg;
            previousChat.date = newMsg.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const ifPreviouslyMessaged =
            chats.filter((chat) => chat.messagesWith === newMsg.sender).length >
            0;

          if (ifPreviouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMsg.sender
              );
              previousChat.lastMessage = newMsg.msg;
              previousChat.date = newMsg.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const { name, profilePicUrl } = await getUserInfo(newMsg.sender);
            senderName = name;
            const newChat = {
              messagesWith: newMsg.sender,
              name,
              profilePicUrl,
              lastMessage: newMsg.msg,
              date: newMsg.date,
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }
        newMsgSound(senderName);
      });
    }
  }, []);

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const deleteMsg = (messageId) => {
    if (socket.current) {
      socket.current.emit("deleteMsg", {
        userId: user._id,
        messagesWith: openChatId.current,
        messageId,
      });

      socket.current.on("msgDeleted", () => {
        setMessages((prev) =>
          prev.filter((message) => message._id !== messageId)
        );
      });
    }
  };

  const deleteChat = async (messagesWith) => {
    try {
      await axios.delete(`${baseUrl}/api/chats/${messagesWith}`, {
        headers: { Authorization: cookie.get("token") },
      });
      setChats((prev) =>
        prev.filter((chat) => chat.messagesWith !== messagesWith)
      );
      router.push("/message", undefined, { shallow: true });
    } catch (error) {
      alert("Error Deleting chat");
    }
  };

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
              divRef={divRef}
              deleteMsg={deleteMsg}
              deleteChat={deleteChat}
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
