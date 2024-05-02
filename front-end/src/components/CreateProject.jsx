import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/CreateProject.css";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const CreateProject = () => {
  // FORM DATA
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
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
        projectStatus: "",
      });
      // Hide success message after a delay
      setTimeout(() => {
        window.location.reload(false);
        setShowSuccessMessage(false);
      }, 900);
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle error, show error message, etc.
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // BUTTON TEXT
  const buttonText = showSuccessMessage ? "Project created successfully" : "New Project   +";

  // RETURN
  return (
    <>
      {/* Button to toggle form */}
      <Button className="new-project-button" type="button" onClick={toggleForm}>{buttonText}</Button>

      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create/Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <label>
              <p>* Project Name:</p>
              <input
                required
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleFormChange}
                maxLength={20}
              />
            </label>
            <br />
            <br />
            <label>
              <p>* Project Description</p>
              <textarea
                required
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={5}
                cols={50}
                style={{ resize: "none" }}
                maxLength={200}
              />
            </label>
            <br />
            <br />
            <div>
              <label>
                <p>* Project Status:</p>
                <select
                  required
                  name="projectStatus"
                  value={form.projectStatus}
                  onChange={handleFormChange}
                >
                  <option value="">Select</option>
                  <option value="TO DO">TO DO</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </label>
            </div>
            <br />
            <Button className="submit-button" type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
      {/* Modal */}
    </>
  );
};
