import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import TopBar from "../top-bar";
import { ClientUserRoleInfo } from "./client-invoice/client-role-info";
import { ClientTransactionInfo } from "./client-invoice/client-transaction-info";

const ClientInvoiceDetail = () => {
  const t = useTranslations();

  return (
    <Container
      classes={{
        root: "absolute top-0 left-0 max-w-full h-full bg-common-white flex flex-col items-center justify-center",
      }}
    >
      <TopBar leftIcon="backArrow" pageTitle={t("invoiceDetail.title")} />

      <Paper
        className="bg-[#F4F5FC] w-[320px] h-[660px] rounded-xl "
        sx={{
          boxShadow: 5,
        }}
      >
        <Grid className=" flex flex-col rounded-xl">
          <ClientUserRoleInfo />

          <Box
            className="flex p-[9px]"
            sx={{
              gap: "180px",
            }}
          >
            <Typography className="h-[21.46px] w-[73px] text-xs font-medium mt-[5px] ml-[8px] text-davys-grey">
              {t("invoiceDetail.description")}
            </Typography>
            <Typography className="h-[21.46] w-[31px] text-xs font-medium mt-[5px] text-davys-grey">
              Total
            </Typography>
          </Box>
          <ClientTransactionInfo />
        </Grid>
      </Paper>
    </Container>
  );
};
export default ClientInvoiceDetail;
