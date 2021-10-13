import React from "react";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";

import Sidemenu from "./Sidemenu";
import SearchBar from "./SearchBar";
import CreatePost from "./CreatePost";
import HeadTags from "./HeadTags";
import TopNavbar from "./TopNavbar";
import { Container, Row, Col } from "react-bootstrap";

function Layout({ children, user }) {
  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  const router = useRouter();
  console.log(router.pathname);

  return (
    <>
      <HeadTags />
      {user ? (
        <Container fluid>
          <Row md={12}>
            <Col className="col-md-2 mt-4">
              <Sidemenu user={user} />
            </Col>
            <Col className="mt-3 post-area">
              <>{children}</>
            </Col>

            <Col className="col-md-3 mt-3">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <TopNavbar />
          <div>{children}</div>
        </>
      )}
    </>
  );
}

export default Layout;
