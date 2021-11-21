import { useState } from "react";
import ChatUsers from "./chatUsers";
import ChatlistSearch from "./chatlistsearch";
import MessageInputField from "./MessageInputField";

const Chatbox = ({
  user,
  chats,
  setChats,
  connectedUsers,
  bannerData,
  messages,
  sendMsg,
  divRef,
  deleteMsg,
  deleteChat,
}) => {
  const [showIcon, setShowIcon] = useState(false);
  const { name, profilePicUrl } = bannerData;

  return (
    <div id="container">
      <aside>
        <ChatlistSearch chats={chats} setChats={setChats} />
        {chats.length > 0 && (
          <ChatUsers
            user={user}
            chats={chats}
            connectedUsers={connectedUsers}
            bannerData={bannerData}
            deleteChat={deleteChat}
          />
        )}
      </aside>
      <main>
        <header>
          <img className="chatusers-img" src={profilePicUrl} alt="" />
          <div>
            <h2>Chat with {name}</h2>
            <h3>Enjoy the conversation</h3>
          </div>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png"
            alt=""
          />
        </header>
        <ul id="chat">
          {messages.map((message, index) => {
            const ifYouSender = message.sender === user._id;
            return (
              <li
                key={index}
                className={ifYouSender ? "you" : "me"}
                ref={divRef}
              >
                <div className="entete">
                  <span className="status green"></span>
                  <img
                    src={ifYouSender ? user.profilePicUrl : profilePicUrl}
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                  />
                  <h2>{ifYouSender ? user.name : name}</h2>
                  <h3>10:12AM, Today</h3>
                </div>
                <div className="triangle"></div>
                <div
                  className="message msg-box"
                  onClick={() => setShowIcon(!showIcon)}
                >
                  {message.msg}
                  <div
                    onClick={() => {
                      if (window.confirm("Delele your msg?"))
                        deleteMsg(message._id);
                    }}
                    className={
                      ifYouSender && showIcon ? "msg-del" : "msg-del-none"
                    }
                  >
                    <i className={"fa fa-trash"} style={{ color: "red" }}></i>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <footer>
          <MessageInputField sendMsg={sendMsg} />
        </footer>
      </main>
    </div>
  );
};

export default Chatbox;
