import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { EmptyElementProps } from "./types";

export const EmptyElement = ({
  textDescription,
  iconLocation,
}: EmptyElementProps) => {
  return (
    <div>
      <Box
        alignSelf={"center"}
        display="flex"
        justifyContent={"center"}
        marginTop="150px"
      >
        <Image src={iconLocation} alt="a" width={320} height={212} />
      </Box>
      <Typography
        paddingTop={"32px"}
        width={"320px"}
        textAlign="center"
        fontWeight={500}
        fontSize="15px"
      >
        {textDescription}
      </Typography>
    </div>
  );
};
