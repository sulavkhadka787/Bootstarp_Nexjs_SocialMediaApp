import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { deletePost } from "../../utils/postActions";

// const Overlay = () => {
//   const popover = (
//     <Popover positionLeft={200} positionTop={50}>
//       <Popover.Title as="h3">Title One</Popover.Title>
//       <Popover.Content>Test Content</Popover.Content>
//     </Popover>
//   );
//   return popover;
// };

const Example = ({ post, setPosts, setShowToastr }) => {
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
              <Button
                className="btn-danger"
                onClick={() => deletePost(post._id, setPosts, setShowToastr)}
              >
                Delete
              </Button>
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
            cursor: "pointer",
          }}
        ></i>
      </div>
    </OverlayTrigger>
  );
};

export default Example;
