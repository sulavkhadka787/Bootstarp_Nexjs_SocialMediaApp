import { useState } from "react";
import calculateTime from "../../utils/calculateTime";
import { Col, Image } from "react-bootstrap";
import Link from "next/link";

const PostComments = ({ post, comment, user, setComments }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <Col className="d-flex flex-grow-1 col-md-10 my-3">
        <div>
          <Image
            style={{ height: "40px", width: "40px" }}
            rounded
            src={comment.user.profilePicUrl}
          />
        </div>
        <div className="px-1">
          <Link href={`/${post.user.username}`}>
            <>
              <a>{comment.user.name}</a>
              <span>{calculateTime(comment.date)} </span>
            </>
          </Link>
          <br />
          <div className="mt-1 px-2">
            <span>{comment.text}</span>
          </div>
          {(user.role === "root" || comment.user._id === user._id) && (
            <div className="px-2">
              <i
                className="fa fa-trash-o"
                style={{
                  fontSize: "18px",
                  color: "red",
                  marginRight: "0px",
                }}
              ></i>
            </div>
          )}
        </div>
      </Col>
    </>
  );
};

export default PostComments;
