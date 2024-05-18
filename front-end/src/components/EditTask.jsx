import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";

// Main base URL
const BASE_URL = "http://localhost:8080";

export const EditTask = ({ taskId, projectId }) => {
  // FORM DATA
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
  });

  // MODAL STATES
  const [showModalET, setShowModalET] = useState(false);
  const [showConfirmModalET, setShowConfirmModalET] = useState(true);

  // const { projectId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/projects/${projectId}/tasks/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setForm({
          name: response.data.name,
          description: response.data.description,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Failed to fetch task data:", error);
      }
    };
    fetchTask();
  }, [taskId, projectId]);

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
    setShowConfirmModalET(true);
  };

  // Function to submit form after confirmation
  const confirmFormSubmission = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/projects/${projectId}/tasks/${taskId}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Close the modal after successful submission
      handleClose();
      // Clear form fields after successful submission
      setForm({
        name: "",
        description: "",
        status: "",
      });
      // Reload the page to reflect changes
      // window.location.reload(false);
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error, show error message, etc.
    }
  };

  // TOGGLE FORM VISIBILITY
  const handleClose = () => {
    setShowModalET(!showModalET);
  };

  // RETURN
  return (
    <>
      {/* <Button variant="primary" onClick={() => setShowModalET(true)}>
        Edit Task
      </Button> */}

      <Button
        style={{
          width: "54px",
          height: "25px",
          fontSize: "10px",
          lineHeight: "16px",
          fontFamily: "Inter",
          textAlign: "left",
          color: "#6610F2",
          backgroundColor: "#EBE5FC",
          paddingBottom: "20px",
          border: "none",
        }}
        onClick={() => setShowModalET(true)}
      >
        {/* <EditTask  taskId={task.id}/> */}
        Change
      </Button>

      {/* Modal */}
      <Modal
        show={showModalET}
        onHide={handleClose}
        backdrop="static"
        size="lg"
      >
        <Modal.Body
          className="rounded"
          style={{
            borderStyle: "solid",
            borderColor: "#5227cce0",
            borderWidth: "4px",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(119, 73, 248, 0.19))",
          }}
        >
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Control
                type="text"
                placeholder="Task Name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Control
                as="textarea"
                placeholder="Task Description"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskStatus">
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleFormChange}
                required
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </Form.Select>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Edit Task
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        show={showConfirmModalET}
        onHide={() => setShowConfirmModalET(false)}
      >
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
          <Button
            className="cancel-button"
            onClick={() => setShowConfirmModalET(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
