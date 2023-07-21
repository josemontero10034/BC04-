import {
  Box,
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

export const ClientUserRoleInfo = () => {
  const t = useTranslations();

  return (
    <Box className="bg-common-white w-[320px] h-[298px] shadow-none rounded-tl-xl rounded-tr-xl">
      <TableContainer
        component={Paper}
        className="h-[298px] w-[320px] shadow-none rounded-tl-xl rounded-tr-xl"
      >
        <Table>
          <TableBody>
            <TableHead>
              <TableRow className="w-full h-[88px]">
                <Box
                  className="flex flex-col h-[88px]"
                  sx={{
                    borderBottom: "1px solid #E1E8FF",
                  }}
                >
                  <TableCell className="w-[63px] h-[16px] text-base font-semibold border-none">
                    {t("invoiceDetail.invoice")}
                  </TableCell>
                  <TableCell
                    className="w-[50px] h-[26px] text-base font-semibold border-none text-[#454445]"
                    sx={{
                      borderBottom: "1px solid #E1E8FF",
                    }}
                  >
                    #1234
                  </TableCell>
                </Box>
                <TableCell
                  className="text-sm font-medium w-[257px] align-text-top text-right"
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
              {t("invoiceDetail.addressee")}
            </Typography>
            <Typography className="h-[22px] w-[98px] text-sm font-medium mt-[8px]">
              Simón García
            </Typography>
            <Box className="flex pt-[8px] mb-[6px]">
              <Typography className="h-[19px] w-[137px] text-[11px] font-medium mr-[55px] text-davys-grey">
                sgarcia@neural.com.do
              </Typography>
              <Typography className="h-[18px] w-[90px] text-[11px] font-semibold text-davys-grey">
                RNC-52989585
              </Typography>
            </Box>
            <Typography className="h-[21.43px] w-[282px] text-xs font-medium rounded-none text-davys-grey">
              Santo Domingo Oeste, C/ Pablo Pumarol, no. 1
            </Typography>
          </Box>
        </Table>
      </TableContainer>
    </Box>
  );
};
