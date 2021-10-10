import React from "react";
import HeadTags from "./HeadTags";
import TopNavbar from "./TopNavbar";
import Container from "react-bootstrap/Container";
import Router, { useRouter } from "next/router";
import nProgress from "nprogress";

function Layout({ children }) {
  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  const router = useRouter();
  console.log(router.pathname);

  return (
    <>
      <HeadTags />
      {router.pathname != "/login" ||
        (router.pathname != "/signin" && <TopNavbar />)}

      <div>{children}</div>
    </>
  );
}

export default Layout;
