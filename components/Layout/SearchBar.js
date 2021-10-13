import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import baseUrl from "../../utils/baseUrl";
import { Form, Button, Image, Col } from "react-bootstrap";

let cancel;

const SearchBar = () => {
  const [text, setText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);
    setLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });
      if (res.data.length === 0) return setLoading(false);
      console.log("res-data", res.data);
      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col className="col-md-8">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setShowDropdown(true);
            console.log("submit");
          }}
          className="d-flex"
        >
          <Form.Control
            required
            value={text}
            type="search"
            placeholder="Search"
            name="search"
            onChange={handleChange}
          />
          <Button variant="secondary" type="submit">
            <i className="fa fa-search"></i>
          </Button>
        </Form>
        <div className={showDropdown ? "show" : "dropdown-content"}>
          <a href="#about">
            <Image
              style={{ height: "20px", width: "20px" }}
              roundedCircle
              src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
            />
            {"  "}
            About
          </a>
          <a href="#base">Base</a>
          <a href="#blog">Blog</a>
        </div>
      </Col>
    </>
  );
};

export default SearchBar;
