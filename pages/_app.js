import App from "next/app";
import Layout from "../components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.css";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default MyApp;
