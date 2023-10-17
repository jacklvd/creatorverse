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
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

const UpdatePassword = () => {
  const { updatePassword } = useAuth()
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
      setErrorMsg('Please fill all the fields')
      return
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match. Try again")
      return
    }
    try {
      setErrorMsg('')
      setLoading(true)
      const { error } = await updatePassword(passwordRef.current.value)
      console.log(passwordRef.current.value)
      if (!error) {
        navigate('/')
      }
    } catch (error) {
      setErrorMsg('Error in Updating Password. Please try again')
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
                    src="https://notioly.com/wp-content/uploads/2023/04/221.Googling.png"
                    alt="login"
                    className="img-fluid"
                    style={{ maxHeight: '390px' }}
                  />
                </div>
              </Col>
              <Col md={6} className="mx-auto">
                <Card.Body style={{ padding: '30px' }}>
                  <h2 className="text-center mb-4">Update Password</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="password">
                      <FloatingLabel
                        controlId="floatingInputPass"
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
                    <Form.Group id="confirmPassword">
                      <FloatingLabel
                        controlId="floatingInputConfirm"
                        label="Confirm Password"
                        className="mb-3 fst-italic fw-bold"
                      >
                        <Form.Control
                          className="mb-4"
                          type="password"
                          ref={confirmPasswordRef}
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
                        Update Password
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    </>
  )
}

export default UpdatePassword
