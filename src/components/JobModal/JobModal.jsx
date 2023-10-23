import React, { useEffect, useState } from "react";
import "./JobModal.css";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  errorReducer,
  getUserResume,
  loadingReducer,
  userResumeSelector,
} from "../../utils/reducers/userSlice";
import axios from "axios";
import {
  applyToJob,
  jobApplicationSelector,
  jobError,
  jobLoadingSelector,
  jobSuccess,
  jobAppliedSelector,
  jobLoading,
  jobErrorSelector,
} from "../../utils/reducers/jobSlice";
import Loader from "../../components/Loader/Loader";

const JobModal = ({ onClose, data, modalIndex, isOpen }) => {
  const navigation = useNavigate();
  var isLoggedIn = localStorage.getItem("loggedin");
  const dispatch = useDispatch();
  const storedUserData = localStorage.getItem("userData");
  const userResume = useSelector(userResumeSelector);
  const isLoading = useSelector(jobLoadingSelector);
  const jobApplication = useSelector(jobApplicationSelector);
  const jobApplied = useSelector(jobAppliedSelector);
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [fetchJobSuccess, setFetchJobSuccess] = useState("");
  const error = useSelector(jobErrorSelector);

  let applied;
  let applicationFilled;

  let userDetails;
  if (JSON.parse(storedUserData).newSavedUser) {
    userDetails = JSON.parse(storedUserData).newSavedUser;
  } else {
    userDetails = JSON.parse(storedUserData);
  }

  const JobDescription = (data) => {
    const paragraphs = data?.description
      .split("\n")
      .map((paragraph, index) => <div key={index}>{paragraph}</div>);
    return paragraphs;
  };

  const description = JobDescription(data);

  const fetchResume = async () => {
    dispatch(loadingReducer(true));
    try {
      const resumeData = await axios.get(
        `http://localhost:8800/api/user/getResumeByUserId/${userDetails._id}`
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

  const handleJobApply = async () => {
    if (isLoggedIn === "false") {
      navigation("/login");
    } else {
      dispatch(loadingReducer(true));
      try {
        const result = await axios.post(
          `http://localhost:8800/api/jobs/applyForJobById/${data._id}`,
          {
            job: data._id,
            user: userDetails,
            coverLetter: "I am interested in this job",
            resume: userResume,
          }
        );
        console.log(result.data);
        dispatch(jobSuccess(result.data.message));
        dispatch(applyToJob(result.data.application));
        if (result.data) onClose();
      } catch (err) {
        dispatch(jobError(err.response.data.submitted));
      }
      dispatch(loadingReducer(false));
    }
  };

  const fetchJobApplicationByJobId = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8800/api/jobs/getJobApplicationByJobId/${data._id}`
      );
      setJobData(res.data);
      setFetchJobSuccess("success");
    } catch (err) {
      dispatch(jobError(err.message));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobApplicationByJobId();
  }, [isOpen]);

  if (fetchJobSuccess === "success") {
    applied = jobData?.applied;
  }

  if (error === "You have already applied for this job") {
    applicationFilled = true;
  } else {
    applicationFilled = false;
  }

  return (
    <div className="modal">
      <div className="modalContent">
        {loading || isLoading ? (
          <Loader />
        ) : (
          <div>
            <div className="modal-close" onClick={onClose}>
              <RxCrossCircled color="black" size={35} />
            </div>
            <div className="modal-container">
              <div>
                <h1 className="modal-title">{data.title}</h1>
                <h4 className="modal-company">{data.company}</h4>
                {description && (
                  <div>
                    <h4>Job Description:</h4>
                    {description.map((item, index) => (
                      <div className="modal-job-desc" key={index}>
                        {item.props.children}
                      </div>
                    ))}
                  </div>
                )}

                <p className="modal-job-location">location: {data.location}</p>
                <p className="modal-job-salary">
                  Salary: ₹{data.salary} /month
                </p>
                <p className="modal-job-type">{data.type}</p>
              </div>
              <div className="modal-lower-container">
                <div>
                  <h5 style={{ marginLeft: "10px", marginBottom: "-2px" }}>
                    Required Skills
                  </h5>
                  {data?.requirements.map((item, index) => (
                    <span key={index} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
                {error !== true ? (
                  <button className="detail-btn" onClick={handleJobApply}>
                    Apply to this job
                  </button>
                ) : (
                  <button disabled className="disabled-btn">
                    Already applied
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobModal;
