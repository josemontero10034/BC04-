import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AppBar, Box, IconButton, Typography } from "@mui/material";

import { getPrimaryDark } from "@/utils/theme";

interface TopBarProps {
  className?: string;
  title: string;
  onClick?: () => void;
}

const TopBar = ({ className, title, onClick }: TopBarProps) => {
  return (
    <AppBar
      position="fixed"
      className={
        className ??
        "bg-white h-[42px] mt-4 px-6 justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]"
      }
    >
      <Box className="flex justify-center relative">
        <IconButton className="p-0 left-0 absolute" onClick={onClick}>
          <KeyboardBackspaceIcon className="fill-primary-dark" />
        </IconButton>

        <Typography className="text-base font-semibold" color={getPrimaryDark}>
          {title}
        </Typography>
      </Box>
    </AppBar>
  );
};

export default TopBar;
