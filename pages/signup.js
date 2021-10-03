import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

const Signup = () => {
  return (
    <>
      <Row md={2} className="justify-content-md-center">
        <Col>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control type="text" placeholder="Username" />
              </InputGroup>
            </Form.Group>
            <Col className="col-md-8">
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <i class="fa fa-facebook"></i>
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Facebook" />
                </InputGroup>
              </Form.Group>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
