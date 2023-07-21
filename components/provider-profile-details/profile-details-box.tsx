import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Container, Rating, Typography } from "@mui/material";
import React from "react";

import { getCommonBlack } from "@/utils/theme";

import { CustomChip } from "../shared/custom-fields";

interface TopProfileDetailsProps {
  scoreMax: number;
  profileName: string;
  jobInterests: Array<{
    id: string;
    job: string;
  }>;
}

export const ProfileDetailsBox = ({
  scoreMax,
  profileName,
  jobInterests,
}: TopProfileDetailsProps) => {
  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        className="flex relative top-[-29px] justify-center"
      >
        <Box className="flex flex-col justify-items-center w-full">
          <Box alignSelf="center">
            <Typography
              fontWeight={500}
              fontSize={"15px"}
              color={"common.black"}
            >
              {profileName}
            </Typography>
            <Box className="flex flex-row gap-[6px]" paddingLeft="9%">
              <Typography
                variant="h6"
                color={getCommonBlack}
                className="pl-[3.02%] mt-[9px]"
              >
                {`${scoreMax}/5`}
              </Typography>
              <Rating
                readOnly
                name="size-small"
                emptyIcon={
                  <StarOutlineIcon
                    fontSize="inherit"
                    className="text-secondary-clear"
                  />
                }
                defaultValue={0}
                value={scoreMax}
                precision={0.25}
                size="small"
                className="text-secondary-clear mt-[10px]"
              />
            </Box>
          </Box>
          <Container
            className="flex justify-center max-w-[360px]"
            maxWidth={false}
          >
            <Box className="pt-[13px] flex flex-row gap-[5px]">
              {jobInterests?.map((items) => (
                <Box key={items.id}>
                  <CustomChip
                    className="bg-secondary-clear hover:bg-secondary-clear focus:bg-secondary-clear opacity-90 text-white text-xs h-[30px]"
                    label={items.job}
                    value={items.id}
                  />
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};
