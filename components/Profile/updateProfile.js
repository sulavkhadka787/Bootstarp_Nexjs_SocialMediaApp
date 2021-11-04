import { useState, useRef } from "react";
import { Row, Col, Form, Image, Button, InputGroup } from "react-bootstrap";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { profileUpdate } from "../../utils/profileActions";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let profilePicUrl;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setLoading(false);
      return setErrorMsg("Error uploading image");
    }

    await profileUpdate(profile, setLoading, setErrorMsg, profilePicUrl);
  };

  return (
    <>
      <Row>
        <Col>
          {errorMsg && (
            <div className="alert alert-success mb-3 mt-3">
              <strong style={{ color: "red" }}>
                Error!
                <br />
                {errorMsg}
              </strong>
            </div>
          )}
        </Col>
      </Row>
      <Form className="mt-3" onSubmit={handleSubmit}>
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
                src={mediaPreview ? mediaPreview : profile.profilePicUrl}
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
              onChange={handleChange}
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
                    name="facebook"
                    value={profile.facebook}
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
                    name="twitter"
                    value={profile.twitter}
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
                    name="instagram"
                    value={profile.instagram}
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
                    name="youtube"
                    value={profile.youtube}
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
          Update-Profile
        </Button>
      </Form>
    </>
  );
};

export default UpdateProfile;
