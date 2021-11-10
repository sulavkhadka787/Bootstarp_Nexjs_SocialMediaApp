import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import catchErrors from "../../utils/catchErrors";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Link from "next/link";

const LikeList = ({ postId }) => {
  const [likeList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLikeList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/posts/like/${postId}`, {
        headers: { Authorization: cookie.get("token") },
      });

      setLikesList(res.data);
    } catch (error) {
      alert(catchErrors(error));
    }

    setLoading(false);
  };

  useEffect(() => {
    getLikeList();
  }, []);
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={
        <div>
          <Popover
            style={{
              width: "600px",
              color: "red",
              bottom: "400px",
              position: "relative",
              zIndex: "1",
            }}
          >
            <Popover.Title as="h3">Liked By</Popover.Title>
            <Popover.Content>
              <ui>
                {likeList.map((like) => (
                  <Link key={like._id} className="d-block" href="#">
                    {like.user.name}
                  </Link>
                ))}
              </ui>
            </Popover.Content>
          </Popover>
        </div>
      }
    >
      <div
        className="d-inline"
        style={{ cursor: "pointer", borderBottom: "1px solid grey" }}
      >
        {likeList.length} {likeList.length === 1 ? "like" : "likes"}
      </div>
    </OverlayTrigger>
  );
};

export default LikeList;
