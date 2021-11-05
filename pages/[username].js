import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { Row, Col } from "react-bootstrap";
import ProfileMenuTabs from "../components/Profile/ProfileMenuTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Cardpost from "../components/Layout/CardPost";
import Following from "../components/Profile/Following";
import Follower from "../components/Profile/Follower";
import UpdateProfile from "../components/Profile/updateProfile";
import Settings from "../components/Profile/Settings";

function ProfilePage({
  profile,
  followersLength,
  followingLength,
  errorLoading,
  user,
  userFollowStats,
}) {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToastr, setShowToastr] = useState(false);

  const [activeItem, setActiveItem] = useState("profile");
  const handleItemClick = (clickedTab) => setActiveItem(clickedTab);

  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  const ownAccount = profile.user._id === user._id;

  if (errorLoading) return <div>No Posts</div>;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const { username } = router.query;
        const token = cookie.get("token");

        const res = await axios.get(
          `${baseUrl}/api/profile/posts/${username}`,
          { headers: { Authorization: token } }
        );

        setPosts(res.data);
      } catch (error) {
        alert("Error Loading Posts");
      }
      setLoading(false);
    };

    getPosts();
  }, [router.query.username]);

  return (
    <>
      <Row>
        <Col>
          <ProfileMenuTabs
            activeItem={activeItem}
            handleItemClick={handleItemClick}
            loggedUserFollowStats={loggedUserFollowStats}
            followersLength={followersLength}
            ownAccount={ownAccount}
            followingLength={followingLength}
          />
          {activeItem === "profile" && (
            <>
              <ProfileHeader
                profile={profile}
                ownAccount={ownAccount}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
              />
              {loading ? (
                <div>Loading...</div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Cardpost
                    key={post._id}
                    user={user}
                    post={post}
                    setPosts={setPosts}
                    setShowToastr={setShowToastr}
                  />
                ))
              ) : (
                <div>No posts</div>
              )}
            </>
          )}

          {activeItem === "following" && (
            <Following
              user={user}
              loggedUserFollowStats={loggedUserFollowStats}
              setUserFollowStats={setUserFollowStats}
              profileUserId={profile.user._id}
            />
          )}

          {activeItem === "followers" && (
            <Follower
              user={user}
              loggedUserFollowStats={loggedUserFollowStats}
              setUserFollowStats={setUserFollowStats}
              profileUserId={profile.user._id}
            />
          )}

          {activeItem === "updateProfile" && (
            <UpdateProfile Profile={profile} />
          )}

          {activeItem === "settings" && <Settings />}
        </Col>
      </Row>
    </>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;
    return { profile, followersLength, followingLength };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ProfilePage;
