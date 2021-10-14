import { useState, useRef } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import baseUrl from "../../utils/baseUrl";
import Link from "next/link";
import { Form, Button, Image, Col } from "react-bootstrap";

let cancel;

const SearchBar = () => {
  const [text, setText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const inputRef = useRef();

  const handleChange = async (e) => {
    const { value } = e.target;
    if (value.length === 0 || "") {
      setResults([]);
      return;
    }

    if (value.trim().length === 0) return;
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
      setShowDropdown(true);
      setResults(res.data);
    } catch (error) {
      alert("error Searching");
      console.log(error);
    }
  };

  return (
    <>
      <Col className="col-md-8">
        <Form>
          <input
            ref={inputRef}
            autoComplete="off"
            defaultValue={text}
            type="search"
            placeholder="Search"
            name="search"
            onChange={handleChange}
            className="input-search"
          />
        </Form>

        {results &&
          results.map((r) => (
            <div
              key={r._id}
              className={showDropdown ? "show" : "dropdown-content"}
              onClick={(e) => {
                e.preventDefault();
                Router.push(`/username`);
                console.log(r.username);
                setShowDropdown(false);
                inputRef.current.value = "";
              }}
            >
              <Image
                style={{ height: "20px", width: "20px" }}
                roundedCircle
                src={r.profilePicUrl}
              />

              {r.username}
            </div>
          ))}
      </Col>
    </>
  );
};

export default SearchBar;
