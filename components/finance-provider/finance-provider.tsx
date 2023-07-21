import MOCK_PROVIDER_BILLS from "@/mock/mock-provider-bills";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import ROUTES from "@/utils/routes";

import DateRangeFilter from "../shared/date-range-filter/date-range-filter";
import { EmptyElement } from "../shared/empty-element";
import FinancePdf from "../shared/finance-pdf";
import { StyledButton } from "../shared/styled-components";
import { Invoice } from "../shared/types";
import TopBar from "../top-bar";

const FinanceProvider = () => {
  const t = useTranslations("financeProvider");
  const router = useRouter();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoices, setSelectecInvoices] = useState<Invoice[]>([]);
  const [shareMode, setShareMode] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const handleToggle = (value: Invoice) => () => {
    const currentIndex = selectedInvoices.findIndex((x) => x.id === value.id);
    const newChecked = [...selectedInvoices];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectecInvoices(newChecked);
  };

  const onCheckAll = () => {
    if (!checkAll) {
      setSelectecInvoices([
        ...financesProviderPending,
        ...financesProviderPaid,
      ]);
      setCheckAll(true);
    } else {
      setSelectecInvoices([]);
      setCheckAll(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    setInvoices(MOCK_PROVIDER_BILLS);
  }, []);

  const financesProviderPending = invoices.filter((items) => !items.isPaid);

  const financesProviderPaid = invoices.filter((items) => items.isPaid);

  const handleClick = () => {
    setInvoices(
      filterInvoicesbyDate(selectionRange.startDate, selectionRange.endDate)
    );
    setIsOpen(false);
  };

  const handleFilterClick = () => {
    setSelectionRange({
      ...selectionRange,
      startDate: new Date(),
      endDate: new Date(),
    });
    setInvoices(MOCK_PROVIDER_BILLS);

    setIsOpen(false);
  };

  const allInvoices: Invoice[] = MOCK_PROVIDER_BILLS;

  const filterInvoicesbyDate = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    const filtered = allInvoices?.filter((invoice) => {
      const invoiceDate = new Date(invoice.date);

      const newStartDate = startDate ?? new Date();
      const newEndDate = endDate ?? new Date();

      return invoiceDate >= newStartDate && invoiceDate <= newEndDate;
    });

    return filtered ?? [];
  };

  return (
    <Container
      sx={{
        "&.MuiContainer-root": {
          position: "absolute",
          top: 0,
          left: 0,
          maxWidth: "100%",
          paddingLeft: "0px",
          paddingRight: "0px",
          height: "100%",
          backgroundColor: "common.white",
        },
      }}
    >
      <>
        <>
          <TopBar
            leftIcon="backArrow"
            pageTitle={t("title")}
            rightIcon={
              <Box>
                {shareMode ? (
                  <Box className="flex text-primary-dark justify-between gap-2 items-center h-6">
                    <Box className="flex items-center font-semibold">
                      <Checkbox
                        className="fill-primary-dark"
                        onClick={() => onCheckAll()}
                      />
                      {t("selectAll")}
                    </Box>

                    <IconButton
                      onClick={() => {
                        setShareMode(!shareMode);
                        setSelectecInvoices([]);
                      }}
                      className="w-[24px] h-[24px] text-primary-dark"
                    >
                      <DeleteIcon className="fill-error-dark" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box className="flex justify-between items-center gap-2">
                    <DateRangeFilter
                      isOpen={isOpen}
                      handleApplyFilter={handleClick}
                      handleClearFilter={handleFilterClick}
                      setSelectionRange={setSelectionRange}
                      selectionRange={selectionRange}
                      setIsOpen={setIsOpen}
                    />
                    <IconButton
                      onClick={() => setShareMode(!shareMode)}
                      className="w-[24px] h-[24px] text-primary-dark"
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            }
          />
        </>
      </>

      {invoices.length !== 0 ? (
        <Box className={shareMode ? "pb-[80px]" : ""}>
          <>
            <Typography className="font-medium text-[15px] leading-[160%] tracking-[0.15px] mt-[66px] mb-[16px] pl-[16px]">
              {t.rich("subtitles.pendingAmounts")}
            </Typography>

            {financesProviderPending?.map((invoice: Invoice) => (
              <Container
                id="text"
                className={shareMode ? "bg-[#F3F6FB]" : ""}
                disableGutters
                maxWidth={false}
                key={invoice.id}
              >
                <Box className="flex py-2 px-4">
                  {shareMode && (
                    <Checkbox
                      edge="start"
                      checked={selectedInvoices.includes(invoice)}
                      onChange={handleToggle(invoice)}
                    />
                  )}
                  <Box className="w-full h-[51px] max-w-full flex flex-col justify-between items-center">
                    <Box className="w-full h-[20px] max-w-full flex flex-row justify-between items-center ">
                      <Typography className="font-medium text-[13px] leading-[20px] text-left">
                        {t("invoiceTitle")} {invoice.number}
                      </Typography>
                      <Typography className="font-medium text-[13px] leading-[19px] text-right text-primary-main">
                        {invoice.cost}
                      </Typography>
                    </Box>
                    <Box className="w-full h-[19px] max-w-full flex flex-row justify-between items-center">
                      <Typography className="font-normal text-[12.5px] leading-[19px] text-left">
                        {invoice.date}
                      </Typography>
                      <IconButton
                        onClick={() => router.push(ROUTES.invoiceDetail)}
                        className="p-0"
                      >
                        <ArrowForwardIosIcon className="w-[19px] h-[19px] text-primary-dark" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                <Divider
                  className="border-solid border-[1px] border-light-gray"
                  variant="fullWidth"
                  component="div"
                />
              </Container>
            ))}
          </>
          <>
            <Typography className="font-medium text-[15px] leading-[160%] tracking-[0.15px] my-[16px] pl-[16px]">
              {t.rich("subtitles.paidAmounts")}
            </Typography>
            {financesProviderPaid?.map((invoice) => (
              <Container
                className={shareMode ? "bg-[#F3F6FB]" : ""}
                disableGutters
                maxWidth={false}
                key={invoice.id}
              >
                <Box className="flex py-2 px-4">
                  {shareMode && (
                    <Checkbox
                      edge="start"
                      checked={selectedInvoices.includes(invoice)}
                      onChange={handleToggle(invoice)}
                    />
                  )}
                  <Box className="w-full h-[60px] max-w-full flex flex-col justify-between items-center ">
                    <Box className="w-full h-[20px] max-w-full flex flex-row justify-between items-center ">
                      <Typography className="font-medium text-[13px] leading-[20px] text-left">
                        {t("invoiceTitle")} {invoice.number}
                      </Typography>
                      <Typography className="font-medium text-[13px] leading-[19px] text-right text-primary-main">
                        {invoice.cost}
                      </Typography>
                    </Box>
                    <Box className="w-full h-[30px] max-w-full flex flex-row justify-between items-center">
                      <Typography className="font-normal text-[12.5px] leading-[19px] text-left">
                        {invoice.date}
                      </Typography>
                      <Avatar
                        className="w-[30px] h-[30px] rounded-[5px] bg-[#eeeeee]"
                        variant="square"
                      >
                        <TrendingUpIcon className="w-[20px] h-[20px] text-[#588157]" />
                      </Avatar>
                    </Box>
                  </Box>
                </Box>

                <Divider
                  className="border-solid border-[1px] border-light-gray"
                  variant="fullWidth"
                  component="div"
                />
              </Container>
            ))}
            {shareMode && (
              <Box className="w-full h-[80px] flex fixed bottom-0 left-0 right-0 bg-white justify-evenly">
                <StyledButton
                  className="w-[156px] font-semibold text-xs border-2 focus:border-2 hover:border-2 border-primary-main focus:border-primary-main hover:border-primary-main bg-white focus:bg-white hover:bg-white"
                  variant="outlined"
                  onClick={() => setShareMode(!shareMode)}
                >
                  {t("cancel")}
                </StyledButton>
                <PDFDownloadLink
                  className={`w-[156px] text-white bg-primary-dark mt-[10px] p-[10px] h-[48px] rounded-full text-center ${
                    selectedInvoices.length === 0 ? "bg-secondary-main" : ""
                  }`}
                  document={<FinancePdf invoices={selectedInvoices} />}
                  fileName="username.pdf"
                >
                  {({ loading }) =>
                    loading ? `${t("loadingPdf")}` : `${t("printPdf")}`
                  }
                </PDFDownloadLink>
              </Box>
            )}
          </>
        </Box>
      ) : (
        <Box className="flex flex-col items-center">
          <EmptyElement
            iconLocation="/assets/images/client-empty-wallet.svg"
            textDescription={t("emptyRange")}
          />
        </Box>
      )}
    </Container>
  );
};

export default FinanceProvider;
