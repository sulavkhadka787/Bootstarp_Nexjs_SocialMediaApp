import { useState } from "react";
import { Container, Modal, Button, Row, Col, Image } from "react-bootstrap";
import Example from "./Example";

const CardPost = ({ user, post, setPosts }) => {
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
      <Container className="mb-5">
        <Row className="my-2">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            onClick={() => setModalShow(true)}
          />
        </Row>

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
              <b>Sulav Khadka</b>
              <br />
              2021 Oct 17th
            </div>
          </Col>

          <Col className="col-md-2">
            <Example />
          </Col>
        </Row>
        <Row>
          <Col>This is first post from Sulav</Col>
        </Row>
        <hr />
        <Row>
          <span>
            <i class="fa fa-heart" style={{ color: "red" }}></i>{" "}
            <span>2 Likes </span>
            <i class="fa fa-comment-o"></i>
          </span>
        </Row>
        <Row className="d-flex flex-column">
          <input
            type="text"
            className="mt-2"
            style={{ padding: "5px 0", borderRadius: "5px", width: "95%" }}
            placeholder="Add Comment"
          />
          <Button className="btn-primary mt-2" style={{ width: "200px" }}>
            Post{" "}
          </Button>
        </Row>
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
