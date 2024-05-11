import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import deletelogo from "../assets/deletelogo.svg";

export const DeleteTask = ({ taskId }) => {
  const [showConfirmModalDT, setShowConfirmModalDT] = useState(false);
  const [showUnauthorizedModalDT, setShowUnauthorizedModalDT] = useState(false);

  // show the confirmation modal
  const handleDeleteClick = () => {
    setShowConfirmModalDT(true);
  };

  // delete task
  const deleteTask = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/projects/${projectId}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Close the confirmation modal
      setShowConfirmModalDT(false);
      // Reload the page
      window.location.reload(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // unauthorized message modal
        setShowUnauthorizedModalDT(true);
      } else {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <>
      <img src={deletelogo} alt="Delete Task" onClick={handleDeleteClick} />
      {/* Confirmation modal */}
      <Modal
        show={showConfirmModalDT}
        onHide={() => setShowConfirmModalDT(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this task?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModalDT(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Unauthorized message modal */}
      <Modal
        show={showUnauthorizedModalDT}
        onHide={() => setShowUnauthorizedModalDT(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are not authorized to delete this task. Please contact the
            system administrator.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUnauthorizedModalDT(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
