import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Home from "@material-ui/icons/Home";
import Apps from "@material-ui/icons/Apps";
import ContactMail from "@material-ui/icons/ContactMail";
import { makeStyles } from "@material-ui/core/styles";
import avatar from "../avatar.png";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#222",
    margin: 0,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
  },
  title: {
    color: "tan",
    marginRight: theme.spacing(4),
    whiteSpace: "nowrap",
  },
  menu: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    color: "tan",
    textDecoration: "none",
    marginRight: theme.spacing(3),
    "&:hover": {
      color: "tomato",
    },
  },
  menuIcon: {
    display: "flex",
    marginRight: theme.spacing(0.5),
  },
}));

const menuItems = [
  { listIcon: <Home fontSize="small" />, listText: "Home", listPath: "/" },
  { listIcon: <AssignmentInd fontSize="small" />, listText: "Resume", listPath: "/resume" },
  { listIcon: <Apps fontSize="small" />, listText: "Portfolio", listPath: "/portfolio" },
  { listIcon: <ContactMail fontSize="small" />, listText: "Contact", listPath: "/contact" },
  { listIcon: <Apps fontSize="small" />, listText: "Java Skills", listPath: "/skills" },
  { listIcon: <Apps fontSize="small" />, listText: "Python Skills", listPath: "/skills-python" },
];

const Navbar = () => {
  const classes = useStyles();

  return (
    <Box component="nav">
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Avatar className={classes.avatar} src={avatar} alt="Mahmudul Alam" />
          <Typography variant="h6" className={classes.title}>
            Portfolio
          </Typography>
          <Box className={classes.menu}>
            {menuItems.map((item, i) => (
              <Typography
                key={i}
                component={Link}
                to={item.listPath}
                className={classes.menuItem}
              >
                <span className={classes.menuIcon}>{item.listIcon}</span>
                {item.listText}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
