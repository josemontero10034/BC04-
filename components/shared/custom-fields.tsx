import { Visibility, VisibilityOff } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import {
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  TextFieldProps,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { ErrorMessage, useField } from "formik";
import {
  ChangeEvent,
  FocusEventHandler,
  JSXElementConstructor,
  ReactElement,
  useState,
} from "react";

import {
  CustomCheckboxProps,
  CustomDatePickerProps,
  CustomFormControlProps,
  CustomMenuItemProps,
  CustomPhoneInputProps,
  CustomSelectProps,
  CustomTextInputProps,
  DetailedTextProps,
  FilterChipProps,
} from "../shared/types";
import { PhoneNumberMask } from "./input-masks";
import {
  StyledFormControl,
  StyledFormControlLabel,
  StyledInputLabel,
  StyledMenuItem,
  StyledOutlinedInput,
  StyledSelect,
  StyledTextField,
  filterChipSxProps,
} from "./styled-components";

export const CustomTextInput = (props: CustomTextInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <FormControl
      variant="outlined"
      required={props.required}
      error={meta.touched && Boolean(meta.error)}
    >
      <StyledInputLabel htmlFor={props.name}>{props.label}</StyledInputLabel>

      <StyledOutlinedInput
        name={props.name}
        label={props.label}
        type={props.type}
        value={field.value}
        onChange={props.onChange}
        className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs"
        endAdornment={props.endAdornment}
      />

      <ErrorMessage name={props.name}>
        {(msg) => <FormHelperText>{msg}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  );
};

export const PasswordField = (props: {
  name: string;
  label: string;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  [x: string]: unknown;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShow = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <StyledFormControl
      variant="outlined"
      error={props.touched && Boolean(props.error)}
      required
    >
      <StyledInputLabel htmlFor={props.name}>{props.label}</StyledInputLabel>
      <StyledOutlinedInput
        type={showPassword ? "text" : "password"}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        name={props.name}
        label={props.label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShow}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <ErrorMessage name={props.name} className={"text-error-dark"}>
        {(msg) => <FormHelperText className="w-[290px]">{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledFormControl>
  );
};

export const CustomDatePicker = ({ name, label }: CustomDatePickerProps) => {
  const [field, , helpers] = useField(name);
  const handleChange = (e: unknown) => {
    helpers.setValue(e);
  };

  return (
    <MobileDatePicker
      label={label}
      inputFormat="dd/MM/yyyy"
      value={field.value}
      onChange={handleChange}
      renderInput={(params: TextFieldProps) => <StyledTextField {...params} />}
    />
  );
};

export const CustomFormControl = (props: CustomFormControlProps) => {
  const [field, meta] = useField(props.name);

  return (
    <StyledFormControl
      required={props.required}
      error={meta.touched && Boolean(meta.error)}
    >
      <StyledInputLabel htmlFor={props.name}>{props.label}</StyledInputLabel>
      <StyledOutlinedInput {...props} value={field.value} />
      <ErrorMessage name={props.name}>
        {(msg) => <FormHelperText>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledFormControl>
  );
};

export const CustomSelect = (props: CustomSelectProps) => {
  const [field, meta] = useField(props.name);

  return (
    <StyledFormControl error={meta.touched && Boolean(meta.error)}>
      <StyledInputLabel htmlFor={props.name}>{props.label}</StyledInputLabel>

      <StyledSelect
        {...props}
        value={field.value}
        className="h-11 w-80 sm:m-w-3/4 rounded-full text-xs"
      >
        {props.children}
      </StyledSelect>

      <ErrorMessage name={props.name}>
        {(msg) => <FormHelperText>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledFormControl>
  );
};

export const CustomChip = (props: {
  label: string;
  value: string;
  className?: string;
  endAdornment?: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  onClick?: () => void;
}) => {
  return (
    <Chip
      label={props.label}
      size="small"
      className={`text-secondary-clear text-sm h-8 bg-secondary-blue hover:bg-secondary-blue ${props.className}`}
      sx={
        props.value === props.label ? { border: 2, fontWeight: 600 } : undefined
      }
      onClick={props.onClick}
      onDelete={props.endAdornment !== undefined ? props.onClick : undefined}
      deleteIcon={props.endAdornment}
    />
  );
};

export const DetailedText = ({
  maxChar,
  label,
  name,
  value,
  error,
  touched,
  minRows,
  height,
  width,
  handleChange,
}: DetailedTextProps) => {
  return (
    <FormControl
      sx={{
        "& .MuiOutlinedInput-root": { borderRadius: "20px" },
        ".MuiFormHelperText-root.Mui-error": {
          "&.text-right": {
            width: "36px",
            position: "absolute",
            right: "0px",
            bottom: "0px",
          },
        },
      }}
      variant="outlined"
      error={touched && Boolean(error)}
    >
      <StyledInputLabel htmlFor={label}>{label}</StyledInputLabel>

      <StyledOutlinedInput
        name={name}
        label={label}
        value={value}
        minRows={minRows}
        multiline
        onChange={handleChange}
        className="sm:m-w-3/4 text-xs"
        sx={{ height: height, width: width }}
        inputProps={{ maxLength: maxChar }}
      />
      {touched && (
        <ErrorMessage name={name}>
          {(msg) => <FormHelperText>{msg}</FormHelperText>}
        </ErrorMessage>
      )}
      <FormHelperText className="text-right">{`${value.length}/${maxChar}`}</FormHelperText>
    </FormControl>
  );
};

export const FilterChip = ({
  label,
  isSmall,
  value,
  filters,
  onClick,
}: FilterChipProps) => {
  const handleClick = () => {
    for (const filter in filters) {
      if (filter !== value && filters[filter]) {
        onClick(value);
        break;
      }
    }
  };

  return (
    <Chip
      label={
        <Typography
          className={`text-xs ${
            filters[value] ? "font-semibold text-[#0D3A93]" : "text-[#1C1B1F]"
          }`}
        >
          {label}
        </Typography>
      }
      onClick={handleClick}
      {...(filters[value] && {
        icon: <DoneIcon className="fill-[#0D3A93]" />,
        ...(isSmall && { size: "small" }),
      })}
      className="h-8 bg-secondary-blue hover:bg-secondary-blue"
      sx={{ ...filterChipSxProps(filters[value]) }}
    />
  );
};

export const CustomMenuItem = (props: CustomMenuItemProps) => {
  return <StyledMenuItem {...props} />;
};

export const CustomPhoneInput = (props: CustomPhoneInputProps) => {
  const [field, meta] = useField(props.name);

  return (
    <StyledFormControl error={meta.touched && Boolean(meta.error)}>
      <StyledInputLabel htmlFor={props.name} required={props.required ?? false}>
        {props.label}
      </StyledInputLabel>

      <StyledOutlinedInput
        name={props.name}
        label={props.label}
        value={field.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder="(829) 000-0000"
        className="h-[45px] w-[320px] sm:m-w-3/4 rounded-full text-xs"
        inputComponent={PhoneNumberMask as any}
      />
      <ErrorMessage name={props.name}>
        {(msg) => <FormHelperText>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledFormControl>
  );
};

export const CustomCheckbox = (props: CustomCheckboxProps) => {
  const [field, meta] = useField(props.name);

  return (
    <StyledFormControl error={meta.touched && Boolean(meta.error)}>
      <StyledFormControlLabel
        control={
          <Checkbox
            onBlur={field.onBlur}
            name={field.name}
            checked={props.checked}
            onClick={props.onClick}
            size={props.size ?? "small"}
            className="text-primary-dark"
          />
        }
        label={props.label}
        className="underline"
      />

      <ErrorMessage name={props.name}>
        {(msg) => <FormHelperText>{msg}</FormHelperText>}
      </ErrorMessage>
    </StyledFormControl>
  );
};
