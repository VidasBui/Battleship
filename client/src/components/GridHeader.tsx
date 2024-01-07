import { Stack } from "@mui/material";
import Cell from "./Cell";

type Props = {
  length: number;
};

const GridHeader = ({ length }: Props) => {
  const generateAlphabetCharacter = (index: number): string => {
    const charCodeA = "A".charCodeAt(0);
    return String.fromCharCode(charCodeA + index);
  };

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mr: 4 }}>
      <Cell key={`header`} />
      {Array.from({ length: length }, (_, colIndex) => (
        <Cell
          key={`header-${colIndex}`}
          text={generateAlphabetCharacter(colIndex)}
        />
      ))}
    </Stack>
  );
};

export default GridHeader;
