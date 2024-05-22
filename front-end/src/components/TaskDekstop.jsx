import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import carddate from "../assets/card-date.svg";
import "../styles/TaskDesktop.css";
import { useParams, useNavigate } from "react-router-dom";
import { CreateTask } from "./CreateTask";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";

export const TaskDesktop = ({ tasks, onEditTask, refreshTasks }) => {
  const { projectId } = useParams(); // This hooks extract the projectId from the URL
  const { taskId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  console.log("projectId:", projectId);
  console.log("taskId:", taskId);

  const handleAddTask = () => {
    navigate(`/create-task/${projectId}`);
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const MAX_LENGTH = 14;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + ".." : text;
  };

  const priorityValues = { HIGH: 1, MEDIUM: 2, LOW: 3 };

  const getClassName = (priority) => {
    return priority === "HIGH"
      ? "text-high"
      : priority === "MEDIUM"
        ? "text-medium"
        : "text-low"; // Default to 'low'
  };

  return (
    <div
      className="column-div"
      style={{
        // border: "2px solid red",
        width: "1150px",
        height: "735px",
        marginLeft: "auto",
        marginRight: "30px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <Container>
        <Row>
          <Col
            style={{
              width: "350px",
              minHeight: "735px",
              // border: "2px solid red",
              backgroundColor: "#f473401a",
              marginLeft: "20px",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>To Do</h3>

            {tasks
              .filter((task) => task.status === "TODO")
              .sort(
                (a, b) =>
                  priorityValues[a.priority] - priorityValues[b.priority]
              )
              .map((task) => {
                // Define formatDate function
                const formatDate = (timestamp) => {
                  const date = new Date(timestamp);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
                };

                return (
                  <Card
                    key={task.id}
                    style={{
                      width: "330px",
                      height: "220px",
                      border: "4px solid #F47340",
                      backgroundColor: "white",
                      marginBottom: "15px",
                    }}
                    className="card-todo rounded"
                    id="custom-input"
                    bsPrefix
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "left",
                          marginLeft: "20px",
                        }}
                      >
                        <Row>
                          <Col className="col-5" id="task-name-task-desktop">
                            {truncateText(task.name, MAX_LENGTH)}
                          </Col>
                          <Col className="col-4" id="date-format">
                            {task.dateCreated && formatDate(task.dateCreated)}
                          </Col>
                          {/* <Col className="col-1" id="priority-format">
                            {task.priority}
                          </Col> */}
                          <Col
                            className={`col-1 ${getClassName(task.priority)}`}
                            id="priority-format"
                          >
                            {task.priority}
                          </Col>
                        </Row>
                      </Card.Title>

                      <Card.Subtitle className="mb-2 text-muted">
                        {/* <p>Task priority: {task.priority}</p> */}
                      </Card.Subtitle>

                      <Card.Text
                        style={{
                          borderTop: "2px solid #F47340",
                          borderBottom: "2px solid #F47340",
                          width: "325px",
                          height: "125px",
                          textAlign: "left",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          overflowY: "auto",
                          overflowX: "auto",
                        }}
                      >
                        {task.description}
                      </Card.Text>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "10px ",
                          gap: "8px",
                        }}
                      >
                        {/* <EditTask projectId={projectId} taskId={task.id}> */}
                        <Button
                          style={{
                            width: "54x",
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
                          onClick={() => onEditTask(task)}
                        >
                          {/* <EditTask taskId={task.id} /> */}
                          Edit task
                        </Button>
                        {/* </EditTask> */}
                        <DeleteTask
                          projectId={projectId}
                          taskId={task.id}
                          refreshTasks={refreshTasks}
                        >
                          <Button
                            style={{
                              width: "54px",
                              height: "25px",
                              fontSize: "10px",
                              lineHeight: "16px",
                              fontFamily: "Inter",
                              textAlign: "left",
                              color: "#842029",
                              backgroundColor: "#F8D7DA",
                              paddingBottom: "20px",
                              border: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </DeleteTask>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>

          <Col
            style={{
              width: "350px",
              minHeight: "735px",
              // border: "2px solid red",
              backgroundColor: "#ffba091a",
              marginLeft: "20px",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>In Progress</h3>
            {tasks
              .filter((task) => task.status === "IN_PROGRESS")
              .sort(
                (a, b) =>
                  priorityValues[a.priority] - priorityValues[b.priority]
              )
              .map((task) => {
                // Define formatDate function
                const formatDate = (timestamp) => {
                  const date = new Date(timestamp);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
                };

                return (
                  <Card
                    key={task.id}
                    style={{
                      width: "330px",
                      height: "220px",
                      border: "4px solid #FFC107",
                      backgroundColor: "white",
                      marginBottom: "15px",
                    }}
                    className="card-inprograss rounded"
                    id="custom-input"
                    bsPrefix
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "left",
                          marginLeft: "20px",
                        }}
                      >
                        <Row>
                          <Col className="col-5" id="task-name-task-desktop">
                            {truncateText(task.name, MAX_LENGTH)}
                          </Col>
                          <Col className="col-4" id="date-format">
                            {task.dateCreated && formatDate(task.dateCreated)}
                          </Col>
                          <Col
                            className={`col-1 ${getClassName(task.priority)}`}
                            id="priority-format"
                          >
                            {task.priority}
                          </Col>
                        </Row>
                      </Card.Title>

                      <Card.Subtitle className="mb-2 text-muted">
                        {/* <p>Task priority: {task.priority}</p> */}
                      </Card.Subtitle>
                      <Card.Text
                        style={{
                          borderTop: "2px solid #FFC107",
                          borderBottom: "2px solid #FFC107",
                          width: "325px",
                          height: "125px",
                          textAlign: "left",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          overflowY: "auto",
                          overflowX: "auto",
                        }}
                      >
                        {task.description}
                      </Card.Text>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "10px ",
                          gap: "8px",
                        }}
                      >
                        <Button
                          style={{
                            width: "54x",
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
                          onClick={() => onEditTask(task)}
                        >
                          {/* <EditTask taskId={task.id} /> */}
                          Edit task
                        </Button>
                        <DeleteTask
                          projectId={projectId}
                          taskId={task.id}
                          refreshTasks={refreshTasks}
                        >
                          <Button
                            style={{
                              width: "54px",
                              height: "25px",
                              fontSize: "10px",
                              lineHeight: "16px",
                              fontFamily: "Inter",
                              textAlign: "left",
                              color: "#842029",
                              backgroundColor: "#F8D7DA",
                              paddingBottom: "20px",
                              border: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </DeleteTask>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
          <Col
            style={{
              width: "350px",
              minHeight: "735px",
              // border: "2px solid red",
              backgroundColor: "#20c9971a",
              marginLeft: "20px",
              marginRight: "20px",
            }}
            className="custom-col rounded"
          >
            <h3 style={{ textAlign: "left" }}>Done</h3>
            {tasks
              .filter((task) => task.status === "DONE")
              .sort(
                (a, b) =>
                  priorityValues[a.priority] - priorityValues[b.priority]
              )
              .map((task) => {
                // Define formatDate function
                const formatDate = (timestamp) => {
                  const date = new Date(timestamp);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
                };

                return (
                  <Card
                    key={task.id}
                    style={{
                      width: "330px",
                      height: "220px",
                      border: "4px solid #20C997",
                      backgroundColor: "white",
                      marginBottom: "10px",
                    }}
                    className="card-done rounded"
                    id="custom-input"
                    bsPrefix
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "left",
                          marginLeft: "20px",
                        }}
                      >
                        <Row>
                          <Col className="col-5" id="task-name-task-desktop">
                            {truncateText(task.name, MAX_LENGTH)}
                          </Col>
                          <Col className="col-4" id="date-format">
                            {task.dateCreated && formatDate(task.dateCreated)}
                          </Col>
                          <Col
                            className={`col-1 ${getClassName(task.priority)}`}
                            id="priority-format"
                          >
                            {task.priority}
                          </Col>
                        </Row>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {/* <p>Task priority: {task.priority}</p> */}
                      </Card.Subtitle>
                      <Card.Text
                        style={{
                          borderTop: "2px solid #20C997",
                          borderBottom: "2px solid #20C997",
                          width: "325px",
                          height: "125px",
                          textAlign: "left",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          overflowY: "auto",
                          overflowX: "auto",
                        }}
                      >
                        {task.description}
                      </Card.Text>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          paddingRight: "10px ",
                          gap: "8px",
                        }}
                      >
                        <Button
                          style={{
                            width: "54x",
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
                          onClick={() => onEditTask(task)}
                        >
                          {/* <EditTask taskId={task.id} /> */}
                          Edit task
                        </Button>
                        <DeleteTask
                          projectId={projectId}
                          taskId={task.id}
                          refreshTasks={refreshTasks}
                        >
                          <Button
                            style={{
                              width: "54px",
                              height: "25px",
                              fontSize: "10px",
                              lineHeight: "16px",
                              fontFamily: "Inter",
                              textAlign: "left",
                              color: "#842029",
                              backgroundColor: "#F8D7DA",
                              paddingBottom: "20px",
                              border: "none",
                            }}
                          >
                            Delete
                          </Button>
                        </DeleteTask>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

TaskDesktop.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      dateCreated: PropTypes.string,
    })
  ).isRequired,
  onEditTask: PropTypes.func.isRequired,
  refreshTasks: PropTypes.func.isRequired,
};
