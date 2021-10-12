import CreatePost from "../components/Layout/CreatePost";

const Index = ({ user, userFollowStats }) => {
  console.log({ user, userFollowStats });
  return (
    <>
      <CreatePost />
    </>
  );
};

export default Index;
