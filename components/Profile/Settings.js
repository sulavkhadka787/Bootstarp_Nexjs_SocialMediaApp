import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import Toggle from "../Toggle";
import { passwordUpdate, toggleMessagePopup } from "../../utils/profileActions";

const Settings = ({ newMessagePopup }) => {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showMessageSettings, setShowMessageSettings] = useState(false);
  const [popupSettings, setPopupSetting] = useState(newMessagePopup);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setShowUpdatePassword(!showUpdatePassword)}
      >
        <h2>Update Password</h2>
      </div>
      {showUpdatePassword && (
        <UpdatePassword
          setSuccess={setSuccess}
          setShowUpdatePassword={setShowUpdatePassword}
          showUpdatePassword={showUpdatePassword}
        />
      )}

      <hr />
      <div>
        <h2>Show New Message Popup</h2>
        <br />
        <Toggle
          popupSettings={popupSettings}
          setPopupSetting={setPopupSetting}
          toggleMessagePopup={toggleMessagePopup}
          setSuccess={setSuccess}
        />
      </div>
    </>
  );
};

const UpdatePassword = ({
  setSuccess,
  setShowUpdatePassword,
  showUpdatePassword,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [userPasswords, setUserPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [showTypedPassword, setShowTypedPassword] = useState({
    field1: false,
    field2: false,
  });

  const { currentPassword, newPassword } = userPasswords;
  const { field1, field2 } = showTypedPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPasswords((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  return (
    <>
      <div className="alert alert-success mb-3 mt-3">
        {errorMsg ? (
          <strong style={{ color: "red" }}>
            Error!! <br />
            {errorMsg}
          </strong>
        ) : (
          <>
            <i className="fa fa-empire" style={{ fontSize: "36px" }}></i>
            <strong>Get Started</strong> <br />
            <span>Create New Account</span>
          </>
        )}
      </div>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await passwordUpdate(setSuccess, userPasswords);
          setLoading(false);
          setShowUpdatePassword(false);
          console.log(showUpdatePassword);
        }}
      >
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
