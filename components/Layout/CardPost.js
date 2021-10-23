import { useState } from "react";
import { Container, Modal, Button, Row, Col, Image } from "react-bootstrap";
import Example from "./Example";
import PostComments from "../Posts/PostComments";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";
import CommentInputField from "../Posts/CommentInputField";

const CardPost = ({ user, post, setPosts, setShowToastr }) => {
  const [modalShow, setModalShow] = React.useState(false);

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

        <Row className="mt-3 mb-3 justify-content-between">
          <Col className="d-flex flex-grow-1 col-md-10">
            <div>
              <Image
                style={{ height: "40px", width: "40px" }}
                roundedCircle
                src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
              />
            </div>

            <div className="px-3">
              {" "}
              <Link href={`/${post.user.username}`}>
                <a>Sulav Khadka</a>
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
          <span>
            {isLiked ? (
              <i className="fa fa-heart" style={{ color: "red" }}></i>
            ) : (
              <i class="fa fa-heart-o"></i>
            )}

            {likes.length > 0 && (
              <span>
                {" "}
                {`${likes.length} ${
                  likes.length === 1 ? "like" : "likes"
                }`}{" "}
              </span>
            )}
            {"   "}
            <i className="fa fa-comment-o"></i>
          </span>
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
          <img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardPost;
