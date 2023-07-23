import { useState, useEffect } from "react";
import { Alert, Button, Form, FloatingLabel } from "react-bootstrap";
import { supabase } from "../../client/client";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import Header from "../../components/Header.jsx";

const UpdateCreator = () => {
  // Fetch the authenticated user's ID
  const creatorId = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function getCreatorInfo() {
      setLoading(true);

      let { data, error } = await supabase
        .from("creators")
        .select(`name, url, description, imageURL`)
        .eq("id", creatorId.id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL);
      }

      setLoading(false);
    }

    getCreatorInfo();
  }, [creatorId.id, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (!name || !url || !description || !imageURL) {
      setShowAlert(true);
      return;
    }

    // update current record in creators table
    const updates = {
      id: creatorId.id,
      name,
      url,
      description,
      imageURL,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("creators").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      alert("Creator updated successfully!");
      setLoading(false);
    }
  };

  async function deleteCreator(e) {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this creator?"
    );

    if (confirmed) {
      const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", creatorId.id);

      if (error) {
        alert(error.message);
      } else {
        // Reset form fields
        setName("");
        setUrl("");
        setDescription("");
        setImageURL("");
        alert("Creator deleted successfully!");
        // Redirect the user to the desired page
        window.location.href = "/";
      }
    }
  }

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const maxLength = 35; // Set the desired character limit here

    if (inputValue.length <= maxLength) {
      setName(inputValue);
    } else {
      setName(inputValue.slice(0, maxLength));
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    const maxLength = 200; // Set the desired character limit here

    if (inputValue.length <= maxLength) {
      setDescription(inputValue);
    } else {
      setDescription(inputValue.slice(0, maxLength));
    }
  };

  return (
    <>
      <Header />
      <div className="sample-section-wrap">
        <div className="sample-section">
          <MDBContainer fluid>
            <MDBCard
              className="text-black m-5"
              style={{ borderRadius: "25px" }}
            >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    md="10"
                    lg="6"
                    className="order-2 order-lg-1 d-flex flex-column align-items-center"
                  >
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{`Update Creator ${name}`}</p>
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
                            value={name || ""}
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
                            value={url || ""}
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
                            value={description || ""}
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
                            value={imageURL || ""}
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
                        variant="outline-success"
                        className="w-100"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Update Creator"}
                      </Button>
                      <Button
                        type="submit"
                        onClick={deleteCreator}
                        variant="outline-danger"
                        className="btn btn-outline-info w-100 mt-3"
                      >
                        Delete Creator
                      </Button>
                      <div className="w-100 text-center mt-3">OR</div>
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
                      src="https://notioly.com/wp-content/uploads/2023/07/272.Cutting.png"
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
  );
};

export default UpdateCreator;
