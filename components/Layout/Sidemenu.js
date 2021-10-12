import { logoutUser } from "../../utils/authUser";
import { Nav } from "react-bootstrap";

const Sidemenu = ({
  user: { unreadNotification, email, unreadMessage, username },
}) => {
  return (
    <>
      <Nav className="flex-column fs-4 mt-3 sticky-top">
        <Nav.Item>
          <Nav.Link href="/" className="nav-links text-dark mb-2">
            <i className="fa fa-home"></i> Home
          </Nav.Link>
        </Nav.Item>

        <Nav.Link
          href="/messages"
          className={
            unreadMessage
              ? "text-danger nav-links mb-2"
              : "nav-links text-dark mb-2"
          }
        >
          <i className="fa fa-envelope"></i> Messages
        </Nav.Link>
        <Nav.Link
          href="/notifications"
          className={
            unreadNotification
              ? "text-danger nav-links mb-2"
              : "nav-links text-dark mb-2"
          }
        >
          <i className="fa fa-bell"></i> Notifications
        </Nav.Link>
        <Nav.Link href={`/${username}`} className="nav-links text-dark mb-2">
          <i className="fa fa-user-circle"></i> Account
        </Nav.Link>
        <Nav.Link
          onClick={() => logoutUser(email)}
          className="nav-links text-dark mb-2"
        >
          <i className="fa fa-stop-circle-o"></i> Logout
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidemenu;
