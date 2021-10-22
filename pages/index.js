import { useState } from "react";
import CreatePost from "../components/Layout/CreatePost";
import CardPost from "../components/Layout/CardPost";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const Index = ({ user, userFollowStats, postsData, errorLoading }) => {
  const [posts, setPosts] = useState(postsData || []);

  if (posts.length === 0 || errorLoading) {
    return <div>No Posts</div>;
  }
  return (
    <>
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
