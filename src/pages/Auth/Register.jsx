/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Alert, Button, Card, Form, FloatingLabel, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { supabase } from "../../client/client";
import ImgLog from '../../assets/log.svg'

const Register = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
  
    const register = (email, password) =>
      supabase.auth.signUp({ email, password });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        !passwordRef.current?.value ||
        !emailRef.current?.value ||
        !confirmPasswordRef.current?.value
      ) {
        setErrorMsg("Please fill all the fields");
        return;
      }
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setErrorMsg("Passwords doesn't match");
        return;
      }
      try {
        setErrorMsg("");
        setLoading(true);
        const { data, error } = await register(
          emailRef.current.value,
          passwordRef.current.value
        );
        if (!error && data) {
          setMsg(
            "Registration Successful. Check your email to confirm your account"
          );
        }
      } catch (error) {
        setErrorMsg("Error in Creating Account");
      }
      setLoading(false);
    };
  
    return (
      <>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Card className="mx-auto">
            <Container className="my-4">
              <Row>
                <Col md={12} className="text-center mb-4">
                  <div className="auth-left">
                    <img src={ImgLog} alt="login" className="img-fluid" style={{ maxHeight: '380px' }} />
                  </div>
                </Col>
                <Col md={6} className="mx-auto">
                  <Card.Body style={{ padding: '30px' }}>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                      <Form.Group id="email">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Your Email"
                          className="mb-3 fst-italic"
                        >
                        <Form.Control className="mb-4" type="email" ref={emailRef} required />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group id="password">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Your Ideal Password"
                          className="mb-3 fst-italic"
                        >
                        <Form.Control className="mb-4" type="password" ref={passwordRef} required />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group id="confirm-password">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Confirm Your Password"
                          className="mb-3 fst-italic"
                        >
                        <Form.Control type="password" ref={confirmPasswordRef} required />
                        </FloatingLabel>
                      </Form.Group>
                      {errorMsg && (
                        <Alert
                          variant="danger"
                          onClose={() => setErrorMsg("")}
                          dismissible>
                          {errorMsg}
                        </Alert>
                      )}
                      {msg && (
                        <Alert variant="success" onClose={() => setMsg("")} dismissible>
                          {msg}
                        </Alert>
                      )}
                      <div className="text-center mt-4">
                        <Button disabled={loading} type="submit" className="w-50">
                          Register
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                  <div className="w-100 text-center mt-2 fs-5 mb-2">
                    Already a User? <Link to={"/login"}>Login</Link>
                  </div>
                </Col>
              </Row>
            </Container> 
          </Card>  
        </div>      
      </>
    );
  };
  
  export default Register;