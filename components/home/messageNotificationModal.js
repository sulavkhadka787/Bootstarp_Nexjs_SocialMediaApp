import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";

const MessageNotificationModal = ({
  socket,
  showNewMessageModal,
  newMessageModal,
  newMessageReceived,
  user,
}) => {
  const [lgShow, setLgShow] = useState(newMessageModal);
  const [text, setText] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    if (socket.current) {
      socket.current.emit("sendMsgFromNotification", {
        userId: user._id,
        msgSendToUserId: newMessageReceived.sender,
        msg: text,
      });
      socket.current.on("msgSentFromNotification", () => {
        showNewMessageModal(false);
      });
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            New Message from {newMessageReceived.senderName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <img
              src={newMessageReceived.senderProfilePic}
              style={{ height: "25px", width: "25px", marginRight: "30px" }}
            />
            {"    "}
            <span
              style={{
                color: "white",
                backgroundColor: "black",
                padding: "10px",
              }}
            >
              {newMessageReceived.msg}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "block", left: "0" }}>
              {calculateTime(newMessageReceived.date)}
            </span>
            <Form onSubmit={formSubmit}>
              <Form.Control
                type="text"
                placeholder="New message"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button variant="primary" type="submit" className="float-left">
                Send Message
              </Button>
            </Form>
            <Link href={`/messages?message=${newMessageReceived.sender}`}>
              <a>View All Messages</a>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MessageNotificationModal;
