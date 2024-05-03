import React, { useState } from "react";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UsersInitials.css";
import { getLoggedInUser, logout } from "../services/AuthService";
import { Modal, Button } from "react-bootstrap";

export const Header = () => {
  const loggedInUser = getLoggedInUser();

  const [showModal, setShowModal] = useState(false);
  const [showModalSecond, setShowModalTwoSecond] = useState(false);

  function handleLogout() {
    logout();
    setShowModal(false);
  }

  const getInitials = (name) => {
    if (name && name.length >= 2) {
      return name.substring(0, 2).toUpperCase();
    }
    return "";
  };

  return (
    <>
      <div className="container" padding-top="60">
        <header
          className="d-flex flex-wrap justify-content-between align-items-center py-3"
          style={{ borderBottom: "1px solid rgba(70, 43, 146, 0.50)" }}
        >
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={logo} height="78" />
          </a>

          <ul
            className="nav col-md-4 justify-content-start"
            style={{ marginRight: "82px" }}
          >
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2"
                style={{ color: "#5227CC" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2"
                style={{ color: "#5227CC" }}
              >
                Members
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link px-2"
                style={{ color: "#5227CC" }}
              >
                Contacts
              </a>
            </li>
            {/* <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li> */}
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                borderColor: "#8540F5",
                boxShadow: "0px 0px 0px 3px rgba(102, 16, 242, 0.15)",
              }}
            />
            <button
              className="btn btn-outline-success text-white"
              type="submit"
              style={{
                borderColor: "#8540F5",
                backgroundColor: "#7749F8",
                boxShadow: "0px 0px 0px 3px rgba(102, 16, 242, 0.15)",
              }}
            >
              Search
            </button>
            <button
              className="users-initials"
              onClick={() => setShowModal(true)}
            >
              {getInitials(loggedInUser)}
            </button>
          </form>
        </header>
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
      <Modal show={showModalSecond} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="secondary"
            id="cancel-button"
            onClick={() => setShowModalTwoSecond(false)}
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
