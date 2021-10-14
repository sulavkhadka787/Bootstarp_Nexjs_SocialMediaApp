import { useState, useRef } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";

const CreatePost = () => {
  const inputRef = useRef();

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const addStyles = () => ({
    height: "150px",
    width: "150px",
    textAlign: "center",
    border: "dotted",
    borderColor: highlighted ? "green" : "black",
    cursor: "pointer",
    paddingTop: media === null && "60px",
  });
  return (
    <>
      <Form className="mt-3">
        <Form.Group>
          <Row className="d-flex">
            <Col className="col-md-1">
              <Image
                style={{ height: "40px", width: "40px" }}
                roundedCircle
                src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
              />
            </Col>

            <Col className="col-md-10 ">
              {" "}
              <Form.Control as="textarea" rows={3} />
            </Col>
            <Row className="col-md-4 mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Add Location </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                />

                <Form.Control
                  ref={inputRef}
                  hidden
                  multiple
                  className="mt-3"
                  type="file"
                  name="media"
                  accept="/image/*"
                />
              </Form.Group>
            </Row>
          </Row>
        </Form.Group>
        <div style={addStyles()} onClick={() => inputRef.current.click()}>
          {media === null ? (
            <i className="fa fa-plus"></i>
          ) : (
            <img
              src={mediaPreview}
              style={{ height: "145px", width: "145px" }}
            />
          )}
        </div>
      </Form>
    </>
  );
};

export default CreatePost;
