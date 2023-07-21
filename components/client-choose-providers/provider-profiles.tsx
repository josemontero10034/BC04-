import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Avatar, Box, Divider, Rating, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { StyledButton } from "../shared/styled-components";

interface ProviderProfileProps {
  name: string;
  experience: string;
  description: string;
  icon: string;
  rating: number;
}

const ProviderProfile = (props: ProviderProfileProps) => {
  const { name, experience, description, icon, rating } = props;
  const t = useTranslations("chooseProviders");

  return (
    <>
      <Box className="flex flex-row mt-4">
        <Box>
          <Avatar className="h-[92px] w-[92px]">
            <Image src={icon} alt="foto del proveedor" height={92} width={92} />
          </Avatar>
          <Rating
            value={rating}
            readOnly
            size="small"
            precision={0.1}
            className="mt-[13px]"
            icon={
              <StarRoundedIcon
                fontSize="inherit"
                className="fill-secondary-clear"
              />
            }
            emptyIcon={
              <StarBorderRoundedIcon
                fontSize="inherit"
                className="fill-secondary-clear"
              />
            }
          />
        </Box>
        <Box className="w-[213px] ml-[15px]">
          <Box>
            <Typography variant="body1">{name}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" className="mt-1">
              {experience}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize={"10px"} fontWeight={400} className="mt-1">
              {description}
            </Typography>
          </Box>
          <Box className="flex flex-row relative space-x-2">
            <StyledButton
              className="bg-white border-1 border-primary-main w-[102px] h-[32px]   justify-center"
              variant="outlined"
            >
              <Typography className="font-semibold text-[11px]">
                {t("declineProvider")}
              </Typography>
            </StyledButton>
            <StyledButton
              className="bg-primary-dark focus:bg-primary-dark w-[102px] h-[32px]"
              variant="contained"
            >
              <Typography className="font-semibold text-[11px]">
                {t("acceptProvider")}
              </Typography>
            </StyledButton>
          </Box>
        </Box>
      </Box>
      <Divider className="w-[320px] mt-[12px]" />
    </>
  );
};

export default ProviderProfile;
