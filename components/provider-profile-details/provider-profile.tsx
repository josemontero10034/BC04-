import { MOCK_PROFILE, photoGalery } from "@/mock/mock-profile";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Container,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useMemo, useState } from "react";

import ROUTES from "@/utils/routes";

import { StyledButton } from "../shared/styled-components";
import { FeedbackProps } from "../shared/types";
import { FeedbackListItem } from "./feedback-list-item";
import { PhotoGallery } from "./photo-gallery";
import { ProfileDetailsBox } from "./profile-details-box";

export const ProviderProfile = () => {
  const t = useTranslations("profileDetailsProvider");
  const router = useRouter();
  const [value, setValue] = useState("1");

  const jobInterests = MOCK_PROFILE.jobInterests;
  const amountFeedback = MOCK_PROFILE.clientFeedbackInfo.length;
  const clients: Array<FeedbackProps> = MOCK_PROFILE.clientFeedbackInfo;

  const promSum = useMemo(() => {
    return (
      clients.reduce((total, item) => total + item.rating, 0) / amountFeedback
    );
  }, [amountFeedback, clients]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      className="p-0 justify-center flex flex-col top-0 absolute"
    >
      <Box className="h-[180px] bg-anti-flash-white">
        <ListItemAvatar className="flex justify-between pt-[11.33px] pr-[6.4%] pl-[6.4%]">
          <KeyboardBackspaceIcon className="text-primary-dark" />
        </ListItemAvatar>
      </Box>
      <Paper className="rounded-t-[30px] relative top-[-123px] shadow-none h-[620px]">
        <Box className="self-center w-[137px] h-[137px] mb-[2px] top-[-36px] relative left-0 right-0 m-auto">
          <Image
            src={"/assets/images/order-detail-provider-profile.png"}
            alt="a"
            width={137}
            height={137}
          />
        </Box>
        <ProfileDetailsBox
          profileName={MOCK_PROFILE.providerName}
          scoreMax={promSum}
          jobInterests={jobInterests}
        />
        <Container
          disableGutters
          maxWidth={false}
          className="relative -top-[14px]"
        >
          <Box className="pl-[5.55%] pr-[5.55%] flex flex-col flex-nowrap">
            <Typography className="text-black" fontSize="13px" fontWeight="400">
              {MOCK_PROFILE.description}
            </Typography>
          </Box>
          <Box className="relative top-[-4px] w-[100%] flex flex-row justify-center">
            <StyledButton
              onClick={() => router.push(ROUTES.providerProfileDescription)}
              variant="outlined"
              className="border-[1px] border-primary-dark rounded-[10px] w-80 h-9 text-black"
            >
              {t("editDescription.title")}
            </StyledButton>
          </Box>
          <Box className="w-[100%] font-medium text-[14px]">
            <TabContext value={value}>
              <Box className="border-b-[0.5px] relative top-2 flex flex-row border-secondary-clear">
                <TabList
                  sx={{
                    ".MuiTabs-flexContainer": {
                      justifyContent: "center",
                      gap: "42px",
                    },
                    "& .MuiButtonBase-root": {
                      color: "black",
                      "&.Mui-selected": {
                        color: "primary.main",
                      },
                    },
                    ".MuiTabs-indicator": {
                      height: "3px",
                      borderRadius: "100px 100px 0px 0px",
                      background: "primary.main",
                    },
                  }}
                  className="w-full flex flex-row"
                  onChange={handleChange}
                >
                  <Tab
                    className="text-[13px] capitalize"
                    label={t("valuation")}
                    value="1"
                  />
                  <Tab
                    className="text-[13px] capitalize"
                    label={t("photoGallery")}
                    value="2"
                  />
                </TabList>
              </Box>

              <TabPanel
                className="pl-5 pr-0 h-[289px] relative top-[18px]"
                value="1"
              >
                <Box className="flex flex-row relative top-[-13px]">
                  <SupervisorAccountOutlinedIcon className="text-primary-main w-[20px] h-[20px]" />
                  <Typography
                    fontWeight={400}
                    className="ml-[2.64%] text-black"
                  >
                    {t("clientsFeedback")}
                  </Typography>
                </Box>
                <Box
                  className="flex flex-row gap-4 relative top-[5px]"
                  sx={{
                    overflowX: "scroll",
                    overflowY: "hidden",
                    height: "192px",
                  }}
                >
                  {MOCK_PROFILE.clientFeedbackInfo.map((feedback) => (
                    <Box key={feedback.id}>
                      <FeedbackListItem feedback={feedback} />
                    </Box>
                  ))}
                </Box>
              </TabPanel>
              <TabPanel className="px-5 pt-4" value="2">
                <Box className="mt-[8px] px-0 mx-0">
                  <PhotoGallery imagesAttached={photoGalery} slide={false} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Paper>
    </Container>
  );
};

export default ProviderProfile;
