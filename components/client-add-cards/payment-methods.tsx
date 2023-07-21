import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";

import { PaymentDetails } from "./types";

export const PaymentMethodList = ({
  cardDetail,
  setOpenDetailsCard,
  setCardInfo,
  cardType,
}: PaymentDetails) => {
  const privatedigits = "****";
  const lastFourDigits = cardDetail.cardId.slice(-4);

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      height="50px"
      alignItems="center"
      className="border-b-[1px] border-b-[#E7ECEE] pl-[20px] pr-[25px]"
    >
      <div className="flex gap-2">
        <Image
          src={`/assets/icons${cardType(lastFourDigits)}`}
          alt="a"
          width={31}
          height={22}
        />
        <Typography>{privatedigits}</Typography>
        <Typography
          fontWeight={400}
          lineHeight="19.5px"
          fontSize="13px"
          color={"#242424"}
        >
          {lastFourDigits}
        </Typography>
      </div>
      <IconButton
        className="p-0"
        onClick={() => {
          setCardInfo(cardDetail);
          setOpenDetailsCard("openDetails");
        }}
      >
        <ArrowForwardIosIcon className="text-primary-dark w-[18px] h-[18px]" />
      </IconButton>
    </Box>
  );
};
