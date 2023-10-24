import React, { useState } from "react";
import "./JobComponent.css";
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import JobModal from "../JobModal/JobModal";

const JobComponent = ({ jobDetails, jobIndex }) => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [jobModalIndex, setJobModalIndex] = useState(0);


  const openModal = () => {
    setJobModalIndex(jobIndex);
    setModalData(jobDetails);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div>
      <div className="job-container">
        <div className="job-title-container">
          <div className="job-title-info">
            <h2 className="job-title">{jobDetails.title}</h2>
            <p className="company-name">{jobDetails.company}</p>
          </div>
          <p className="job-salary">₹{jobDetails.salary} /month</p>
        </div>
        <div style={{ marginTop: "-10px" }} className="job-skill-container">
          <h4>Skills requirements</h4>
          <div className="skill-list">
            {jobDetails.requirements &&
              jobDetails.requirements.map((item, index) => (
                <p key={index} className="skill">
                  {item}
                </p>
              ))}
          </div>
        </div>
        <div className="job-last-container">
          <div className="job-last-lower-container">
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <BsBriefcase />
                <p className="job-lower-title">Type</p>
              </div>
              <p className="job-lower-font">{jobDetails.type}</p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <AiOutlineCalendar />
                <p className="job-lower-title">End date</p>
              </div>
              <p className="job-lower-font">{jobDetails.applicationDeadline}</p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <AiOutlineHome />
                <p className="job-lower-title">location</p>
              </div>
              <p className="job-location">{jobDetails.location}</p>
            </div>
          </div>
          <button className="detail-btn" onClick={openModal}>
            More details
          </button>
        </div>
      </div>
      {modal && (
        <JobModal
          data={modalData}
          isOpen={modal}
          onClose={closeModal}
          modalIndex={jobModalIndex}
        />
      )}
    </div>
  );
};

export default JobComponent;
