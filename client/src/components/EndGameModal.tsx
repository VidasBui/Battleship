import { Box, Stack, Modal, Typography, Button } from "@mui/material";
import "./EndGameModal-module.scss";

type Props = {
  onClose: () => void;
  onRestart: () => void;
  open: boolean;
  message?: string;
};

const EndGameModal = ({ open, onClose, onRestart, message }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box id="modalBox" className="modalBox">
        <Typography variant="h3" className="message" sx={{ my: 3 }}>
          {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" className="closeButton" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            className="restartButton"
            onClick={() => {
              onClose();
              onRestart();
            }}
          >
            Play again
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EndGameModal;
