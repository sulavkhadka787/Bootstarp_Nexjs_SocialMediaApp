import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") },
});

export const submitNewPost = async (
  text,
  location,
  picUrl,
  setPosts,
  setNewPost,
  setError
) => {
  try {
    //const res = await Axios.post("/", { text, location, picUrl });
    const res = await axios.post(
      `${baseUrl}/api/posts`,
      { text, location, picUrl },
      {
        headers: { Authorization: cookie.get("token") },
      }
    );
    setPosts((prev) => [res.data, ...prev]);
    setNewPost({ text: "", location: "" });
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

export const deletePost = async (postId, setPosts, setShowToastr) => {
  try {
    await Axios.delete(`/${postId}`);
    setPosts((prev) => prev.filter((post) => post._id != postId));
    setShowToastr(true);
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const likePost = async (postId, userId, setLikes, like = true) => {
  try {
    if (like) {
      //await Axios.post(`/like/${postId}`);
      await axios.post(
        `${baseUrl}/api/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      );
      setLikes((prev) => [...prev, { user: userId }]);
    } else if (!like) {
      //await Axios.put(`/unlike/${postId}`);
      await axios.put(
        `${baseUrl}/api/posts/unlike/${postId}`,
        {},
        {
          headers: { Authorization: cookie.get("token") },
        }
      );
      setLikes((prev) => prev.filter((liked) => liked.user !== userId));
    }
  } catch (error) {
    console.log("likepost-error===>>", error);
    alert(catchErrors(error));
  }
};

export const postComment = async (postId, user, text, setComments, setText) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/posts/comment/${postId}`,
      { text },
      {
        headers: { Authorization: cookie.get("token") },
      }
    );
    const newComment = {
      _id: res.data,
      user,
      text,
      date: Date.now(),
    };
    setComments((prev) => [newComment, ...prev]);
    setText("");
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const deleteComment = async (postId, commentId, setComments) => {
  try {
    await Axios.delete(`/${postId}/${commentId}`);
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  } catch (error) {
    alert(catchErrors(error));
  }
};
