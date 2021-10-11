import Sidemenu from "../components/Layout/Sidemenu";
import SearchBar from "../components/Layout/SearchBar";
import { Container, Row, Col, Form, Image } from "react-bootstrap";

const Index = ({ user, userFollowStats }) => {
  console.log({ user, userFollowStats });
  return (
    <Container fluid>
      <Row md={12}>
        <Col className="col-md-2">
          <Sidemenu />
        </Col>
        <Col className="mt-3 post-area">
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
              </Row>
            </Form.Group>
          </Form>
        </Col>
        <Col className="col-md-3 mt-3">
          <SearchBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
