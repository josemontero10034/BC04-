import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

const IdentityVerified = () => {
  const t = useTranslations("identityVerified");

  return (
    <Box className="flex grow flex-col justify-center space-y-10 bg-success-darker px-5">
      <Image
        src="/assets/icons/identity-verified.svg"
        alt=""
        width={140}
        height={106}
      />

      <Typography className="text-center text-[28px] font-semibold text-white">
        {t("message")}
      </Typography>
    </Box>
  );
};

export default IdentityVerified;
