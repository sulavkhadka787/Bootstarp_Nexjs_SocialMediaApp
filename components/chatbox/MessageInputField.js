import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const MessageInputField = ({ sendMsg }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMsg(text);
        setText("");
      }}
    >
      <input
        type="text"
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="float-end" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MessageInputField;
