import React from "react";
import HeadTags from "./HeadTags";
import TopNavbar from "./TopNavbar";
import Container from "react-bootstrap/Container";
import Router from "next/router";
import nProgress from "nprogress";

function Layout({ children }) {
  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  return (
    <>
      <HeadTags />
      <TopNavbar />
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
