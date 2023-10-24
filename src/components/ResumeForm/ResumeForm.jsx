import React, { useState } from "react";
import "./ResumeForm.css";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingSelector,
  getUserResume,
  loadingReducer,
  successReducer,
  errorReducer,
} from "../../utils/reducers/userSlice";
import axios from "axios";
import Loader from "../Loader/Loader";

const ResumeForm = ({ onClose }) => {
  const [skills, setSkills] = useState([""]);
  const [experience, setExperience] = useState([{}]);
  const [projects, setProjects] = useState([{}]);
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();
  const storedUserData = localStorage.getItem("userData");

  let userDetails;
  if (JSON.parse(storedUserData).newSavedUser) {
    userDetails = JSON.parse(storedUserData).newSavedUser;
  } else {
    userDetails = JSON.parse(storedUserData);
  }

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const handleExperienceChange = (index, event) => {
    const newExperience = [...experience];
    newExperience[index] = {
      ...newExperience[index],
      [event.target.name]: event.target.value,
    };
    setExperience(newExperience);
  };

  const handleProjectChange = (index, event) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [event.target.name]: event.target.value,
    };
    setProjects(newProjects);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const addExperience = () => {
    setExperience([...experience, {}]);
  };

  const addProject = () => {
    setProjects([...projects, {}]);
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const removeExperience = (index) => {
    const newExperience = [...experience];
    newExperience.splice(index, 1);
    setExperience(newExperience);
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createResume(skills, projects, experience);
  };

  const createResume = async (skills, projects, experience) => {
    console.log(skills, projects, experience, userDetails._id, "function");
    dispatch(loadingReducer(true));
    try {
      const res = await axios.post(
        "https://job-portal-api-m1ml.onrender.com/api/user/createResume",
        {
          user: userDetails._id,
          skills: skills,
          experience: experience,
          projects: projects,
        }
      );
      dispatch(successReducer(res.data.message));
      dispatch(getUserResume(res.data.resume));
      // onClose();
    } catch (err) {
      console.log(err);
      dispatch(errorReducer(err.message));
    }
    dispatch(loadingReducer(false));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="modal resumeform">
      <div className="modalContent">
        <h2>Create a new resume</h2>
        <div className="modal-close" onClick={onClose}>
          <RxCrossCircled color="black" size={35} />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Skills:</label>
            {skills.map((skill, index) => (
              <div key={index}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    value={skill}
                    onChange={(event) => handleSkillChange(index, event)}
                  />
                  <button type="button" onClick={() => removeSkill(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addSkill}>
              Add Skill
            </button>
          </div>

          <div>
            <label>Experience:</label>
            {experience.map((exp, index) => (
              <div key={index}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={exp.title || ""}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="company name"
                    value={exp.companyName || ""}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                  <textarea
                    name="responsibility"
                    rows={3}
                    placeholder="responsibilities"
                    value={exp.responsibility || ""}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />
                  <input
                    type="text"
                    name="dateWorkedOn"
                    placeholder="date worked on"
                    value={exp.dateWorkedOn || ""}
                    onChange={(event) => handleExperienceChange(index, event)}
                  />

                  <button type="button" onClick={() => removeExperience(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addExperience}>
              Add Experience
            </button>
          </div>

          <div>
            <label>Projects:</label>
            {projects.map((project, index) => (
              <div key={index}>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={project.title || ""}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={project.description || ""}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <input
                    type="text"
                    name="dateWorkedOn"
                    placeholder="date worked on"
                    value={project.dateWorkedOn || ""}
                    onChange={(event) => handleProjectChange(index, event)}
                  />
                  <button type="button" onClick={() => removeProject(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addProject}>
              Add Project
            </button>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
