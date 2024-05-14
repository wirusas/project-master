import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const CreateTask = ({ refreshTasks, show, onClose }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formTask, setFormTask] = useState({
    name: "",
    description: "",
    dateCreated: "",
    status: "TODO", // Default status
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormTask({ ...formTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/projects/${projectId}/tasks`,
        formTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Task created:", response.data);
      // handleClose();
      if (response.status === 201) {
        refreshTasks();
        setFormTask({
          name: "",
          description: "",
          dateCreated: "",
          status: "TODO",
        });
        onClose();
        //navigate(`/tasks/${projectId}`)
      }
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" size="lg">
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Control
              type="text"
              placeholder="Task Name"
              name="name"
              value={formTask.name}
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
              value={formTask.description}
              onChange={handleFormChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskStatus">
            <Form.Select
              name="status"
              value={formTask.status}
              onChange={handleFormChange}
              required
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </Form.Select>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
