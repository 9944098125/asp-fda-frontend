import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Modal } from "react-bootstrap";

export default function DeleteModal(props) {
  const { show, close, module, deleteOnClick } = props;
  return (
    <React.Fragment>
      <Modal show={show} centered size="sm" onHide={close}>
        <Modal.Header closeButton>
          <Typography sx={{}}>Delete {module}</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
            Are you sure, Do you want to Delete the {module} ?
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
              width: "100%",
            }}>
            <Button
              onClick={close}
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
                height: "35px",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  height: "40px",
                },
              }}>
              Cancel
            </Button>

            <Button
              onClick={deleteOnClick}
              sx={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
                "&:hover": {
                  backgroundColor: "darkred",
                  height: "40px",
                },
              }}>
              Delete
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
