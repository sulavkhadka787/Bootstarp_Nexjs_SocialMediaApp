import { useState, useEffect } from "react";
import LikeNotification from "../components/Notifications/LikeNotification";
import CommentNotification from "../components/Notifications/CommentNotification";
import FollowerNotification from "../components/Notifications/FollowerNotification";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";

const Notifications = ({
  notifications,
  errorLoading,
  user,
  userFollowStats,
}) => {
  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);
  return (
    <>
      <Row>
        {notifications && notifications.length > 0 ? (
          <Col>
            {notifications.map((notification, i) => (
              <div key={i}>
                {notification.type === "newLike" &&
                  notification.post !== null && (
                    <LikeNotification notification={notification} />
                  )}

                {notification.type === "newComment" &&
                  notification.post !== null &&
                  notification.post !== null && (
                    <CommentNotification notification={notification} />
                  )}

                {notification.type === "newFollower" && (
                  <FollowerNotification
                    notification={notification}
                    loggedUserFollowStats={loggedUserFollowStats}
                    setUserFollowStats={setUserFollowStats}
                  />
                )}
              </div>
            ))}
          </Col>
        ) : (
          <div>No Notifications</div>
        )}
      </Row>
    </>
  );
};

Notifications.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token },
    });

    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Notifications;
