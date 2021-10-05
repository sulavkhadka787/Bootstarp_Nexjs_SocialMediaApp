import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [userName, setUserName] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {JSON.stringify(user)}
      <Row md={2} className="justify-content-md-center">
        <Col>
          <div className="alert alert-success mb-3 mt-3">
            <i className="fa fa-empire" style={{ fontSize: "36px" }}></i>{" "}
            <strong>Get Started</strong> <br />
            Create New Account
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="alert alert-success mb-3 mt-3">
              <Form.Control
                multiple
                type="file"
                name="media"
                onChange={handleChange}
                accept="/image/*"
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  {usernameAvailable ? (
                    <i
                      className="fa fa-thumbs-up"
                      style={{ color: "blue" }}
                    ></i>
                  ) : (
                    <i
                      className="	fa fa-stop-circle"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (regexUserName.test(e.target.value)) {
                      setUsernameAvailable(true);
                    } else {
                      setUsernameAvailable(false);
                    }
                  }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="bio" />
            </Form.Group>

            <Button
              variant="info"
              className="mb-3"
              onClick={() => setShowSocialLinks(!showSocialLinks)}
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
                    <Form.Control type="text" placeholder="Facebook" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fa fa-twitter"></i>
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="twitter" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i class="fa fa-instagram"></i>
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="instagram" />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fa fa-youtube-play"></i>
                    </InputGroup.Text>
                    <Form.Control type="text" placeholder="youtube" />
                  </InputGroup>
                </Form.Group>
              </Col>
            ) : (
              <br />
            )}

            <Button variant="primary" type="submit" className="mb-3">
              Sign-Up
            </Button>
          </Form>
          <div className="alert alert-success mb-3 mt-3">
            <strong>Existing User ? </strong> <br />
            <a href="/login">Login here instead</a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
