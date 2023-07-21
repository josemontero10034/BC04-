import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { getPrimaryDark } from "@/utils/theme";

const NavBar = () => {
  const { status } = useSession();
  return (
    <>
      {status !== "authenticated" && (
        <AppBar className="fixed h-11 flex flex-row items-center px-1 bg-inherit">
          <Box className="flex items-center">
            <Image src="/blue-pages-icon.png" alt="me" width="30" height="30" />
            <Typography
              variant="h3"
              className="ml-2 uppercase"
              color={getPrimaryDark}
            >
              Blue Pages
            </Typography>
          </Box>
        </AppBar>
      )}
    </>
  );
};
export default NavBar;
