import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import "./SearchInput.css";
import {
  getAllJobs,
  getJobTitle,
  getSearchedJobs,
  jobError,
  jobLoading,
} from "../../utils/reducers/jobSlice";

const SearchInput = ({ width, fetchImage }) => {
  const inputStyle = {
    width: width || "200px",
    alignSelf: "center",
    border: "none",
  };
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [hitEnter, setHitEnter] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSearchInputChange = (event) => {
    setText(event.target.value);
    setShowRecommendations(true);
  };

  const searchJobHandler = async () => {
    dispatch(jobLoading(true));
    try {
      const result = await axios.post(
        "http://localhost:8800/api/jobs/getJobByInput",
        {
          title: text,
        }
      );
      dispatch(getJobTitle(text));
      dispatch(getSearchedJobs(result.data));
    } catch (e) {
      dispatch(jobError(e.response.data));
    }
    dispatch(jobLoading(false));
  };

  const handleRecommendationClick = (recommendation) => {
    setText(recommendation);
    setShowRecommendations(false);
  };

  return (
    <div className="search-container" style={{ width: inputStyle.width }}>
      <div style={{ display: "flex", width: inputStyle.width }}>
        <AiOutlineSearch className="icon" color="black" />
        <input
          type="text"
          placeholder="Search job roles..."
          style={inputStyle}
          value={text}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => setHitEnter(e.key)}
        />
        <button
          className="search-btn"
          onClick={() => {
            searchJobHandler();
            setShowRecommendations(false);
          }}
        >
          Go
        </button>
      </div>

      {showRecommendations && text && (
        <div className="recommendations">
          <div onClick={() => handleRecommendationClick("frontend developer")}>
            frontend developer
          </div>
          <div onClick={() => handleRecommendationClick("backend developer")}>
            backend developer
          </div>
          <div onClick={() => handleRecommendationClick("fullStack developer")}>
            fullStack developer
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
