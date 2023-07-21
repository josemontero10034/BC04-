import {
  Box,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { number, object, string } from "yup";

import { currencyFormat } from "@/utils/formats.utils";
import { getPrimaryDark } from "@/utils/theme";
import { trpc } from "@/utils/trpc";

import { getBudgetTotal } from "./order-detail/order-utils";
import { BudgetUpdateProps } from "./order-detail/type";
import { DetailedText } from "./shared/custom-fields";
import { MoneyMask } from "./shared/input-masks";
import {
  StyledButton,
  StyledInputLabel,
  StyledOutlinedInput,
} from "./shared/styled-components";
import TopBar from "./top-bar";

interface OrderBudgetFormProps {
  toggleOpenBudgetForm: () => void;
  onSubmit: (props: BudgetUpdateProps) => void;
  orderId: bigint;
}

const OrderBudgetForm = ({
  toggleOpenBudgetForm,
  onSubmit: handleBudgetUpdate,
  orderId,
}: OrderBudgetFormProps) => {
  const t = useTranslations("createOrderBudget");
  const { data: budget } = trpc.orderBudget.read.useQuery({
    orderId: String(orderId),
  });

  const initialValues: BudgetUpdateProps = {
    orderId: String(orderId),
    amount: Number(budget?.amount ?? 0),
    description: budget?.description ?? "",
  };

  const validationSchema = object().shape({
    amount: number().required(t("errors.serviceCost.required")),
    description: string(),
  });

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        pageTitle={t("title")}
        onLeftIconClick={toggleOpenBudgetForm}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleBudgetUpdate}
      >
        {({ handleChange, values, touched, errors, setFieldValue }) => (
          <Form>
            <Box className="flex flex-col items-center p-5">
              <Box className="flex flex-col space-y-4">
                <FormControl
                  variant="outlined"
                  error={touched.amount && Boolean(errors.amount)}
                >
                  <StyledInputLabel htmlFor="amount">
                    {t("fields.serviceCost")}
                  </StyledInputLabel>

                  <StyledOutlinedInput
                    name="amount"
                    placeholder="$0.00"
                    label={t("fields.serviceCost")}
                    value={values.amount.toString()}
                    inputComponent={MoneyMask as any}
                    onChange={(e) => {
                      setFieldValue("amount", Number(e.target.value));
                    }}
                    className="sm:m-w-3/4 h-[45px] w-[320px] rounded-full text-xs"
                  />

                  <ErrorMessage name="serviceCost">
                    {(msg) => <FormHelperText>{msg}</FormHelperText>}
                  </ErrorMessage>
                </FormControl>

                <DetailedText
                  name="description"
                  label={t("fields.details")}
                  value={values.description}
                  maxChar={100}
                  minRows={3}
                  error={errors.description}
                  touched={touched.description}
                  handleChange={handleChange}
                  height="85px"
                  width="320px"
                />
              </Box>

              <BudgetDetails amount={values.amount} />

              <Box className="mt-[258px] flex flex-row space-x-2 p-5">
                <StyledButton
                  className="mt-0 h-10 w-[156px] border-2 border-primary-main bg-white text-xs font-semibold hover:border-2 hover:border-primary-main hover:bg-white focus:border-2 focus:border-primary-main focus:bg-white"
                  variant="outlined"
                  onClick={toggleOpenBudgetForm}
                >
                  {t("buttons.cancel")}
                </StyledButton>

                <StyledButton
                  className="mt-0 h-10 w-[156px] bg-primary-dark text-xs font-semibold hover:bg-primary-dark focus:bg-primary-dark"
                  variant="contained"
                  type="submit"
                >
                  {t("buttons.sendBudget")}
                </StyledButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OrderBudgetForm;

const BudgetDetails = ({ amount }: { amount: number }) => {
  const t = useTranslations("createOrderBudget");
  const detailedBudgetAmount = useMemo(() => {
    return getBudgetTotal(amount);
  }, [amount]);

  return (
    <Container className="items-left flex flex-col space-y-3 px-0 pt-1">
      <Typography className="text-[13px] font-semibold" color={getPrimaryDark}>
        {t("subtitle")}
      </Typography>

      <Box className="flex flex-row justify-between">
        <Typography variant="body2">{t("taxes.netCost")}</Typography>
        <Typography className="text-xs">
          ${currencyFormat(detailedBudgetAmount.amount)}
        </Typography>
      </Box>

      <Box className="flex flex-row justify-between">
        <Typography variant="body2">{t("taxes.diagnosis")}</Typography>
        <Typography className="text-xs">
          ${currencyFormat(detailedBudgetAmount.evaluation)}
        </Typography>
      </Box>

      <Box className="flex flex-row justify-between">
        <Typography variant="body2">{t("taxes.itbis")}</Typography>
        <Typography className="text-xs">
          ${currencyFormat(detailedBudgetAmount.itbis)}
        </Typography>
      </Box>

      <Box className="flex flex-row justify-between">
        <Typography variant="body2">{t("taxes.isr")}</Typography>
        <Typography className="text-xs">
          ${currencyFormat(detailedBudgetAmount.isr)}
        </Typography>
      </Box>

      <Divider variant="middle" className="m-0 w-full border-primary-main" />

      <Box className="flex flex-row justify-between">
        <Typography
          className="text-[15px] font-semibold"
          color={getPrimaryDark}
        >
          {t("taxes.total")}
        </Typography>
        <Typography className="text-[15px]">
          ${currencyFormat(detailedBudgetAmount.total)}
        </Typography>
      </Box>
    </Container>
  );
};
