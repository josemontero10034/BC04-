import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { currencyFormat } from "@/utils/formats.utils";
import ROUTES from "@/utils/routes";

import TopBar from "../top-bar";

const ProviderInvoiceDetail = () => {
  const t = useTranslations("invoiceDetail");

  const router = useRouter();

  const values = {
    fullCost: 200000,
    diagnosisDiscount: 20,
    commission: 0,
    itbis: 0,
    isr: 0,
    totalCost: 0,
    isPaid: false,
  };

  return (
    <Container
      classes={{
        root: "absolute top-0 left-0 max-w-full h-full bg-common-white flex flex-col items-center justify-center",
      }}
    >
      <TopBar
        leftIcon="backArrow"
        pageTitle={t("title")}
        onLeftIconClick={() => router.push(ROUTES.financeProvider)}
      />

      <Paper
        className={`bg-[#F4F5FC] w-[320px] rounded-xl mt-12 ${
          values.isPaid ? "h-[630px]" : "h-[715px]"
        }`}
        sx={{
          boxShadow: 5,
        }}
      >
        <Grid className=" flex flex-col rounded-xl">
          <Box className="bg-[#FDFEFF] w-[320px] h-[270px] shadow-none rounded-tl-xl rounded-tr-xl">
            <TableContainer
              component={Paper}
              className="h-[270px] w-[320px] shadow-none rounded-tl-xl rounded-tr-xl"
            >
              <Table>
                <TableBody>
                  <TableHead>
                    <TableRow className="w-full">
                      <TableCell
                        sx={{
                          color: "common.black",
                          borderBottom: "1px solid #E1E8FF",
                        }}
                        className="w-[217.59px] text-base font-semibold"
                        colSpan={30}
                      >
                        {t("invoice")} #1234
                      </TableCell>

                      <TableCell
                        className="text-sm font-medium text-right"
                        sx={{
                          borderBottom: "1px solid #E1E8FF",
                        }}
                      >
                        25/03/2023
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </TableBody>

                <Box className="h-[22px] w-[92px] mt-[16px] ml-[16px]">
                  <Typography className="h-[22px] w-[191px] text-sm font-medium">
                    Franceli Lora
                  </Typography>
                  <Typography className="h-[19px] w-[191px] text-xs font-medium mt-[6px] text-davys-grey">
                    Ebanistería
                  </Typography>
                  <Typography className="h-[19px] w-[250px] text-[11px] font-medium mt-[6px] text-davys-grey">
                    Reparación de Muebles
                  </Typography>
                </Box>
                <Box className="flex flex-col mt-[60px] ml-[16px]">
                  <Typography className="h-[21px] w-[85px] text-[13px] font-medium text-[#676E84]">
                    {t("billed")}
                  </Typography>
                  <Typography className="h-[22px] w-[98px] text-sm font-medium mt-[8px]">
                    Simón García
                  </Typography>
                  <Box className="flex pt-[8px] mb-[6px]">
                    <Typography className="h-[19px] w-[137px] text-[11px] underline font-medium mr-[55px] text-davys-grey">
                      sgarcia@neural.com.do
                    </Typography>
                    <Typography className="h-[18px] w-[90px] text-[11px] font-semibold text-davys-grey">
                      RNC-52989585
                    </Typography>
                  </Box>
                  <Typography className="h-[21.43px] w-[282px] text-xs font-medium text-davys-grey">
                    Santo Domingo Oeste, C/ Pablo Pumarol, no. 1
                  </Typography>
                </Box>
              </Table>
            </TableContainer>
          </Box>

          <Box
            className="flex p-[9px]"
            sx={{
              gap: "180px",
            }}
          >
            <Typography
              fontWeight={"h3.fontWeight"}
              className="h-[21.46px] w-[73px] text-xs mt-[5px] ml-[8px] text-davys-grey"
            >
              {t("description")}
            </Typography>
            <Typography
              fontWeight={"h3.fontWeight"}
              className="h-[21.46] w-[31px] text-xs mt-[5px] text-davys-grey"
            >
              Total
            </Typography>
          </Box>
          <Box
            className={`rounded-bl-xl rounded-br-xl bg-[#FDFEFF] w-[320px] ${
              values.isPaid ? "h-[316px]" : "h-[400px]"
            }`}
          >
            <Box
              className="flex flex-row justify-between bg-[#FDFEFF] h-[35px] text-center p-[9px] pl-1 border-[#E1E8FF]"
              sx={{
                borderBottom: "1px solid",
              }}
            >
              <Typography className="h-[19px] w-[125px] text-xs font-semibold">
                {t("serviceCost")}
              </Typography>
              <Typography className="h-[19px] text-xs font-semibold">
                ${currencyFormat(values.fullCost)}
              </Typography>
            </Box>

            <Box
              className="flex flex-row justify-between bg-[#FDFEFF] h-[35px] text-center p-[9px] border-[#E1E8FF]"
              sx={{
                borderBottom: "1px solid",
              }}
            >
              <Typography className="h-[19px] w-[187px] text-xs font-semibold">
                {t("diagnosticDiscount")}
              </Typography>
              <Typography className="h-[19px] text-xs font-semibold">
                ${currencyFormat(values.diagnosisDiscount)}
              </Typography>
            </Box>

            <TableContainer
              className="flex flex-row w-[320px] h-[173px]"
              sx={{
                verticalAlign: "baseline",
              }}
            >
              <Table className="h-[122px]">
                <TableBody>
                  <TableRow className="w-full">
                    <TableCell
                      className="border-none py-[4px]"
                      sx={{
                        colSpan: 112,
                      }}
                    />

                    <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                      {t("commission")}
                    </TableCell>
                    <TableCell className="text-[11px] font-medium border-none text-right py-[4px] text-[#676E84] relative right-0">
                      ${currencyFormat(values.commission)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="border-none py-[4px]" />
                    <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                      ITBIS 18%
                    </TableCell>
                    <TableCell className="text-[11px] font-medium border-none text-right py-[4px] text-[#676E84]">
                      ${currencyFormat(values.itbis)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="border-none py-[4px]" />
                    <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                      ISR 2%
                    </TableCell>
                    <TableCell className="text-[11px] font-medium border-none text-right py-[4px] text-[#676E84]">
                      ${currencyFormat(values.isr)}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #E1E8FF",
                      borderTop: "1px solid #E1E8FF",
                      paddingY: "16px",
                    }}
                  />
                  <TableCell
                    className="h-[19px] w-[112px] text-xs font-semibold py-[4px]"
                    sx={{
                      borderBottom: "1px solid #E1E8FF",
                      borderTop: "1px solid #E1E8FF",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className="h-[19px] w-[42px] text-xs font-semibold py-[4px] text-right"
                    sx={{
                      borderBottom: "1px solid #E1E8FF",
                      borderTop: "1px solid #E1E8FF",
                    }}
                  >
                    $
                    {values.totalCost
                      ? currencyFormat(
                          values.fullCost -
                            values.diagnosisDiscount -
                            values.commission -
                            values.itbis -
                            values.isr
                        )
                      : "0.00"}
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>

            <Box className="flex">
              <Typography className="absolute h-[19px] w-[124px] text-xs font-medium mt-[-40px] ml-[16px] text-[#676E84]">
                {t("workDetails")}
              </Typography>

              <Typography
                className={`w-[288px] text-[12px] font-normal ml-[16px] rounded-[0px 0px 15px 15px] ${
                  values.isPaid
                    ? "h-[72px] mt-[-15px]"
                    : "h-[60px] mt-[-12px] mb-[12px]"
                }`}
                sx={{
                  lineHeight: "20px", //as it requires a line height the text size cannot be xs, it has to be [12]
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                rutrum blandit odio vehicula ornare.
              </Typography>
            </Box>
            {!values.isPaid && (
              <Box
                className="flex"
                sx={{
                  borderTop: "1px solid #E1E8FF",
                }}
              >
                <Typography className="absolute h-[19px] w-[124px] text-xs font-medium mt-[12px] ml-[16px] text-[#52505F]">
                  {t("pending.noteTitle")}
                </Typography>

                <Typography
                  className="h-[40px] w-[288px] text-[12px] font-normal mt-[36px] ml-[16px] rounded-[0px 0px 15px 15px]"
                  sx={{
                    lineHeight: "20px", //as it requires a line height the text size cannot be xs, it has to be [12]
                  }}
                >
                  {t("pending.noteDescription")}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProviderInvoiceDetail;
