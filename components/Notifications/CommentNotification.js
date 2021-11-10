import calculateTime from "../../utils/calculateTime";
import { Row, Col, Image } from "react-bootstrap";

const CommentNotification = ({ notification }) => {
  return (
    <>
      <Row>
        <Col className="d-flex flex-column justify-content-between my-1">
          <div>
            <Image
              style={{ height: "30px", width: "40px" }}
              roundedCircle
              src={notification.user.profilePicUrl}
            />
            <a href={`/${notification.user.username}`}>
              <strong>{notification.user.username}</strong>
            </a>
            <span>commented on your </span>
            <a href={`/post/${notification.post._id}`}>post.</a>
            <span> {calculateTime(notification.date)}</span>
          </div>
          <div>
            {notification.post.picUrl && (
              <a href={`/post/${notification.post._id}`}>
                <Image
                  src={notification.post.picUrl}
                  style={{ height: "70px", width: "70px", marginTop: "10px" }}
                />
              </a>
            )}
          </div>
          <div>
            <strong>{notification.text}</strong>
          </div>
        </Col>
        <hr />
      </Row>
    </>
  );
};

export default CommentNotification;
