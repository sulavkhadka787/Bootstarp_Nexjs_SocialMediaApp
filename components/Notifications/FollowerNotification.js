import { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import calculateTime from "../../utils/calculateTime";
import { followUser, unfollowUser } from "../../utils/profileActions";

const FollowerNotification = ({
  notification,
  loggedUserFollowStats,
  setUserFollowStats,
}) => {
  const [disabled, setDisabled] = useState(false);

  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === notification.user._id
    ).length > 0;
  return (
    <>
      <Row>
        <Col className="d-flex justify-content-between my-1">
          <div>
            <Image
              style={{ height: "30px", width: "40px" }}
              roundedCircle
              src={notification.user.profilePicUrl}
            />
            <a href={`/${notification.user.username}`}>
              <strong>{notification.user.username}</strong>
            </a>
            <span> Started following you</span>
            <span> {calculateTime(notification.date)}</span>
          </div>
          <div>
            <Button
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                isFollowing
                  ? await unfollowUser(
                      notification.user._id,
                      setUserFollowStats
                    )
                  : await followUser(notification.user._id, setUserFollowStats);
                setDisabled(false);
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>
        </Col>
        <hr />
      </Row>
    </>
  );
};

export default FollowerNotification;
