import React, { useState } from "react";
import { inputHelper } from "../helpers";
import { useLoginMutation } from "../apis/authApi";
import { userModel } from "../interfaces";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../storage/redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../components/page/common";
function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };
  const [loginUser] = useLoginMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response: any = await loginUser(userInput);
      if(response.data){
        const data = response.data.data;
        localStorage.setItem("token", data.token);
        var {email, id, fullName, role} : userModel = jwt_decode(data.token);
        dispatch(setLoggedInUser({email, id, fullName, role}))
        setError("");
        navigate("/");
      } else{
        setError(response.error.data.detail);
      }
    } catch (error) {
      console.log(error);
    }

  
    setLoading(false);
  };

  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={userInput.userName}
              name="userName"
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={userInput.password}
              name="password"
              onChange={handleUserInput}
              required
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
