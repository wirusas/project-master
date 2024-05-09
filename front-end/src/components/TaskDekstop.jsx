import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios if not already done
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import carddate from "../assets/card-date.svg";
import "../styles/TaskDesktop.css";
import { useParams, useNavigate } from "react-router-dom";

export const TaskDesktop = () => {
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams(); // This hooks extract the projectId from the URL
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Use template literals to insert the projectId into the URL
        const response = await axios.get(
          `http://localhost:8080/api/projects/${projectId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(response.data); // Update the state with the fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (projectId) {
      // Ensure projectId is available before fetching
      fetchTasks();
    }
  }, [projectId]); // Dependency array includes projectId to refetch when it changes

  // const categorizeTasks = (status) => {
  //   return tasks.filter(task => task.status.toUpperCase().replace(" ", "_") === status);
  // };

  const handleAddTask = () => {
    navigate(`/create-task/${projectId}`);

    //setShowModal(true);
  };

  return (
    <div
      className="column-div"
      style={{
        // border: "2px solid red",
        width: "1100px",
        height: "735px",
        marginLeft: "auto",
        marginRight: "30px",
        marginTop: "15px",
        marginBottom: "15px",
      }}
    >
      <Container>
        <Button onClick={handleAddTask} style={{ margin: "10px 0" }}>
          Add New Task
        </Button>
        <Row>
          <Col
            style={{
              width: "350px",
              height: "735px",
              // border: "2px solid red",
              backgroundColor: "#f473401a",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>To Do</h3>

            {tasks
              .filter((task) => task.status === "TODO")

              .map((task) => (
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
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.name}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
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
                      >
                        Change
                      </Button>
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
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>

          <Col
            style={{
              width: "350px",
              height: "735px",
              //   border: "2px solid red",
              backgroundColor: "#ffba091a",
              marginLeft: "20px",
            }}
            className="rounded"
          >
            <h3 style={{ textAlign: "left" }}>In Progress</h3>
            {tasks
              .filter((task) => task.status === "IN_PROGRESS")

              .map((task) => (
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
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.name}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
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
                      >
                        Change
                      </Button>
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
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>
          <Col
            style={{
              width: "350px",
              height: "735px",
              //   border: "2px solid red",
              backgroundColor: "#20c9971a",
              marginLeft: "20px",
            }}
            className="custom-col rounded"
          >
            <h3 style={{ textAlign: "left" }}>Done</h3>
            {tasks
              .filter((task) => task.status === "DONE")

              .map((task) => (
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
                  bsPrefix
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        textAlign: "left",
                        textDecoration: "underline",
                        marginLeft: "20px",
                      }}
                    >
                      <Row>
                        <Col className="col-8">{task.name}</Col>
                        <Col className="col-4">
                          <img style={{ marginLeft: "50px" }} src={carddate} />
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
                      >
                        Change
                      </Button>
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
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
      {/* {showModal && <CreateTask show={showModal} onHide={() => setShowModal(false)} />} */}
    </div>
  );
};
