import React, { useState } from "react";
import "./Navbar.css";
import SearchInput from "../SearchComponent/SearchInput";
// import ModeBtn from "../ModeToggleBtn/ModeBtn";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  errorReducer,
  loadingReducer,
  loadingSelector,
} from "../../utils/reducers/userSlice";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchInputActive, setSearchInputActive] = useState(false);
  let isLoggedIn = localStorage.getItem("loggedin");
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeSearchInput = () => {
    setSearchInputActive(false);
  };

  const logout = async () => {
    dispatch(loadingReducer(true));
    try {
      const res = await axios.post("http://localhost:8800/api/auth/logout");
      if (res.data.message === "Logout successful")
        localStorage.setItem("loggedin", false);
    } catch (err) {
      dispatch(errorReducer(err.response.data));
    }
    dispatch(loadingReducer(false));
  };

  return (
    <nav>
      <div className="navbar-left-container">
        <h1 className="navbar-title">Job-Nest</h1>
      </div>

      <div
        className="menu"
        onClick={() => {
          toggleMenu();
          closeSearchInput();
        }}
      >
        &#9776;
      </div>
      <ul className={isMenuOpen ? "open" : "navbar-right-container"}>
        <li>
          <div className={`search-input-container`}>
            <div className="search-input">
              <SearchInput width="330px" />
            </div>
          </div>
        </li>
        <li>
          <Link to="/explorejobs">
            <h4 className="navbar-item">Explore Jobs</h4>
          </Link>
        </li>
        <li>
          <h4 className="navbar-item">Collection</h4>
        </li>
        <li>
          <h4 className="navbar-item">Community</h4>
        </li>
        {isLoggedIn === "false" ? (
          <li className="signin-btn">
            <Link to="/login">
              <button>Sign in</button>
            </Link>
          </li>
        ) : (
          <li>
            <div className="user-icon-component">
              <Link to="/profile">
                <div>
                  <img
                    src={require("../../assets/image/user-icon.png")}
                    alt=""
                    className="user-icon"
                  />
                </div>
              </Link>
              <div className="logout-icon" onClick={() => logout()}>
                <FiLogOut />
              </div>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;