import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchInput from "../../components/SearchComponent/SearchInput";
import "./Home.css";
import {
  jobTitleSelector,
  searchedJobDetailSelector,
  jobLoadingSelector,
} from "../../utils/reducers/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import JobComponent from "../../components/JobComponent/JobComponent";
import Loader from "../../components/Loader/Loader";
import { loadingSelector } from "../../utils/reducers/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const jobDetail = useSelector(searchedJobDetailSelector);
  const jobTitle = useSelector(jobTitleSelector);
  const isLoading = useSelector(jobLoadingSelector);
  const loading = useSelector(loadingSelector);


  return (
    <div className="home-container">
      <Navbar />
      <div className="top-component"></div>
      <div className="center-component">
        <br />
        <h1>Find your dream job with us</h1>
        <p>Over 2.4 million+ people placed by our talented community</p>
        <SearchInput width="600px" />
      </div>
      {isLoading && <Loader />}
      <div>
        {jobDetail.length !== 0 ? (
          <div className="joblist">
            <h2>
              {jobTitle} search results {jobDetail.length}
            </h2>
            {jobDetail.map((item, index) => (
              <div key={index}>
                <JobComponent jobDetails={item} jobIndex={index} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "gray",
              marginTop: "35px",
              fontStyle: "italic",
            }}
          >
            No jobs available
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
