import { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";

function ResetPage() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/api/reset`, { email });
      setEmailChecked(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);
  return (
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

            {emailChecked && (
              <strong style={{ color: "blue" }}>
                Please check your inbox for further instructions!!
              </strong>
            )}
          </div>

          <Form onSubmit={resetPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              disabled={loading || email.length === 0}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ResetPage;
