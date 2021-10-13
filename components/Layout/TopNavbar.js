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
              <Link
                href="/login"
                className={isActive("/login") ? "font-white" : "font-dark"}
              >
                Login
              </Link>
            </Nav.Item>
            <div>|</div>
            <Nav.Item>
              <Link
                href="/signup"
                className={isActive("/signup") ? "font-white" : "font-dark"}
              >
                Sign-Up
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavbar;
