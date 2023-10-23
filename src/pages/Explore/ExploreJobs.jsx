import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IoIosArrowBack } from "react-icons/io";
import "./ExploreJobs.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  jobLoading,
  jobLoadingSelector,
  jobError,
  getAllJobs,
  jobDetailSelector,
} from "../../utils/reducers/jobSlice";
import Loader from "../../components/Loader/Loader";
import JobComponent from "../../components/JobComponent/JobComponent";
import { Link } from "react-router-dom";

const ExploreJobs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(jobLoadingSelector);
  const jobDetails = useSelector(jobDetailSelector);

  const fetchAllJobs = async () => {
    dispatch(jobLoading(true));
    try {
      const result = await axios.get(
        "http://localhost:8800/api/jobs/getAllJobs"
      );
      dispatch(getAllJobs(result.data));
    } catch (err) {
      console.log(err.message);
      dispatch(jobError(err.message));
    }
    dispatch(jobLoading(false));
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);


  return (
    <div>
      <Navbar />
      <div className="explore-center-component">
        <Link to="/">
          <IoIosArrowBack color="white" size={26} />
        </Link>
        <h1>Explore all the jobs available</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="joblist">
          {jobDetails.map((item, index) => (
            <div key={index}>
              <JobComponent jobDetails={item} jobIndex={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreJobs;
