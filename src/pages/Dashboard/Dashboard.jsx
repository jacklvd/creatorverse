import { useState } from 'react'
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap'
import { supabase } from '../../client/client'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit'
import Header from '../../components/Header.jsx'

const Dashboard = () => {
  // Fetch the authenticated user's ID
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if any fields are empty
    if (!name || !url || !description || !imageURL) {
      setShowAlert(true)
      return
    }

    const user_id = user.id

    // Create a new record in the Supabase table
    const { error } = await supabase.from('creators').insert([
      {
        user_id,
        name,
        url,
        description,
        imageURL,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    if (error) {
      console.error('Error inserting data:', error)
    } else {
      // Reset form fields
      setName('')
      setUrl('')
      setDescription('')
      setImageURL('')
      alert('Creator added successfully!')
    }
  }

  const handleNameChange = (e) => {
    const inputValue = e.target.value
    const maxLength = 35 // Set the desired character limit here

    if (inputValue.length <= maxLength) {
      setName(inputValue)
    } else {
      setName(inputValue.slice(0, maxLength))
    }
  }

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value
    const maxLength = 200 // Set the desired character limit here

    if (inputValue.length <= maxLength) {
      setDescription(inputValue)
    } else {
      setDescription(inputValue.slice(0, maxLength))
    }
  }

  return (
    <>
      <Header />
      <div className="sample-section-wrap">
        <div className="sample-section">
          <MDBContainer fluid>
            <MDBCard
              className="text-black m-5"
              style={{ borderRadius: '25px' }}
            >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-2 order-lg-1 d-flex flex-column align-items-center"
                  >
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Add a Creator
                    </p>
                    <Form onSubmit={handleSubmit} className="text-start">
                      <Form.Group id="name">
                        <Form.Text className="text-muted fw-bold mb-4">
                          Name or the nickname of your favorite creator
                        </Form.Text>
                        <FloatingLabel
                          controlId="floatingInput1"
                          label="Name"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group id="url">
                        <Form.Text className="text-muted fw-bold mb-4">
                          Provide a social media link for your creator
                        </Form.Text>
                        <FloatingLabel
                          controlId="floatingInput2"
                          label="URL"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Text className="text-muted fw-bold mb-4">
                        Provide short description of the creator. What are they
                        most interested in?
                      </Form.Text>
                      <Form.Group id="description">
                        <FloatingLabel
                          controlId="floatingInput3"
                          label="Description"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            limit="20"
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Text className="text-muted fw-bold mb-4">
                        Provide a link to an image of your creator. Be sure to
                        include the http://
                      </Form.Text>
                      <Form.Group id="imageURL">
                        <FloatingLabel
                          controlId="floatingInput4"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            required
                          />
                        </FloatingLabel>
                      </Form.Group>
                      {showAlert && (
                        <Alert
                          variant="danger"
                          onClose={() => setShowAlert(false)}
                          dismissible
                        >
                          Please fill in all fields
                        </Alert>
                      )}
                      <Button
                        variant="outline-info"
                        className="w-100"
                        type="submit"
                      >
                        Add Creator
                      </Button>
                      <Link to="/" className="btn btn-outline-info w-100 mt-3">
                        Back to Home
                      </Link>
                    </Form>
                  </MDBCol>

                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-1 order-lg-2 d-flex align-items-center"
                  >
                    <MDBCardImage
                      src="https://illustrations.popsy.co/teal/team-idea.svg"
                      fluid
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      </div>
    </>
  )
}

export default Dashboard
