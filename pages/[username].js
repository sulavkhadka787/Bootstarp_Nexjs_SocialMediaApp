import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { Row, Col } from "react-bootstrap";
import ProfileMenuTabs from "../components/Profile/ProfileMenuTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";

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
  const handleClickItem = (clickedTab) => setActiveItem(clickedTab);

  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);

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
    };

    getPosts();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <ProfileMenuTabs />
          <ProfileHeader />
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
