import { useState, useRef } from "react";
import { Row, Col, Form, Image, Button, InputGroup } from "react-bootstrap";

const UpdateProfile = ({ Profile }) => {
  const [profile, setProfile] = useState({
    profilePicUrl: Profile.user.profilePicUrl,
    bio: Profile.bio || "",
    facebook: (Profile.social && Profile.social.facebook) || "",
    youtube: (Profile.social && Profile.social.youtube) || "",
    instagram: (Profile.social && Profile.social.instagram) || "",
    twitter: (Profile.social && Profile.social.twitter) || "",
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const [highlighted, setHighlighted] = useState(false);

  const [mediaPreview, setMediaPreview] = useState(null);

  const [media, setMedia] = useState(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const inputRef = useRef();

  return (
    <>
      <Row>
        <Col>
          {errorMsg && (
            <div className="alert alert-success mb-3 mt-3">
              <strong style={{ color: "red" }}>
                Error!
                <br />
                {error}
              </strong>
            </div>
          )}
        </Col>
      </Row>
      <Form className="mt-3">
        <Row className="d-flex flex-column">
          <Col className="col-md-10 mx-auto">
            <Form.Control
              ref={inputRef}
              hidden
              multiple
              type="file"
              name="media"
              accept="image/*"
              onChange={handleChange}
            />

            <div
              onClick={() => inputRef.current.click()}
              style={{ cursor: "pointer" }}
            >
              <img
                src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
                style={{ height: "500px", width: "700px" }}
              />
            </div>
          </Col>
          <Col className="col-md-12 mt-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="bio"
              name="bio"
              value={profile.bio}
            />
          </Col>
          <Button
            variant="info"
            className="my-3 mx-3"
            onClick={() => setShowSocialLinks(!showSocialLinks)}
            style={{ width: "300px" }}
          >
            @ Add Social Media Links
          </Button>
          {showSocialLinks ? (
            <Col className="col-md-8">
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fa fa-facebook"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Facebook"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-twitter"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="twitter"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fa fa-instagram"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="instagram"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-youtube-play"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="youtube"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          ) : (
            <br />
          )}
        </Row>
        <Button
          variant="primary"
          type="submit"
          className="mb-3"
          disabled={profile.bio === "" || loading}
        >
          Sign-Up
        </Button>
      </Form>
    </>
  );
};

export default UpdateProfile;
