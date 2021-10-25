import { useState, useEffect } from "react";
import CreatePost from "../components/Layout/CreatePost";
import CardPost from "../components/Layout/CardPost";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import { PostDeleteToastr } from "../components/Layout/Toastr";

const Index = ({ user, userFollowStats, postsData, errorLoading }) => {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);

  useEffect(() => {
    document.title = `Welcome, ${user.name}`;
  }, [user]);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  return (
    <>
      <div>Username:{user.username}</div>
      {showToastr && <PostDeleteToastr />}
      <CreatePost user={user} setPosts={setPosts} />
      {posts.length === 0 ? (
        <div>No Posts</div>
      ) : (
        <>
          {posts.map((post) => (
            <CardPost
              key={post._id}
              post={post}
              setPosts={setPosts}
              user={user}
              setShowToastr={setShowToastr}
            />
          ))}{" "}
        </>
      )}
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
