import { Row, Col, Nav } from "react-bootstrap";

const Index = ({ user, userFollowStats }) => {
  console.log({ user, userFollowStats });
  return (
    <Row md={12}>
      <Col className="col-md-3" style={{ backgroundColor: "red" }}>
        <Nav className="flex-column">
          <Nav.Link href="/">
            <i class="fa fa-home"></i>Home
          </Nav.Link>
          <Nav.Link href="/messages">
            <i class="fa fa-envelope"></i>Messages
          </Nav.Link>
          <Nav.Link href="/notifications">
            <i class="fa fa-bell"></i>Notifications
          </Nav.Link>
          <Nav.Link href="/account">Account</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Col>
      <Col style={{ backgroundColor: "green" }}>body</Col>
      <Col className="col-md-2" style={{ backgroundColor: "blue" }}>
        search
      </Col>
    </Row>
  );
};

export default Index;
