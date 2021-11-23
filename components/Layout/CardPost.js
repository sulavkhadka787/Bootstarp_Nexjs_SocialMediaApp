import { useState } from "react";
import { Container, Modal, Button, Row, Col, Image } from "react-bootstrap";
import Example from "./Example";
import PostComments from "../Posts/PostComments";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";
import CommentInputField from "../Posts/CommentInputField";
import { likePost } from "../../utils/postActions";
import LikeList from "../Posts/LikeList";
import ImageModal from "../Posts/ImageModal";
import NoImageModal from "../Posts/NoImageModal";

const CardPost = ({ user, post, setPosts, setShowToastr, socket }) => {
  const [modalShow, setModalShow] = useState(false);

  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [error, setError] = useState(null);

  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user === user._id).length > 0;

  const onHide = () => {
    setModalShow(false);
  };

  return (
    <>
      <Container className="my-5" style={{ border: "1px solid" }}>
        {post.picUrl && (
          <Row className="my-2">
            <img src={post.picUrl} onClick={() => setModalShow(true)} />
          </Row>
        )}

        <Row
          className="mt-3 mb-3 justify-content-between"
          onClick={() => {
            !post.picUrl && setModalShow(true);
          }}
        >
          <Col className="d-flex flex-grow-1 col-md-10">
            <div>
              <Image
                style={{ height: "40px", width: "40px" }}
                roundedCircle
                src={user.profilePicUrl}
              />
            </div>

            <div className="px-3">
              {" "}
              <Link href={`/${post.user.username}`}>
                <a>{post.user.username}</a>
              </Link>
              <br />
              <span>{calculateTime(post.createdAt)}</span> |{" "}
              {post.location && <span>{post.location}</span>}
            </div>
          </Col>
          {(user.role === "root" || post.user._id === user._id) && (
            <Col className="col-md-2">
              <Example
                post={post}
                setPosts={setPosts}
                setShowToastr={setShowToastr}
              />
            </Col>
          )}
        </Row>
        <Row>
          <Col>{post.text}</Col>
        </Row>
        <hr />
        <Row>
          <div className="d-inline">
            <i
              className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                console.log("onclick cliced");
                if (socket.current) {
                  console.log("socket current likePost");
                  socket.current.emit("likePost", {
                    postId: post._id,
                    userId: user._id,
                    like: isLiked ? false : true,
                  });

                  socket.current.on("postLiked", () => {
                    console.log("socket current postLiked");
                    if (isLiked) {
                      setLikes((prev) =>
                        prev.filter((like) => like.user !== user._id)
                      );
                    }
                    //
                    else {
                      setLikes((prev) => [...prev, { user: user._id }]);
                    }
                  });
                } else {
                  likePost(
                    post._id,
                    user._id,
                    setLikes,
                    isLiked ? false : true
                  );
                }
              }}
            ></i>
            {"   "}
            {likes.length > 0 && <LikeList postId={post._id} />}
            {"  "}
            <i className="fa fa-comment-o"></i>
          </div>
        </Row>
        <Row>
          {comments.map((comment, i) => (
            <PostComments
              key={comment._id}
              post={post}
              comment={comment}
              user={user}
              setComments={setComments}
            />
          ))}
        </Row>
        <CommentInputField
          user={user}
          postId={post._id}
          setComments={setComments}
        />
      </Container>

      <Modal show={modalShow} onHide={onHide} size="lg" className="modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {post.picUrl ? (
            <ImageModal
              comments={comments}
              likes={likes}
              isLiked={isLiked}
              user={user}
              post={post}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
              setComments={setComments}
            />
          ) : (
            <NoImageModal
              comments={comments}
              likes={likes}
              isLiked={isLiked}
              user={user}
              post={post}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
              setComments={setComments}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardPost;
