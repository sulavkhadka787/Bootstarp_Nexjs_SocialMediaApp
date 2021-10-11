import { Nav } from "react-bootstrap";
const Sidemenu = () => {
  return (
    <>
      <Nav className="flex-column fs-4 mt-3">
        <Nav.Link href="/" className="nav-links text-dark mb-2">
          <i className="fa fa-home"></i> Home
        </Nav.Link>

        <Nav.Link href="/messages" className="nav-links text-dark mb-2">
          <i className="fa fa-envelope"></i> Messages
        </Nav.Link>
        <Nav.Link href="/notifications" className="nav-links text-dark mb-2">
          <i className="fa fa-bell"></i> Notifications
        </Nav.Link>
        <Nav.Link href="/account" className="nav-links text-dark mb-2">
          <i className="fa fa-user-circle"></i> Account
        </Nav.Link>
        <Nav.Link href="/logout" className="nav-links text-dark mb-2">
          <i className="fa fa-stop-circle-o"></i> Logout
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidemenu;
