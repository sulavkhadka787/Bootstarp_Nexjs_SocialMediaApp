import React, { useState } from "react";
import { Button, Row, Form } from "react-bootstrap";
import { postComment } from "../../utils/postActions";

const CommentInputField = ({ user, postId, setComments }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Row className="d-flex flex-column">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await postComment(postId, user, text, setComments, setText);
          setLoading(false);
        }}
      >
        <input
          type="text"
          className="mt-2"
          style={{ padding: "5px 0", borderRadius: "5px", width: "95%" }}
          placeholder="Add Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          type="submit"
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
