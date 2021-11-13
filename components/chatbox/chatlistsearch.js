import { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";

let cancel;

const ChatlistSearch = ({ chats, setChats }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const router = useRouter();

  const handleChange = async (e) => {
    const { value } = e.target;
    if (value.length === 0) {
      setText("");
      setResults([]);
      return;
    }
    setText(value);
    if (value.trim().length === 0) return;
    setLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");
      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => (cancel = canceler)),
      });
      console.log("res-data-chatusers==>>", res);
      if (res.data.length === 0) {
        results.length > 0 && setResults([]);
        return setLoading(false);
      }

      setResults(res.data);
    } catch (error) {
      alert("Error Searching");
    }

    setLoading(false);
  };

  const addChat = (r) => {
    console.log("add-chat", r);
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === r._id).length > 0;
    if (alreadyInChat) {
      return router.push(`/messages?message=${r._id}`);
    } else {
      const newChat = {
        messagesWith: r._id,
        name: r._name,
        profilePicUrl: r.profilePicUrl,
        lastMessage: "",
        date: Date.now(),
      };

      setChats((prev) => [newChat, ...prev]);
      return router.push(`/messages?message=${r._id}`);
    }
  };

  return (
    <>
      <header>
        <div>
          <input
            type="search"
            placeholder="search"
            value={text}
            onChange={handleChange}
          />
          {results && results.length > 0 && (
            <ul>
              {results.map((r, index) => (
                <li
                  key={index}
                  onClick={() => {
                    addChat(r);
                    setText("");
                    setResults([]);
                  }}
                >
                  <img src={r.profilePicUrl} alt="" className="chatusers-img" />
                  <div>
                    <h2>{r.username}</h2>
                    <h3>
                      <span></span>
                      Hello Hi
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </>
  );
};

export default ChatlistSearch;
