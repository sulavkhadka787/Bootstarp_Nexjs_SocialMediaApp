import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from "react-bootstrap";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

function TokenPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const { field1, field2 } = newPassword;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (field1 !== field2) {
        return setErrorMsg("Passwords donot match");
      }

      await axios.post(`${baseUrl}/api/reset/token`, {
        password: field1,
        token: router.query.token,
      });
      setSuccess(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }
    setLoading(false);
  };

  return (
    <>
      <>
        <Row md={2} className="justify-content-md-center">
          <Col>
            <div className="alert alert-success mb-3 mt-3">
              <div>
                <strong>Reset Password</strong>
              </div>
              {errorMsg && (
                <strong style={{ color: "red" }}>
                  Error!! <br />
                  {errorMsg}
                </strong>
              )}

              {success && (
                <strong style={{ color: "blue" }}>
                  Password Reset Successful !!!
                  <span
                    onClick={() => router.push("/login")}
                    style={{ cursor: "pointer", color: "green" }}
                  >
                    Click here to login
                  </span>
                </strong>
              )}
            </div>

            <Form onSubmit={resetPassword}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="field1"
                  value={field1}
                  onChange={handleChange}
                  required
                />

                <Button
                  className="mt-3 btn btn-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className="fa fa-user-secret"></i> Show Password
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="field2"
                  value={field2}
                  onChange={handleChange}
                  required
                />

                <Button
                  className="mt-3 btn btn-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className="fa fa-user-secret"></i> Show Password
                </Button>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mb-3"
                disabled={loading || field1 === "" || field2 === ""}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    </>
  );
}

export default TokenPage;
