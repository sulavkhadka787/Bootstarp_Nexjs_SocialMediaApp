import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";

const ChatUsers = ({ chats, connectedUsers }) => {
  const router = useRouter();

  return (
    <>
      <ul>
        {chats.map((c, index) => {
          const isOnline =
            connectedUsers.length > 0 &&
            connectedUsers.filter((user) => user.userId === c.messagesWith)
              .length > 0;
          console.log("isonline", isOnline);
          return (
            <li
              key={index}
              onClick={() =>
                router.push(`/messages?message=${c.messagesWith}`, undefined, {
                  shallow: true,
                })
              }
            >
              <img className="chatusers-img" src={c.profilePicUrl} alt="" />
              <div>
                <h2>{c.name}</h2>

                <h3>
                  <span
                    className={isOnline ? "status green" : "status orange"}
                  ></span>
                  {c.lastMessage.length > 20
                    ? `${c.lastMessage.substring(0, 20)}...`
                    : c.lastMessage}
                  <br />
                  <p>{calculateTime(c.date)}</p>
                </h3>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ChatUsers;
