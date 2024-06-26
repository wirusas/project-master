import React, { useState } from "react";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UsersInitials.css";
import { getLoggedInUser, logout } from "../services/AuthService";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/UserModalStyle.css";
import "../styles/LogOutModalStyle.css";

export const Header = ({ onSearch, onFilter }) => {
  const [showModalUser, setShowModalUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const loggedInUser = getLoggedInUser();
  const storedRoles = JSON.parse(localStorage.getItem("userRoles"));
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("ALL");

  const handleProjectSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleProjectFilter = (e) => {
    const state = e.target.value;
    setFilterState(state);
    onFilter(state);
  };

  const handleLogout = () => {
    logout();
    setShowModal(false);
    navigator("/login");
  };

  const getInitials = (name) => {
    if (name && name.length >= 2) {
      return name.substring(0, 2).toUpperCase();
    }
    return "";
  };

  const getUserName = (name) => {
    return name;
  };

  return (
    <>
      <div className="container" padding-top="60">
        <header
          className="d-flex flex-wrap justify-content-between align-items-center py-3"
          style={{ borderBottom: "1px solid rgba(70, 43, 146, 0.50)" }}
        >
          <a
            href="http://localhost:3000/projects"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={logo} height="78" alt="Logo" />
          </a>

          <ul
            className="nav col-md-4 justify-content-start"
            style={{ marginRight: "82px" }}
          >
            <li className="nav-item">
              <a
                href="http://localhost:3000/projects"
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
          </ul>
          <div className="dropdown-status">
            <select onChange={handleProjectFilter}>
              <option value="All">All</option>
              <option value="TO DO">TO DO</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <form 
            className="d-flex"
            role="search"
            onSubmit={handleProjectSearch}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                borderColor: "#8540F5",
                width: "300px",
              }}
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="projects-header-search" type="submit">Search</button>
          </form>
          <button
            className="users-initials"
            onClick={() => setShowModalUser(true)}
          >
            {getInitials(loggedInUser)}
          </button>
        </header>
      </div>
      <Modal
        show={showModalUser}
        onHide={() => setShowModalUser(false)}
        className="user-modal"
      >
        <Modal.Header className="user-modal-header">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="user-modal-body">
          <button className="users-initials">
            {getInitials(loggedInUser)}
          </button>
          <div className="users-text">{getUserName(loggedInUser)}</div>
        </Modal.Body>
        <div>
          {storedRoles && (
            <div className="users-modal-role">
              <p>Role:</p>
              {storedRoles.map((role, index) => (
                <div key={index}>{role}</div>
              ))}
            </div>
          )}
        </div>
        <Modal.Footer className="user-modal-footer">
          <Button
            variant="secondary"
            id="cancel-button"
            onClick={() => setShowModalUser(false)}
          >
            Back
          </Button>
          <Button
            variant="danger"
            id="yes-button"
            onClick={() => setShowModal(true)}
          >
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="modal-header">
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
