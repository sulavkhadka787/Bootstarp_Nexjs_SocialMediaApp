import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import { Row, Col, Button } from "react-bootstrap";
import { followUser, unfollowUser } from "../../utils/profileActions";

const Following = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId,
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${baseUrl}/api/profile/following/${profileUserId}`,
          { headers: { Authorization: cookie.get("token") } }
        );
        console.log("following", res.data);
        setFollowing(res.data);
      } catch (error) {
        alert("Error Loading Followers");
      }

      setLoading(false);
    };
    getFollowing();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        following.length > 0 &&
        following.map((profileFollowing) => {
          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              (following) => following.user === profileFollowing.user._id
            ).length > 0;
          return (
            <Row key={profileFollowing._id} className="my-1">
              <Col className="d-flex justify-content-between">
                <div>
                  <img
                    src={profileFollowing.user.profilePicUrl}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <a href={`/${profileFollowing.user.username}`}>
                    <span>{profileFollowing.user.name}</span>
                  </a>
                </div>
                <div>
                  <Button
                    onClick={async () => {
                      setFollowLoading(true);
                      isFollowing
                        ? await unfollowUser(
                            profileFollowing.user._id,
                            setUserFollowStats
                          )
                        : await followUser(
                            profileFollowing.user._id,
                            setUserFollowStats
                          );
                      setFollowLoading(false);
                    }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </Col>
            </Row>
          );
        })
      )}
    </>
  );
};

export default Following;
