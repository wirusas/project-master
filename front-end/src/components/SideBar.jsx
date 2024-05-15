import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { isUserLoggedIn } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../styles/SideBar.css';
import { SideBarProjectList } from './SideBarProjecList';
import { CreateProject } from './CreateProject';

export const SideBar= () => {
  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();

  return (
    <>
      <div className="flex-shrink-0 p-3 ms-4 side-bar">
        <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
          <span className="fw-semibold">Navbar</span>
        </div>
        <ul className="list-unstyled ps-0">
          <CreateProject />

          <SideBarProjectList />
          <li className="mb-1">
          </li>
          
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed sidebar-my-projects" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false" style={{padding: "0"}}>
              project-data.csv
            </button>
           
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
              Account
            </button>
            <div className="collapse" id="account-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
