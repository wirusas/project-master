import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../styles/EditDelete.css'

const BASE_URL = "http://localhost:8080";

export const EditProject = ({ projectId }) => {
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const projectData = response.data;
        setForm({
          projectName: projectData.projectName,
          description: projectData.description,
          projectStatus: projectData.projectStatus,
        });
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmFormSubmission = async () => {
    try {
      await axios.put(`${BASE_URL}/api/projects/${projectId}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      toggleForm();
      setForm({
        projectName: "",
        description: "",
        projectStatus: "",
      });
      window.location.reload(false);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const toggleForm = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Modal show={showModal} onHide={toggleForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label style={{ marginBottom: "7px" }}>* Project Name:</label>
              <input
                required
                type="text"
                className="form-control"
                name="projectName"
                value={form.projectName}
                onChange={handleFormChange}
                maxLength={30}
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "7px" }}>
                * Project Description
              </label>
              <textarea
                required
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={6}
                style={{ resize: "none" }}
                
              />
            </div>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label style={{ marginBottom: "7px" }}>* Project Status:</label>
              <select
                className="form-control"
                required
                name="projectStatus"
                value={form.projectStatus}
                onChange={handleFormChange}
              >
                <option value="">Select</option>
                <option value="TO DO">TO DO</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={toggleForm} className="mr-2">
                Close
              </Button>
              <Button
                className="submit-button edit-project-button"
                type="submit"
                style={{ marginLeft: "7px" }}
              >
                Edit Project
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <button type="button"  className="edit-delete-buttons edit-button" onClick={toggleForm}>
        Change
      </button>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit the changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="submit-button" onClick={confirmFormSubmission}>
            Yes
          </Button>
          <Button className="cancel-button" onClick={() => setShowConfirmModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
