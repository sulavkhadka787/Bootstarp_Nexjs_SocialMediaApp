import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  return (
    <>
      <Row md={2} className="justify-content-md-center">
        <Col>
          <div className="alert alert-success mb-3 mt-3">
            {errorMsg ? (
              <strong>{errorMsg}</strong>
            ) : (
              <>
                <i className="fa fa-empire" style={{ fontSize: "36px" }}></i>
                <strong>Get Started</strong> <br />
                <span>Create New Account</span>
              </>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              disabled={submitDisabled}
            >
              Sign-In
            </Button>
          </Form>
          <div class="alert alert-success mb-3 mt-3">
            <strong>New User ? </strong> <br />
            <a href="/login">Sign-up here</a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
