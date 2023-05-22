import React, { useState } from "react";
import { SD_Roles } from "../utility/SD";
import { inputHelper, toastNotify } from "../helpers";
import { useRegisterMutation } from "../apis/authApi";
import { apiResponse, apiTest } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../components/page/common";
function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    name: "",
    role: "",
    password: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const [registerUser] = useRegisterMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response:any = await registerUser(userInput);
    const data:apiResponse = response?.data;
    if(data == null){
      const error = response.error.data;
      toastNotify(error.detail, "error");
    } else{
      if(data.isSuccess){
        toastNotify("Registeration successfully! Please login to continue.");
        navigate("/login")
      } else{
        toastNotify(data.detail ?? "Unknown", "error");
      }
    }
    setLoading(false);
  }
  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              value={userInput.userName}
              onChange={handleUserInput}
              className="form-control"
              placeholder="Enter Username"
              name="userName"
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              value={userInput.name}
              onChange={handleUserInput}
              className="form-control"
              placeholder="Enter Name"
              name="name"
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              value={userInput.password}
              onChange={handleUserInput}
              className="form-control"
              placeholder="Enter Password"
              name="password"
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              value={userInput.role}
              onChange={handleUserInput}
              name="role"
            >
              <option value="">--Select Role--</option>
              <option value={SD_Roles.CUSTOMER}>Customer</option>
              <option value={SD_Roles.ADMIN}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
