import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

import { currencyFormat } from "@/utils/formats.utils";

export const ClientTransactionInfo = () => {
  const t = useTranslations();

  const values = {
    fullCost: 0,
    commission: 0,
    detailsCost: 0,
    diagnosis: 0,
    itbis: 0,
    isr: 0,
    totalCost: 0,
  };

  return (
    <Box className="rounded-bl-xl rounded-br-xl bg-[#FDFEFF] w-[320px] h-[320px]">
      <Box
        className="flex flex-row center bg-common-white h-[35px] gap-[130px] text-center p-[9px]"
        sx={{
          borderBottom: "1px solid #E1E8FF",
        }}
      >
        <Typography className="h-[19px] w-[125px] text-xs font-semibold">
          {t("invoiceDetail.serviceCost")}
        </Typography>
        <Typography className="h-[19px] w-[47px] text-xs font-semibold">
          ${currencyFormat(values.fullCost)}
        </Typography>
      </Box>

      <TableContainer className="flex flex-row w-[320px] h-[173px]">
        <Table className="h-[122px]">
          <TableBody className="h-[35px]">
            <TableRow className="h-[30px]">
              <TableCell className="border-none py-[4px]" />
              <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                {t("invoiceDetail.grossPrice")}
              </TableCell>
              <TableCell className="text-[11px] font-medium border-none items-left py-[4px] text-[#676E84]">
                ${currencyFormat(values.detailsCost)}
              </TableCell>
            </TableRow>
            <TableRow className="h-[30px]">
              <TableCell className="border-none py-[4px]" />

              <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                {t("invoiceDetail.diagnostic")}
              </TableCell>
              <TableCell className="text-[11px] font-medium border-none items-left py-[4px] text-[#676E84]">
                ${currencyFormat(values.diagnosis)}
              </TableCell>
            </TableRow>
            <TableRow className="h-[30px]">
              <TableCell className="border-none py-[4px]" />

              <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                ITBIS 18%
              </TableCell>
              <TableCell className="text-[11px] font-medium border-none items-left py-[4px] text-[#676E84]">
                ${currencyFormat(values.itbis)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border-none py-[4px]" />
              <TableCell className="text-[11px] font-normal border-none items-left py-[4px] text-[#676E84]">
                ISR 2%
              </TableCell>
              <TableCell className="text-[11px] font-medium border-none items-left py-[4px] text-[#676E84]">
                ${currencyFormat(values.isr)}
              </TableCell>
            </TableRow>
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
                className="h-[19px] w-[42px] text-xs font-semibold py-[4px]"
                sx={{
                  borderBottom: "1px solid #E1E8FF",
                  borderTop: "1px solid #E1E8FF",
                }}
              >
                $
                {values.totalCost
                  ? currencyFormat(
                      values.fullCost -
                        values.commission -
                        values.detailsCost -
                        values.diagnosis -
                        values.itbis -
                        values.isr
                    )
                  : "0.00"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex h-[3px]">
        <Typography className="absolute h-[19px] w-[150px] text-xs font-medium mt-[-2px] ml-[16px] text-[#676E84]">
          {t("invoiceDetail.workDescription")}
        </Typography>

        <Typography
          className="h-[72px] w-[288px] text-[12px] font-normal mt-[28px] ml-[16px] rounded-[0px 0px 15px 15px]"
          sx={{
            lineHeight: "25px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum
          blandit odio vehicula ornare.
        </Typography>
      </Box>
    </Box>
  );
};
