import { useState, useRef } from "react";
import { Form, Row, Col, Image, Button } from "react-bootstrap";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";

const CreatePost = ({ user, setPosts }) => {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    height: "150px",
    width: "150px",
    textAlign: "center",
    border: "dotted",
    borderColor: highlighted ? "green" : "black",
    cursor: "pointer",
    paddingTop: media === null && "60px",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return setError("Error Uploading Image");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );
    setMedia(null);
    URL.revokeObjectURL(mediaPreview);
    setMediaPreview(null);
    setLoading(false);
  };
  return (
    <>
      <Row>
        <Col>
          {error && (
            <div className="alert alert-success mb-3 mt-3">
              <strong style={{ color: "red" }}>
                Error! <br />
                {error}
              </strong>
            </div>
          )}
        </Col>
      </Row>
      <Form className="mt-3" onSubmit={handleSubmit}>
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
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                placeholder="Whats Happening"
                value={newPost.text}
                onChange={handleChange}
              />
            </Col>
            <Row className="col-md-4 mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Add Location </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={newPost.location}
                  onChange={handleChange}
                />

                <Form.Control
                  ref={inputRef}
                  onChange={handleChange}
                  hidden
                  multiple
                  className="mt-3"
                  type="file"
                  name="media"
                  accept="image/*"
                />
              </Form.Group>
            </Row>
          </Row>
        </Form.Group>
        <div
          style={addStyles()}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(true);
            const droppedFile = Array.from(e.dataTransfer.files);
            setMedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}
        >
          {media === null ? (
            <i className="fa fa-plus"></i>
          ) : (
            <img
              src={mediaPreview}
              style={{ height: "145px", width: "145px" }}
            />
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          className="mt-4"
          style={{ width: "100px" }}
        >
          Post
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
