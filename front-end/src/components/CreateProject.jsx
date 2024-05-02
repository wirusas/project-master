import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../styles/CreateProject.css"

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

  // HANDLE FORM
  const handlerForm = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/projects`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
          setShowSuccessMessage(false);
        }, 3000);
      });
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // Button text
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
                onChange={handlerForm}
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
                onChange={handlerForm}
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
                  onChange={handlerForm}
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
