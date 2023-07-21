import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";

import { getCommonBlack } from "@/utils/theme";

const OrderProcess = () => {
  const t = useTranslations();

  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        className="flex flex-col absolute justify-center items-center h-[100%] w-[100%]"
      >
        <Box
          display="flex"
          id="1stCircle"
          className=" bg-secondary-blue justify-center h-[308px] w-[308px]"
          borderRadius="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            id="2ndCircle"
            className="bg-clear-blue2 h-[282px] w-[282px]"
            borderRadius="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              id="3rdCircle"
              className="bg-clear-blue3 h-[254px] w-[254px]"
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src="/order-process-image.gif"
                alt="me"
                width="320px"
                height="240px"
              />
            </Box>
          </Box>
        </Box>
        <Typography
          className="mt-[36px] w-[320px] h-[87px] text-center text-xl font-medium"
          color={getCommonBlack}
        >
          {t("createOrder.orderProcess")}
        </Typography>
      </Container>
    </>
  );
};

export default OrderProcess;
