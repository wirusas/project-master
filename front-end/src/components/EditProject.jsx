import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import editlogo from "../assets/editlogo.svg";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const EditProject = ({ projectId }) => {
  // FORM DATA
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
  });

  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  // Function to submit form after confirmation
  const confirmFormSubmission = async () => {
    try {
      await axios.put(`${BASE_URL}/api/projects/${projectId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      // Close the modal after successful submission
      toggleForm();
      // Clear form fields after successful submission
      setForm({
        projectName: "",
        description: "",
        projectStatus: "",
      });
      // Reload the page to reflect changes
      window.location.reload(false);
    } catch (error) {
      console.error("Error updating project:", error);
      // Handle error, show error message, etc.
    }
  };

  // TOGGLE FORM VISIBILITY
  const toggleForm = () => {
    setShowModal(!showModal);
  };

  // RETURN
  return (
    <>
      {/* Image to toggle form */}
      <img src={editlogo} alt="Edit Project" onClick={toggleForm} />

      {/* Modal */}
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <label>
              <p>* Project Name:</p>
              <input
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
            <button className="submit-button" type="submit">
              Edit Project
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Confirmation modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit the changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="submit-button" onClick={confirmFormSubmission}>
            Yes
          </button>
          <button
            className="cancel-button"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
