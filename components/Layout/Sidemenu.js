import { logoutUser } from "../../utils/authUser";
import { Nav } from "react-bootstrap";
import Link from "next/Link";

const Sidemenu = ({
  user: { unreadNotification, email, unreadMessage, username },
}) => {
  console.log("unreadmsg", unreadMessage);
  return (
    <>
      <Nav className="flex-column fs-4 mt-3 sticky-top">
        <Nav.Item className="mb-4 text-dark nav-links">
          <i className="fa fa-home"></i>
          <Link href="/">Home</Link>
        </Nav.Item>
        <Nav.Item className="mb-4 nav-links">
          <i
            className={
              unreadMessage
                ? "fa fa-envelope text-danger"
                : "fa fa-envelope text-dark"
            }
          ></i>
          <Link
            href="/messages"
            className={
              unreadMessage
                ? "text-danger nav-links mb-2"
                : "nav-links text-dark mb-2"
            }
          >
            Messages
          </Link>
        </Nav.Item>
        <Nav.Item className="mb-4 nav-links">
          {unreadNotification ? (
            <i className="fa fa-bell" style={{ color: "red" }}></i>
          ) : (
            <i className="fa fa-bell"></i>
          )}

          <Link
            href="/notifications"
            className={
              unreadNotification
                ? "text-danger nav-links mb-2"
                : "nav-links text-dark mb-2"
            }
          >
            Notifications
          </Link>
        </Nav.Item>
        <Nav.Item className="mb-4 nav-links">
          <i className="fa fa-user-circle"></i>
          <Link href={`/${username}`} className="nav-links text-dark mb-2">
            Account
          </Link>
        </Nav.Item>
        <Nav.Item className="mb-4 nav-links">
          <i className="fa fa-stop-circle-o"></i>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => logoutUser(email)}
            className=" text-dark mb-2"
          >
            {" "}
            Logout
          </span>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Sidemenu;
