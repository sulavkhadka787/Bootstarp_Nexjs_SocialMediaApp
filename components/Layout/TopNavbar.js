import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import Link from "next/link";

const TopNavbar = () => {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  console.log(router.pathname, "======", isActive);
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <i className="fa fa-facebook-square"></i> FaceBook
          </Navbar.Brand>
          <Nav fill>
            <Nav.Item>
              <Link href="/login">
                <a className={isActive("/login") ? "text-white" : "text-dark"}>
                  <strong>Login</strong>
                </a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link></Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Link href="/signup">
                <a className={isActive("/signup") ? "text-white" : "text-dark"}>
                  <strong>Sign-Up</strong>
                </a>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavbar;
