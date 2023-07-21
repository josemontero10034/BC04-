import { Close, KeyboardBackspace } from "@mui/icons-material";
import { Box, Dialog, Typography } from "@mui/material";
import { OrderStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SetStateAction, useState } from "react";

import { StyledButton } from "@/components/shared/styled-components";
import { SlideUp } from "@/components/shared/transitions";

import { trpc } from "@/utils/trpc";

import { client } from "../../client";

export const IdentityVerified = () => {
  const t = useTranslations("identityVerified");

  return (
    <Box className="flex grow flex-col justify-center space-y-10 bg-success-darker px-5">
      <Image
        src="/assets/icons/identity-verified.svg"
        alt=""
        width={140}
        height={106}
      />

      <Typography className="text-center text-[28px] font-semibold text-white">
        {t("message")}
      </Typography>
    </Box>
  );
};

interface ClientIdentityVerificationProps {
  isOpen: boolean;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  code: string;
  orderStatus: OrderStatus;
}

interface ProviderIdentityVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const ClientIdentityVerification = (
  props: ClientIdentityVerificationProps
) => {
  const t = useTranslations();

  const handleClose = () => {
    props.setIsOpen(false);
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        classes={{ paper: "h-[392px] mx-[14px] rounded-2xl" }}
      >
        <Close
          onClick={handleClose}
          className="mt-5 mr-5 place-self-end fill-primary-dark"
        />

        <Box className="mt-3 flex flex-col items-center space-y-6">
          <Typography variant="h2">
            {t("verifyIdentityClient.title")}
          </Typography>

          <Typography variant="h6" className="px-6 text-center">
            {t.rich("verifyIdentityClient.information")}
          </Typography>

          <Box className="flex flex-row items-center gap-x-3">
            {[0, 1, 2, 3].map((character) => (
              <div key={character}>
                <Box className="flex h-[54px] w-10 items-center justify-center">
                  <Box className="flex w-6 justify-center border-b-2 border-primary-main">
                    <Typography className="text-4xl text-primary-main">
                      {props.code[character]}
                    </Typography>
                  </Box>
                </Box>
              </div>
            ))}
          </Box>

          <Typography variant="h6" className="px-6 text-center">
            {t("verifyIdentityClient.instructions")}
          </Typography>
        </Box>

        <Typography
          className="mt-8 place-self-end pr-11 text-[15px] font-semibold text-primary-dark underline"
          onClick={handleClose}
        >
          {t("common.continue")}
        </Typography>
      </Dialog>
    </>
  );
};

const DigitBoxes = (props: { error: string; code: string }) => {
  return (
    <Box className="flex flex-row space-x-5">
      {[0, 1, 2, 3].map((digit) => (
        <div key={digit}>
          <Box
            className={`flex w-[54px] h-16 justify-center items-center rounded-[5px] ${
              props.error ? "bg-light-red" : "bg-secondary-blue"
            }`}
          >
            <Typography
              className={`text-2xl ${
                props.error ? "text-[#B10401]" : "text-primary-dark"
              }`}
            >
              {props.code[digit]}
            </Typography>
          </Box>
        </div>
      ))}
    </Box>
  );
};

export const ProviderIdentityVerification = (
  props: ProviderIdentityVerificationProps
) => {
  const t = useTranslations("verifyIdentityProvider");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { mutate: makeAttemps } = trpc.pin.updateVerification.useMutation();
  const { data: verification } = trpc.pin.getVerificationCode.useQuery({
    orderId: props.orderId,
  });

  const numberRegex = /^\d{0,4}$/;

  const handleSubmit = () => {
    if (code !== verification?.pin) {
      setError(t("errors.emptyCode"));
      makeAttemps({
        orderId: verification?.orderId ?? BigInt(0),
        code: code,
      });
    }

    if (code === verification?.pin) {
      makeAttemps({
        orderId: verification?.orderId ?? BigInt(0),
        code: code,
      });
    } else {
      setError(t("errors.incorrectCode"));
      setCode("");
    }
  };

  return (
    <Dialog fullScreen open={props.isOpen} TransitionComponent={SlideUp}>
      <Box className="flex flex-col px-5 mt-[42px]">
        <KeyboardBackspace
          sx={{ fontSize: "24px" }}
          className="fill-primary-dark"
          onClick={props.onClose}
        />

        <Box className="flex flex-col items-center mt-2 space-y-4">
          <Image
            src="/assets/images/verify-identity-provider.svg"
            alt=""
            width={243}
            height={243}
          />

          <Typography variant="h1" className="text-primary-dark">
            {t("title")}
          </Typography>

          <Typography className="text-[15px] font-normal text-center">
            {t.rich("subtitle")}
          </Typography>

          <Box className="flex flex-row w-[276px] h-16">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={code}
              onClick={() => setError("")}
              onChange={(e) => {
                if (numberRegex.test(e.target.value)) {
                  setCode(e.target.value);
                }
              }}
              className="absolute w-[276px] h-16 opacity-0"
            />

            <DigitBoxes code={code} error={error} />
          </Box>
        </Box>

        <Box className="h-[18px] mt-2 place-self-center">
          {error && (
            <Typography className="text-xs text-[#991027] underline leading-[18px]">
              {error}
            </Typography>
          )}
        </Box>

        <StyledButton
          className="w-[290px] sm:w-full place-self-center mt-3 bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          {t("buttons.submit")}
        </StyledButton>
      </Box>
    </Dialog>
  );
};
