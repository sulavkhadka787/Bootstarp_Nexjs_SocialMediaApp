import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { Row, Col, Button } from "react-bootstrap";

const Follower = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId,
}) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/followers/${profileUserId}`,
          { headers: { Authorization: cookie.get("token") } }
        );

        setFollowers(res.data);
      } catch (error) {
        alert("Error Loading Followers");
      }
      setLoading(false);
    };

    getFollowers();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        followers.length > 0 &&
        followers.map((profileFollower) => {
          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              (following) => following.user === profileFollower.user._id
            ).length > 0;
          return (
            <Row key={profileFollower._id} className="my-1">
              <Col className="d-flex justify-content-between">
                <div>
                  <img
                    src={profileFollower.user.profilePicUrl}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <a href={`/${profileFollower.user.username}`}>
                    <span>{profileFollower.user.name}</span>
                  </a>
                </div>
                <div>
                  <Button>{isFollowing ? "Following" : "Follow"}</Button>
                </div>
              </Col>
            </Row>
          );
        })
      )}
    </>
  );
};

export default Follower;
