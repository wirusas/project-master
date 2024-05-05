import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import personplus from "../assets/person-plus.svg";
import "../styles/CreateTask.css";
import { Navigate, useNavigate } from "react-router-dom";
import { TaskDesktop } from "./TaskDekstop";

export const CreateTask = () => {
  const navigator = useNavigate();
  const [formTask, setFormTask] = useState({
    id: "",
    title: "",
    subtitle: "",
    status: "",
    taskPriority: "",
    link1: "Link 1",
    link2: "Link 2",
  });

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // naujo tasko pildymo formos valdymas
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormTask({ ...formTask, [name]: value });
    console.log("Form data:", formTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // <TaskDesktop initialTasks={formTask} />;
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        backdrop="static"
        show={show}
        onHide={handleClose}
        size="lg"
        style={
          {
            //   border: "4px solid 5227cce0",
          }
        }
      >
        <Modal.Body
          className="rounded"
          style={{
            borderStyle: "solid",
            borderColor: "#5227cce0",
            borderWidth: "4px",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(119, 73, 248, 0.19))  ",
          }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                style={{
                  width: "300px",
                  height: "38px",
                  borderStyle: "solid",
                  borderColor: "#5227cce0",
                  borderWidth: "2px",
                  //   border: "4px solid red",
                }}
                type="text"
                placeholder="Task Name"
                name="title"
                value={formTask.title}
                onChange={handleForm}
                required
                maxLength={28}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                style={{
                  width: "700px",
                  height: "114px",
                  borderStyle: "solid",
                  borderColor: "#5227cce0",
                  borderWidth: "2px",
                }}
                type="text"
                placeholder="Task Description"
                as="textarea"
                rows={3}
                name="subtitle"
                value={formTask.subtitle}
                onChange={handleForm}
                required
                maxLength={200}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              {/* Pasetiname visiems naujiems projektams to do statusa */}
              <Form
                type="text"
                name="status"
                value="to do"
                onChange={handleForm}
                // required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div>
                <select
                  required
                  name="taskPriority"
                  value={formTask.taskPriority}
                  onChange={handleForm}
                  // onChange={handleFormChange}
                >
                  <option value="">Task Priority</option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                </select>
              </div>
            </Form.Group>

            <Modal.Footer>
              <Button
                style={{
                  width: "90px",
                  height: "38px",
                  border: "none",
                  backgroundColor: "#dc3535c2",
                }}
                onClick={() => {
                  handleClose();
                  navigator("/tasks");
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                style={{
                  width: "90px",
                  height: "38px",
                  border: "none",
                  backgroundColor: "#5227cce0",
                }}
                onClick={() => {
                  // handleSubmit();
                  // handleClose();
                  // navigator("/tasks");
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
