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

  const handleExportCSV = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/projects/csv', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include authorization token
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to export CSV');
      }
  
      const blob = await response.blob();
  
      // Trigger download of CSV file
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'projects.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };
  
    

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
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed sidebar-my-projects" onClick={handleExportCSV} style={{padding: "0"}}>
              project-data.csv
            </button>
          </li>
          
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
