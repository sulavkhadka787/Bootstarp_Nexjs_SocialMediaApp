import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { followUser, unfollowUser } from "../../utils/profileActions";

const ProfileHeader = ({
  profile,
  ownAccount,
  loggedUserFollowStats,
  setUserFollowStats,
}) => {
  const [loading, setLoading] = useState(false);

  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === profile.user._id
    ).length > 0;
  return (
    <>
      <Row>
        <Col className="col-md-6">
          <span style={{ fontSize: "40px" }}>{profile.user.name}</span>
          <br />
          <span>{profile.bio}</span>
          <br />
          <br />
          <br />
          <span>No social Media link</span>
        </Col>
        <Col className="col-md-6 d-flex flex-column">
          <div>
            <img
              className="float-end"
              style={{ borderRadius: "50%", height: "300px", width: "300px" }}
              src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
            />
          </div>

          <div className="mx-auto mt-3">
            {!ownAccount && (
              <Button
                style={{ width: "200px", marginLeft: "120px" }}
                onClick={async () => {
                  setLoading(true);
                  isFollowing
                    ? await unfollowUser(profile.user._id, setUserFollowStats)
                    : await followUser(profile.user._id, setUserFollowStats);
                  setLoading(false);
                }}
              >
                {isFollowing ? "following" : "follow"}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProfileHeader;
