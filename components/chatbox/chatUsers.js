import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";

const ChatUsers = ({ chats }) => {
  const router = useRouter();
  const isOnline = true;

  return (
    <>
      <ul>
        {chats.map((c, index) => (
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
        ))}
      </ul>
    </>
  );
};

export default ChatUsers;
