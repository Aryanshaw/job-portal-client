import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import {
  loadingReducer,
  loadingSelector,
  errorReducer,
  getUserResume,
  resumeSuccessSelector,
} from "../../utils/reducers/userSlice";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import Resume from "../../components/Resume/Resume";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);
  const storedUserData = localStorage.getItem("userData");
  const resumeSuccess = useSelector(resumeSuccessSelector);

  let userDetails;
  if (JSON.parse(storedUserData).newSavedUser) {
    userDetails = JSON.parse(storedUserData).newSavedUser;
  } else {
    userDetails = JSON.parse(storedUserData);
  }

  const fetchResume = async () => {
    dispatch(loadingReducer(true));
    try {
      const resumeData = await axios.get(
        `https://job-portal-api-m1ml.onrender.com/api/user/getResumeByUserId/${userDetails._id}`
      );
      dispatch(getUserResume(resumeData.data.resume));
    } catch (err) {
      dispatch(errorReducer(err.message));
    }
    dispatch(loadingReducer(false));
  };

  useEffect(() => {
    fetchResume();
  }, []);

  useEffect(() => {
    fetchResume();
  }, [resumeSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-modal-container">
          <h2>My Resume</h2>
          <div className="profile-modal-content">
            <div className="profile-user-info">
              <p
                style={{
                  textTransform: "capitalize",
                }}
              >
                User Name: {userDetails.username}
              </p>
              <p>email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
            </div>
            <div className="profile-img-container">
              <img
                src={require("../../assets/image/user-icon.png")}
                alt=""
                className="profile-img"
              />
            </div>
          </div>
          <div>
            <Resume />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
