import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Chatbox from "../components/chatbox/chatbox";
import baseUrl from "../utils/baseUrl";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

const Messages = ({ chatsData, errorLoading, user }) => {
  const [chats, setChats] = useState(chatsData);
  const [connectedUsers, setConnectedUsers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (chats.length > 0 && !router.query.message) {
      console.log("chats==>>", chats);
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true,
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
