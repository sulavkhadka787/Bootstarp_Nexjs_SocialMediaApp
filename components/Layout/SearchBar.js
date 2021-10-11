import { useState } from "react";
import { Form, Button, Image, Col } from "react-bootstrap";

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
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
            type="search"
            placeholder="Search"
            name="search"
            onChange={(e) => console.log(e.target.value)}
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
