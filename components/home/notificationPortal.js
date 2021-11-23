import { useState } from "react";
import { Modal } from "react-bootstrap";
import newMsgSound from "../../utils/newMsgSound";
import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";

const NotificationPortal = ({
  newNotification,
  notificationPopup,
  showNotificationPopup,
}) => {
  const [lgShow, setLgShow] = useState(notificationPopup);

  const { name, profilePicUrl, username, postId } = newNotification;

  const router = useRouter();

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
            <span>
              <img
                src={profilePicUrl}
                style={{ height: "20px", width: "20px" }}
              />
            </span>
            {"  "}
            <span
              style={{ color: "blue", fontSize: "25px" }}
              onClick={() => router.push(`/${username}`)}
            >
              {name}
            </span>
            {"   "}liked your{"  "}
            <a onClick={() => router.push(`/post/${postId}`)}>
              <span style={{ color: "blue", fontSize: "30px" }}>post</span>
            </a>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default NotificationPortal;
