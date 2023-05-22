import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartItemModel, userModel } from "../../interfaces";
import { RootState } from "../../storage/redux/store";
import { useDispatch } from "react-redux";
import {
  setLoggedInUser,
  userEmptyState,
} from "../../storage/redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
let logo = require("../../assets/images/mango.png");

function Header() {
  const cartItemsFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.useAuthStore
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...userEmptyState }));
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink to="/">
            <img src={logo} alt="" className="m-1" style={{ height: "40px" }} />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/shopping-cart"
                >
                  {" "}
                  <i className="bi bi-cart4"></i>
                  {userData.id && `(${cartItemsFromStore.length})`}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-divider"></a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Wellcome, {userData.fullName}
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        onClick={handleLogout}
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-item" to="/login">
                        <button
                          className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                          style={{
                            border: "none",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Login
                        </button>
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
