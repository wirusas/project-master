import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../styles/CreateProject.css";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const CreateProject = () => {
  // FORM DATA
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "TO DO"
  });

  // MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // Success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // HANDLE FORM CHANGE
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/projects`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toggleForm(); // Close the modal after successful submission
      setShowSuccessMessage(true); // Show success message
      // Clear form fields after successful submission
      setForm({
        projectName: "",
        description: "",
        projectStatus: "TO DO",
      });
      // Hide success message after a delay
      setTimeout(() => {
        window.location.reload(false);
        setShowSuccessMessage(false);
      }, 900);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // BUTTON TEXT
  const buttonText = showSuccessMessage
    ? "Project created successfully"
    : "New Project ";

  // RETURN
  return (
    <>
      {/* Button to toggle form */}
      <Button className="new-project-button" type="button" onClick={toggleForm}>
        {buttonText}
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm} >
        
        <Modal.Body className="rouded"
        style={{
          borderStyle: "solid",
          borderColor: "#5227cce0",
          borderWidth: "4px",
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(119, 73, 248, 0.19))",
        }}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="projectName">
              <Form.Label></Form.Label>
              <Form.Control
              placeholder="Project Name"
                required
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleFormChange}
                maxLength={30}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label></Form.Label>
              <Form.Control
              placeholder="Project Description"
                as="textarea"
                required
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={6}
                style={{ resize: "none" }}
                maxLength={500}
              />
              <div className="description-button-separator"></div>
            </Form.Group>
            <div style={{ height: "20px" }}></div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Close
              </Button>
              <Button className="submit-button" type="submit" style={{ marginLeft: "7px" }}>
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal */}
    </>
  );
};