import { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import LikeList from "./LikeList";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";

const ImageModal = ({
  user,
  post,
  setPosts,
  setShowToastr,
  isLiked,
  likes,
  comments,
  setComments,
}) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Container className="my-5" style={{ border: "1px solid" }}>
      <Row className="my-2 d-flex">
        <Col className="col-md-4">
          {post.picUrl && (
            <img
              src={post.picUrl}
              onClick={() => setModalShow(true)}
              style={{ width: "100%", height: "300px" }}
            />
          )}
        </Col>
        <Col className="col-md-8">
          <Col className="d-flex flex-column">
            <div style={{ marginLeft: "-390px" }}>
              <Image
                style={{ height: "40px", width: "40px" }}
                roundedCircle
                src={user.profilePicUrl}
              />
              <Link href={`/${post.user.username}`}>
                <a style={{ color: "blue", fontSize: "20px" }}>
                  {post.user.username}
                </a>
              </Link>
            </div>

            <div
              style={{
                marginLeft: "-300px",
                marginTop: "-15px",
                fontSize: "12px",
              }}
              className="d-flex flex-column"
            >
              <span>
                {calculateTime(post.createdAt)} |
                {post.location && <span>{post.location}</span>}
              </span>
            </div>
            <div
              style={{
                marginLeft: "-250px",

                fontSize: "25px",
              }}
            >
              {post.text}
            </div>
            <hr />
            <div
              className="d-inline"
              style={{
                marginLeft: "-420px",
                marginTop: "-10px",
              }}
            >
              {isLiked ? (
                <i
                  className="fa fa-heart"
                  style={{ color: "red" }}
                  onClick={() => likePost(post._id, user._id, setLikes, false)}
                ></i>
              ) : (
                <i
                  className="fa fa-heart-o"
                  onClick={() => likePost(post._id, user._id, setLikes, true)}
                ></i>
              )}
              {"   "}
              {likes.length > 0 && <LikeList postId={post._id} />}
              {"  "}
              <i className="fa fa-comment-o"></i>
            </div>
            <div style={{ marginLeft: "15px" }}>
              {" "}
              {comments.map((comment, i) => (
                <PostComments
                  key={comment._id}
                  post={post}
                  comment={comment}
                  user={user}
                  setComments={setComments}
                />
              ))}
            </div>
            <div>
              <CommentInputField
                user={user}
                postId={post._id}
                setComments={setComments}
              />
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageModal;
