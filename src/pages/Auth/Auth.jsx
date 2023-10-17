import { useRef, useState } from 'react'
import {
  Alert,
  Button,
  Form,
  FloatingLabel,
  Col,
  Row,
  Card,
  Container,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

export default function Auth() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setErrorMsg('')
      setLoading(true)
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg('Please fill in the fields')
        return
      }
      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value)
      if (error) setErrorMsg(error.message)
      if (user && session) navigate('/')
    } catch (error) {
      setErrorMsg('Email or Password Incorrect')
    }
    setLoading(false)
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Card className="mx-auto">
          <Container className="my-4">
            <Row>
              <Col md={12} className="text-center mb-4">
                <div className="auth-left">
                  <img
                    src="https://illustrations.popsy.co/gray/man-riding-a-rocket.svg"
                    alt="login"
                    className="img-fluid"
                    style={{ maxHeight: '390px' }}
                  />
                </div>
              </Col>
              <Col md={6} className="mx-auto">
                <Card.Body style={{ padding: '30px' }}>
                  <h2 className="text-center mb-4">CREATOR VERSE</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <FloatingLabel
                        controlId="floatingInputEmail"
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
                    <Form.Group id="password">
                      <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Your Password"
                        className="mb-3 fst-italic fw-bold"
                      >
                        <Form.Control
                          className="mb-4"
                          type="password"
                          ref={passwordRef}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>
                    {errorMsg && (
                      <Alert
                        variant="danger"
                        onClose={() => setErrorMsg('')}
                        dismissible
                      >
                        {errorMsg}
                      </Alert>
                    )}
                    <div className="text-center mt-2">
                      <Button disabled={loading} type="submit" className="w-50">
                        Login
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2 fs-5 mb-2 general-text">
                  New User? <Link to={'/register'}>Register</Link>
                </div>
                <div className="w-100 text-center mt-2 fs-5 mb-2 general-text">
                  OR
                </div>
                <div className="w-100 text-center mt-2 fs-5 mb-2 general-text">
                  <Link to={'/reset-password'}>Forgot Password</Link>?
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    </>
  )
}
