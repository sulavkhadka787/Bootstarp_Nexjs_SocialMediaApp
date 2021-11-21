import { useState, useEffect, useRef } from "react";
import CreatePost from "../components/Layout/CreatePost";
import CardPost from "../components/Layout/CardPost";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import cookie from "js-cookie";
import io from "socket.io-client";
import NotificationPortal from "../components/home/notificationPortal";

const Index = ({ user, userFollowStats, postsData, errorLoading }) => {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const [newNotification, setNewNotification] = useState(null);
  const [notificationPopup, showNotificationPopup] = useState(false);

  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });
    }

    document.title = `Welcome, ${user.name}`;
  }, [user]);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });
      if (res.data.length === 0) setHasMore(false);
      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching post");
    }
  };

  return (
    <>
      {notificationPopup && newNotification !== null && (
        <NotificationPortal
          newNotification={newNotification}
          notificationPopup={notificationPopup}
          showNotificationPopup={showNotificationPopup}
        />
      )}
      {showToastr && <PostDeleteToastr />}
      <CreatePost user={user} setPosts={setPosts} />
      {posts.length === 0 ? (
        <div>No Posts</div>
      ) : (
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>No More Posts</h4>}
          dataLength={posts.length}
        >
          {posts.map((post, index) => (
            <CardPost
              socket={socket}
              key={index}
              post={post}
              setPosts={setPosts}
              user={user}
              setShowToastr={setShowToastr}
            />
          ))}{" "}
        </InfiniteScroll>
      )}
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
