import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  footerContainer: {
    background: "#222",
    padding: "1rem",
    textAlign: "center",
  },
  text: {
    color: "tan",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Box component="footer" className={classes.footerContainer}>
      <Typography variant="body2" className={classes.text}>
        {`© ${new Date().getFullYear()} Portfolio`}
      </Typography>
    </Box>
  );
};
export default Footer;
