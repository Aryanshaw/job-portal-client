import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Resume.css";
import { userResumeSelector } from "../../utils/reducers/userSlice";
import ResumeForm from "../ResumeForm/ResumeForm";

const Resume = () => {
  const userResume = useSelector(userResumeSelector);
  const [resumeForm, setResumeForm] = useState(false);

  const openForm = () => {
    setResumeForm(true);
  };

  const closeForm = () => {
    setResumeForm(false);
  };

  return (
    <div>
      {userResume.length !== 0 ? (
        <div className="resume-container">
          <div className="work-container">
            <h3>Work Experience</h3>
            {userResume.experience &&
              userResume.experience.map((item, index) => (
                <div key={index} className="work-component">
                  <h5 className="work-title">{item.title}</h5>
                  <p className="work-font">company: {item.companyName}</p>
                  <p className="work-font">
                    date worked on: {item.dateWorkedOn}
                  </p>
                  <h5 className="work-font responsibility-title-font">
                    Responsibilities:
                  </h5>
                  <p className="work-font responsibility-font">
                    {item.responsibility}
                  </p>
                  <h5>Skills used: </h5>
                  {item.skillsUsed &&
                    item.skillsUsed.map((item2, index2) => (
                      <div key={index2}>
                        <div className="work-skill-container">
                          <p className="work-skill">{item2}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
          <div className="project-container">
            <h3>Projects</h3>
            <div className="work-component">
              {userResume.projects &&
                userResume.projects.map((item, index) => (
                  <div key={index}>
                    <h5 className="work-title">{item.title}</h5>
                    <p className="work-font">
                      date worked on: {item.dateWorkedOn}
                    </p>
                    <h5 className="work-font responsibility-title-font">
                      Description
                    </h5>
                    <p className="work-font responsibility-font">
                      {item.description}
                    </p>
                    <h5>Skills used: </h5>
                    {item.skillsUsed &&
                      item.skillsUsed.map((item2, index2) => (
                        <div key={index2}>
                          <div className="work-skill-container">
                            <p className="work-skill">{item2}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
          <h3>Skills</h3>
          <div className="skill-component">
            {userResume.skills &&
              userResume.skills.map((item, index) => (
                <div key={index}>
                  <div className="work-skill-container">
                    <p className="work-skill">{item}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <h5>Do not have a resume? create a new one</h5>
          <button onClick={openForm} className="detail-btn">
            Create Resume
          </button>
        </div>
      )}
      {resumeForm && <ResumeForm onClose={closeForm} />}
    </div>
  );
};

export default Resume;
