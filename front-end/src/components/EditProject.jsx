import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [notification, setNotification] = useState("");

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

  const toggleAddUserModal = () => {
    setShowAddUserModal(!showAddUserModal);
  };

  const toggleRemoveUserModal = () => {
    setShowRemoveUserModal(!showRemoveUserModal);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/projects/${projectId}/${userEmail}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowAddUserModal(false);
      setUserEmail("");
      setNotification("");
    } catch (error) {
      console.error("Error adding user to project:", error);
      if (error.response && error.response.status === 409 && error.response.data.message === "User is already a member of the project.") {
        setNotification("User is already a member of the project.");
      } else if (error.response && error.response.status === 500) {
        setNotification("User not found with the provided email.");
      } else {
        setNotification("An error occurred while adding user to project.");
      }
    }
  };

  const handleRemoveUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/projects/${projectId}/removeUser/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShowRemoveUserModal(false);
    setUserEmail("");
    setNotification("User successfully removed.");
      
      // Automatically close the modal after a short delay
      setTimeout(() => {
        setNotification("");
      }, 5000); 
    } catch (error) {
      console.error("Error removing user:", error);
      if (error.response && error.response.status === 404) {
        setNotification("User not found in the project.");
      } else if (error.response && error.response.status === 403) {
        setNotification("You are not authorized to remove this user.");
      } else {
        setNotification("An error occurred while removing user from project.");
      }
    }
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

      <button type="button" className="edit-delete-buttons edit-button" onClick={toggleAddUserModal} style={{width: "80px"}}>
        Add User
      </button>

      <button type="button" className="edit-delete-buttons edit-button" onClick={toggleRemoveUserModal} style={{width: "75px"}}>
        Remove User
      </button>

      <button type="button" className="edit-delete-buttons edit-button" onClick={toggleForm}>
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

      <Modal show={showAddUserModal} onHide={toggleAddUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddUserSubmit}>
            <Form.Group controlId="formUserEmail">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user email"
                value={userEmail}
                onChange={handleUserEmailChange}
                required
              />
               {/* Notification */}
              {notification && <div className="notification" style={{marginTop: "1rem"}}>{notification}</div>}
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "1rem", float: "right"}}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showRemoveUserModal} onHide={toggleRemoveUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRemoveUserSubmit}>
            <Form.Group controlId="formUserEmail">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user email"
                value={userEmail}
                onChange={handleUserEmailChange}
                required
              />
               {/* Notification */}
              {notification && <div className="notification" style={{marginTop: "1rem"}}>{notification}</div>}
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: "1rem", float: "right"}}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
