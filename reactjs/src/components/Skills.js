import React, { useState, useEffect } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", stream: "" });
  const [editSkill, setEditSkill] = useState(null);

  const API_BASE_URL = "http://localhost:3001/portfolio/api"; 

  // Fetch skills from the API
  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills`);
      // setSkills(response.data.skills);
      console.log(response.data)
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Create a new skill
  const createSkill = async () => {
    try {
      await axios.post(`${API_BASE_URL}/skills/create`, newSkill);
      setNewSkill({ name: "", stream: "" });
      fetchSkills();
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  // Update an existing skill
  const updateSkill = async () => {
    try {
      await axios.put(`${API_BASE_URL}/skills/update`, editSkill);
      setEditSkill(null);
      fetchSkills();
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Delete a skill
  const deleteSkill = async (name) => {
    try {
      // await axios.delete(`${API_BASE_URL}/skills/delete`, {
      //   data: { name },
      // });
      const deleteSkill = async (id) => {
      await axios.delete(`${API_BASE_URL}/skills/delete/${id}`);
};
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name}>
            {skill.name} - {skill.stream}
            <button onClick={() => setEditSkill(skill)}>Edit</button>
            <button onClick={() => deleteSkill(skill.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editSkill ? "Edit Skill" : "Add New Skill"}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editSkill ? updateSkill() : createSkill();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={editSkill ? editSkill.name : newSkill.name}
          onChange={(e) =>
            editSkill
              ? setEditSkill({ ...editSkill, name: e.target.value })
              : setNewSkill({ ...newSkill, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Stream"
          value={editSkill ? editSkill.stream : newSkill.stream}
          onChange={(e) =>
            editSkill
              ? setEditSkill({ ...editSkill, stream: e.target.value })
              : setNewSkill({ ...newSkill, stream: e.target.value })
          }
          required
        />
        <button type="submit">{editSkill ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default Skills;
