import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Form,
  FloatingLabel,
  Col,
  Row,
  Card,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const PasswordReset = () => {
  const { passwordReset } = useAuth();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await passwordReset(emailRef.current.value);
      console.log(error);
      console.log(data);
      setMsg("Check your email for password reset instructions!");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card className="mx-auto">
          <Container className="my-4">
            <Row>
              <Col md={12} className="text-center mb-4">
                <div className="auth-left">
                  <img
                    src="https://illustrations.popsy.co/gray/calculator.svg"
                    alt="login"
                    className="img-fluid"
                    style={{ maxHeight: "390px" }}
                  />
                </div>
              </Col>
              <Col md={6} className="mx-auto">
                <Card.Body style={{ padding: "30px" }}>
                  <h2 className="text-center mb-4">CREATOR VERSE</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Your Email"
                        className="mb-3 fst-italic fw-bold"
                      >
                        <Form.Control
                          className="mb-4"
                          type="email"
                          ref={emailRef}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>
                    {msg && (
                      <Alert
                        variant="danger"
                        onClose={() => setMsg("")}
                        dismissible
                      >
                        {msg}
                      </Alert>
                    )}
                    <div className="text-center mt-2">
                      <Button disabled={loading} type="submit" className="w-50">
                        Send Reset Link
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2 fs-5 mb-2">
                  Back to Login? <Link to={"/login"}>Login</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    </>
  );
};

export default PasswordReset;
