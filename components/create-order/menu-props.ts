import { getPrimaryDark, theme } from "@/utils/theme";

const MENU_PROPS = {
  autoFocus: false,
  PaperProps: {
    style: {
      background: theme.palette.secondary.light,
      maxHeight: "220px",
      OverflowY: "scroll",
    },
    sx: {
      "&::-webkit-scrollbar": {
        width: 6,
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#DDEEFB4D",
        borderLeft: 1,
        borderLeftColor: "#DEDEDE",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: getPrimaryDark,
        borderRadius: 4,
      },
    },
  },
};

export default MENU_PROPS;
