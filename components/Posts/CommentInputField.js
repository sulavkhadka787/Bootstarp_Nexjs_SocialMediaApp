import React, { useState } from "react";
import { Button, Row, Form } from "react-bootstrap";

const CommentInputField = ({ user, postId, setComments }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Row className="d-flex flex-column">
      <Form>
        <input
          type="text"
          className="mt-2"
          style={{ padding: "5px 0", borderRadius: "5px", width: "95%" }}
          placeholder="Add Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          className="btn-primary my-2"
          style={{ width: "200px" }}
          disabled={text === "" || loading}
        >
          Post{" "}
        </Button>
      </Form>
    </Row>
  );
};

export default CommentInputField;
