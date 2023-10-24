import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  allMyApplicationSelector,
  getAllApplications,
  jobLoading,
  jobLoadingSelector,
} from "../../utils/reducers/jobSlice";
import Loader from "../../components/Loader/Loader";
import "./MyApplication.css";

const MyApplication = () => {
  const dispatch = useDispatch();
  const applications = useSelector(allMyApplicationSelector);
  const isLoading = useSelector(jobLoadingSelector);
  const storedUserData = localStorage.getItem("userData");

  let userDetails;
  if (JSON.parse(storedUserData)?.newSavedUser) {
    userDetails = JSON.parse(storedUserData).newSavedUser;
  } else {
    userDetails = JSON.parse(storedUserData);
  }

  const fetchAllApplications = async () => {
    dispatch(jobLoading(true));
    try {
      const result = await axios.get(
        `https://job-portal-api-m1ml.onrender.com/api/jobs/getJobApplicationByUserId/${userDetails._id}`
      );
      dispatch(getAllApplications(result?.data));
    } catch (err) {
      console.log(err);
    }
    dispatch(jobLoading(false));
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            padding: "30px",
          }}
          className="table"
        >
          {applications === undefined || applications.length === 0 ? (
            <div>No Job applied</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Job title</th>
                  <th>Company</th>
                  <th>Application ID</th>
                  <th>Location</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td>{application.job.title}</td>
                    <td>{application.job.company}</td>
                    <td>{application?._id}</td>
                    <td>{application.job.location}</td>
                    <td>{application.job.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MyApplication;
