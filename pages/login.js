import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Login = () => {
  return (
    <>
      <Row md={2} className="justify-content-md-center">
        <Col>
          <div className="alert alert-success mb-3 mt-3">
            <i className="fa fa-empire" style={{ fontSize: "36px" }}></i>{" "}
            <strong>Login Here</strong> <br />
            Sign-into your account
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
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
