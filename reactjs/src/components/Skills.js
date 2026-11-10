import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(6, 2),
  },
  paper: {
    width: "100%",
    padding: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Skills = () => {
  const classes = useStyles();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", stream: "" });
  const [editSkill, setEditSkill] = useState(null);
  // Use the ingress path so the browser calls the backend through the same origin.
  // This avoids CORS issues and uses the ALB URL that is already exposed to the browser.
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/portfolio/api";

  // Fetch skills from the API
  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills`);
      const payload = response?.data;
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.skills)
        ? payload.skills
        : [];
      setSkills(items);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]);
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
      await axios.put(`${API_BASE_URL}/skills/update/${editSkill.id}`, editSkill);
      setEditSkill(null);
      fetchSkills();
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  // Delete a skill
  const deleteSkill = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/skills/delete/${id}`);
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
          Java Skills
        </Typography>

        <List>
          {skills.map((skill) => (
            <ListItem key={skill.id ?? skill.name} divider>
              <ListItemText primary={skill.name} secondary={skill.stream} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => setEditSkill(skill)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSkill(skill.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box mt={3}>
          <Typography variant="h6" align="center">
            {editSkill ? "Edit Skill" : "Add New Skill"}
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              editSkill ? updateSkill() : createSkill();
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={editSkill ? editSkill.name : newSkill.name}
              onChange={(e) =>
                editSkill
                  ? setEditSkill({ ...editSkill, name: e.target.value })
                  : setNewSkill({ ...newSkill, name: e.target.value })
              }
              required
            />
            <TextField
              label="Stream"
              variant="outlined"
              fullWidth
              value={editSkill ? editSkill.stream : newSkill.stream}
              onChange={(e) =>
                editSkill
                  ? setEditSkill({ ...editSkill, stream: e.target.value })
                  : setNewSkill({ ...newSkill, stream: e.target.value })
              }
              required
            />
            <Box className={classes.formActions}>
              {editSkill && (
                <Button onClick={() => setEditSkill(null)} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="contained" color="primary">
                {editSkill ? "Update" : "Add"}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Skills;
