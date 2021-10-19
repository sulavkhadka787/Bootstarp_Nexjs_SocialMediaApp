import { useState } from "react";
import CreatePost from "../components/Layout/CreatePost";
import CardPost from "../components/Layout/CardPost";

const Index = ({ user, userFollowStats }) => {
  const [posts, setPosts] = useState(["xx"]);
  return (
    <>
      <CreatePost />
      {posts.length === 0 ? (
        <div>No Posts</div>
      ) : (
        <>
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}{" "}
        </>
      )}
    </>
  );
};

export default Index;
