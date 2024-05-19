import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { isUserLoggedIn, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../styles/LogOutModalStyle.css";
import { useParams } from "react-router-dom";
import { CreateTask } from "./CreateTask";

export const SideBarTask = ({ refreshTasks }) => {
  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();

  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    logout();
    setShowModal(false);
    navigator("/login");
  }

  const { projectId } = useParams();
  // const { setShowModalCT } = useParams();
  const [showModalCT, setShowModalCT] = useState(false);

  const handleAddTask = () => {
    console.log(projectId);
    // navigator(`/create-task/${projectId}`);
    setShowModalCT(true);
  };

  return (
    <>
      <div
        className="flex-shrink-0 p-3 ms-4"
        style={{ width: "280px", paddingLeft: "16px", textAlign: "left" }}
      >
        <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
          <span
            className="fw-semibold"
            style={{
              fontSize: "20px",
              color: "white",
              backgroundColor: "rgba(119, 73, 248, 0.50)",
              width: "217px",
              height: "56px",
              paddingLeft: "16px",
              paddingTop: "13px",
            }}
          >
            Navbar
          </span>
        </div>
        <ul className="list-unstyled ps-0">
          <li className="mb-1" style={{ color: "#7749F8" }}>
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
              style={{ color: "#7749F8" }}
              onClick={() => navigator("/projects")}
            >
              New Project
            </button>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
              style={{ color: "#7749F8" }}
              onClick={() => setShowModalCT(true)}
            >
              New Task
            </button>
            {/* {showModalCT && <CreateTask />} */}
            <CreateTask
              refreshTasks={refreshTasks}
              show={showModalCT}
              onClose={() => setShowModalCT(false)}
            />
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#orders-collapse"
              aria-expanded="false"
              style={{ color: "#7749F8" }}
            >
              Save All.CSV
            </button>
            <div className="collapse" id="orders-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    New
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    Processed
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    Shipped
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    Returned
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
              style={{ color: "#7749F8" }}
            >
              Account
            </button>
            <div className="collapse" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    New...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                    style={{ marginLeft: "15px" }}
                  >
                    Settings
                  </a>
                </li>
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  onClick={() => setShowModal(true)}
                  style={{ color: "#7749F8" }}
                >
                  Log out
                </button>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="secondary"
            id="cancel-button"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" id="yes-button" onClick={handleLogout}>
            Yes, log out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
