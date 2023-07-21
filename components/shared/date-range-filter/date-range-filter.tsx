import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Container,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { es } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { SetStateAction } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { StyledButton } from "../styled-components";
import { datePickerStyle } from "./date-picker-style";

interface DateRangeFilterProps {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  setSelectionRange: (value: SetStateAction<Range>) => void;
  selectionRange: Range;
  handleApplyFilter: () => void;
  handleClearFilter: () => void;
}

const DateRangeFilter = ({
  isOpen,
  setIsOpen,
  setSelectionRange,
  selectionRange,
  handleApplyFilter,
  handleClearFilter,
}: DateRangeFilterProps) => {
  const t = useTranslations("dateRangeFilter");

  const handleSelect = (date: RangeKeyDict) => {
    const newSelectionRange = {
      startDate: date.selection?.startDate ?? new Date(),
      endDate: date.selection?.endDate ?? new Date(),
      key: "selection",
    };

    setSelectionRange({
      ...selectionRange,
      startDate: newSelectionRange.startDate,
      endDate: newSelectionRange.endDate,
    });
  };

  return (
    <div>
      <IconButton
        onClick={() => setIsOpen(true)}
        className="w-[24px] h-[24px] text-primary-dark"
      >
        <FilterAltIcon />
      </IconButton>
      <SwipeableDrawer
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        anchor="bottom"
        sx={{
          "& .MuiPaper-root": {
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
            width: "100%",
            height: "487px",
          },
        }}
      >
        <Box sx={datePickerStyle}>
          <Box
            sx={{
              width: "100%",
              height: "26px",
              position: "absolute",
              left: "0px",
              right: "0px",
              top: "16px",
              margin: "auto",
            }}
            className="flex flex-row items-center justify-center"
          >
            <IconButton
              onClick={() => setIsOpen(false)}
              className="w-[22px] h-[22px] text-primary-dark absolute left-5"
            >
              <CloseIcon />
            </IconButton>
            <Typography className="text-primary-dark font-semibold text-base">
              {t("pickDate")}
            </Typography>
          </Box>

          <div>
            <DateRange
              onChange={handleSelect}
              editableDateInputs
              moveRangeOnFirstSelection={false}
              ranges={[selectionRange]}
              locale={es}
              months={1}
              direction="horizontal"
              className="absolute top-[62px] left-0 right-0 m-auto w-[320px]"
              weekdayDisplayFormat="EEEEE"
            />
          </div>
          <Container
            disableGutters
            maxWidth={false}
            className="bg-white z-[3] fixed h-[80px] w-full bottom-[0%] pt-[18.5px] border-solid border-t-[1px] border-lapis-lazuli px-[20px] py-[20px] gap-2 flex flex-row justify-center items-center"
          >
            <StyledButton
              onClick={handleClearFilter}
              sx={{ fontSize: "13.5px", fontWeight: "600" }}
              variant="contained"
              className="bg-inherit hover:bg-inherit focus:bg-inherit capitalize text-primary-main border-primary-main border-[2px] border-solid h-[40px] w-[156px]"
            >
              {t("cleanFilter")}
            </StyledButton>
            <StyledButton
              onClick={handleApplyFilter}
              sx={{ fontSize: "13.5px", fontWeight: "600" }}
              variant="contained"
              className="bg-primary-dark hover:bg-primary-dark focus:bg-primary-dark capitalize h-[40px] w-[156px]"
            >
              {t("applyDates")}
            </StyledButton>
          </Container>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default DateRangeFilter;
