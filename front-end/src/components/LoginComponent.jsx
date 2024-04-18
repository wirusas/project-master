import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import img2 from "../assets/logo1.svg";
import img3 from "../assets/logo-kompiuteris.png";

const LoginComponent = () => {
    const [username, setUsername] = useState('')

   const [password, setPassword] = useState('')


    async function handleLoginForm(e){


    }
  return (
    <div className="container">
      <div className="logo-1">
        <img src={img2} alt="" />
      </div>
      <div className="logo-2">
        <img src={img3} width={400} alt="" />
      </div>

      <br />
      <br />
      <div className="row">
        <div className="col-md-7 align-items-start">
          <div className="card">
            <div>
              <h2 className="text-start fs-1 fw-bold m-2 px-3 py-2">Login now</h2>
              <p className="m-4 text-start">Hi, Welcome back</p>
            </div>


            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-7 control-label"></label>
                  <div className="col-md-">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {/* {usernameError && <p className="text-danger">{usernameError}</p>} */}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-7 control-label"> </label>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-3 px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {/* {passwordError && <p className="text-danger ">{passwordError}</p>} */}
                  </div>
                </div>
                
                <div className="form-group mb-2">
                  <button
                    className="mt-3 px-5 py-2 rounded-3 col-12 justify-content-center align-items-center"
                    onClick={(e) => handleLoginForm(e)}
                    id="custom-button"
                  >
                    Log in
                  </button>
                </div>
                <div className="Allready-member">
                  <p>Dont have an account ?</p>
                </div>
                <div className="Login-link">
                  <a href="">Register Here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
