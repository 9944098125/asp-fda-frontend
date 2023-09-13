import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Heading(props) {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "23px", sm: "25px", md: "30px" },
            backgroundImage: "linear-gradient(to right, #00e0ff, #00069a)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "600",
          }}>
          {props.head}
        </Typography>
        <Typography variant="span" sx={{}}>
          {props.span}
          <Link to={props.link}>{props.linkText}</Link>
        </Typography>
      </Box>
    </React.Fragment>
  );
}
