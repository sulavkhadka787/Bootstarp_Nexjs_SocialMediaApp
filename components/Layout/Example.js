import {
  Container,
  Modal,
  Button,
  Row,
  Col,
  Image,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

const Overlay = () => {
  const popover = (
    <Popover positionLeft={200} positionTop={50}>
      <Popover.Title as="h3">Title One</Popover.Title>
      <Popover.Content>Test Content</Popover.Content>
    </Popover>
  );
  return popover;
};

const Example = () => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose
      overlay={
        <div>
          <Popover style={{ width: "600px", color: "red" }}>
            <Popover.Title as="h3">Are you sure ?</Popover.Title>
            <Popover.Content>
              <Button className="btn-danger">Delete</Button>
            </Popover.Content>
          </Popover>
        </div>
      }
    >
      <div>
        <i
          className="fa fa-trash-o float-end"
          style={{
            fontSize: "32px",
            color: "red",
            marginRight: "0px",
          }}
        ></i>
      </div>
    </OverlayTrigger>
  );
};

export default Example;
