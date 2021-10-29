import { Row, Col } from "react-bootstrap";

const ProfileHeader = () => {
  return (
    <>
      <Row>
        <Col className="col-md-6">
          <span style={{ fontSize: "40px" }}>Sulav 787</span>
          <br />
          <span>Bio of sulav 787 bio</span>
          <br />
          <br />
          <br />
          <span>No social Media link</span>
        </Col>
        <Col className="col-md-6">
          <img
            className="float-end"
            style={{ borderRadius: "50%", height: "300px", width: "300px" }}
            src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
          />
        </Col>
      </Row>
    </>
  );
};

export default ProfileHeader;
