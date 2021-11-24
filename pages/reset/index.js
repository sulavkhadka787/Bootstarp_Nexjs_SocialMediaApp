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
  return (
    <>
      <Row md={2} className="justify-content-md-center">
        <Col>
          <div>
            <strong>Reset Password</strong>
          </div>
          <div className="alert alert-success mb-3 mt-3">
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

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ResetPage;
