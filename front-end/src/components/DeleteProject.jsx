import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../styles/EditDelete.css'

const BASE_URL = "http://localhost:8080";

export const DeleteProject = ({ projectId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const deleteProject = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShowConfirmModal(false);
      window.location.reload(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setShowUnauthorizedModal(true);
      } else {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <>
      <Button className="edit-delete-buttons delete-button" variant="link" onClick={handleDeleteClick}>
        Delete
      </Button>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this project?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUnauthorizedModal} onHide={() => setShowUnauthorizedModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are not authorized to delete this project. Please contact the system administrator.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnauthorizedModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
