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
          <Navbar.Brand>FaceBook</Navbar.Brand>
          <Nav fill>
            <Nav.Item>
              <Link href="/login">
                <a className={isActive("/login") ? "text-dark" : "text-white"}>
                  Login
                </a>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link></Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Link href="/signup">
                <a className={isActive("/signup") ? "text-dark" : "text-white"}>
                  Sign-Up
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
