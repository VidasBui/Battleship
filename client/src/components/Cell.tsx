import { Box, Typography } from "@mui/material";
import "./Cell-module.scss";

type Props = {
  text?: string | number;
  onClick?: () => void;
  backgroundColor?: string;
};

const Cell = ({ text, onClick, backgroundColor }: Props) => {
  return (
    <Box
      className={`cell ${onClick && "cell__useTransition"}`}
      onClick={onClick}
      sx={{
        backgroundColor: backgroundColor,
      }}
    >
      {text && <Typography>{text}</Typography>}
    </Box>
  );
};

export default Cell;
