import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Toggle from "../Toggle";

const Settings = () => {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showMessageSettings, setShowMessageSettings] = useState(false);
  const [popupSettings, setPopupSetting] = useState();

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setShowUpdatePassword(!showUpdatePassword)}
      >
        <h2>Update Password</h2>
        {showUpdatePassword && (
          <UpdatePassword
            setSuccess={setSuccess}
            setShowUpdatePassword={setShowUpdatePassword}
          />
        )}
      </div>
      <hr />
      <div>
        <h2>Show New Message Popup</h2>
        <br />
        <Toggle />
      </div>
    </>
  );
};

const UpdatePassword = ({ setSuccess, setShowUpdatePassword }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [userPasswords, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showTypedPassword, setShowTypedPassword] = useState({
    field1: false,
    field2: false,
  });

  const { currentPassword, newPassword } = userPasswords;
  const { field1, field2 } = showTypedPassword;

  const handleChange = () => {
    //
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>New Password </Form.Label>

          <Form.Control
            type={field1 ? "text" : "password"}
            placeholder="Current Password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
          <Button className="mt-3 btn btn-primary float-end mb-3">
            <i className="fa fa-user-secret"></i> Show Password
          </Button>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control
            type={field2 ? "text" : "password"}
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />

          <Button className="mt-3 btn btn-primary float-end mb-3">
            <i className="fa fa-user-secret"></i> Show Password
          </Button>
        </Form.Group>
        <Button style={{ width: "300px" }} className="btn-dark" type="submit">
          Change Password
        </Button>
      </Form>
    </>
  );
};

export default Settings;
