import React, { } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ImportDialog(props) {
  let {
    isDialogOpen,
    importPreviewFile,
    toggle,
    importFile,
    onChangeImportFile,
    previewImportFile,
  } = props;

  function toggleModal() {
    toggle(); // Call the toggle function from props
  }

  function handleImport() {
    importPreviewFile();
  }
  // console.log("preview", previewImportFile);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={toggleModal}
      PaperProps={{
        elevation: 8,
        style: { backgroundColor: "white" },
      }}
    >
      <DialogTitle>
        <Typography>XÁC NHẬN IMPORT</Typography>
      </DialogTitle>
      <DialogContent className="dialog-content" dividers>
        <div className="import">
          <button onClick={() => importFile.current.click()}>
            <UploadFileIcon /> Chọn file
          </button>
          <input
            type="file"
            id="importFile"
            ref={importFile}
            onChange={onChangeImportFile}
            style={{ display: "none" }}
          />
        </div>
        {previewImportFile ? (
          <Typography style={{ maxWidth: "200px" }}>
            {previewImportFile.name}
          </Typography>
        ) : null}
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleModal} color="primary">
          <Typography variant="button" style={{ color: "black" }}>
            HỦY
          </Typography>
        </IconButton>
        <IconButton onClick={handleImport} color="primary" autoFocus>
          <Typography variant="button" color="primary">
            Lưu
          </Typography>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
