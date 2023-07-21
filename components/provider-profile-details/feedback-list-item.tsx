import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Container, Rating, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import { FeedbackProps } from "../shared/types";

interface FeedbackListUser {
  feedback: FeedbackProps;
}

export const FeedbackListItem = ({ feedback }: FeedbackListUser) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      className="flex flex-col bg-blue-chalk w-[182px] h-[182px] rounded-[10px] border-[1px] border-secondary-clear"
    >
      <Box className="flex ml-2 flex-col">
        <Box className="flex flex-row pt-[17px] gap-[6px]">
          <Box>
            <Image
              src={"/assets/images/order-detail-provider-profile.png"}
              alt="a"
              width={55}
              height={55}
            />
          </Box>
          <Box className="w-[60%] h-10 flex flex-col gap-[4px]">
            <Typography fontWeight={500} fontSize={12.5} className="pt-[6px]">
              {feedback.name}
            </Typography>
            <Rating
              readOnly
              name="size-small"
              icon={
                <StarIcon
                  fontSize="inherit"
                  className="w-[15px] h-[15px] text-secondary-clear"
                />
              }
              emptyIcon={
                <StarOutlineIcon
                  fontSize="inherit"
                  className="w-[15px] h-[15px] text-secondary-clear"
                />
              }
              value={feedback.rating}
              precision={0.5}
              className="text-secondary-clear mt-[1px]"
            />
          </Box>
        </Box>
      </Box>
      <Box className="pl-[4.31%] mr-[6.66%] pt-[9px]">
        <Typography className="text-black" fontSize={11.5} fontWeight={400}>
          {feedback.feedback}
        </Typography>
      </Box>
    </Container>
  );
};
