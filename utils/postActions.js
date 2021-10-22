import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") },
});

export const submitNewPost = async (
  user,
  text,
  location,
  picUrl,
  setPosts,
  setNewPost,
  setError
) => {
  console.log("text,locaiotn====", text, location, user, picUrl);
  try {
    const res = await Axios.post("/", { text, location, picUrl });
    const newPost = {
      _id: res.data,
      user,
      text,
      location,
      picUrl,
      likes: [],
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setNewPost({ text: "", location: "" });
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};
