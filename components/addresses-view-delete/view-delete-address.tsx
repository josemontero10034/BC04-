import { Container } from "@mui/material";
import List from "@mui/material/List";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import ROUTES from "@/utils/routes";
import { trpc } from "@/utils/trpc";

import CancelationModal from "../shared/cancel-confirmation";
import { StyledButton } from "../shared/styled-components";
import TopBar from "../top-bar";
import MainAddress from "./main-address";
import OtherAdresses from "./other-addresses";

export const ViewDeleteAddress = () => {
  const [x, setX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const t = useTranslations("deleteAddress");
  const router = useRouter();

  const addressGetter = trpc.address.getClientAddresses.useQuery();

  const handleSetOpenModal = () => {
    setOpen(!open);
    if (!open) {
      addressGetter.refetch();
    }
  };

  const handleBackwordsArrowClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <TopBar
        leftIcon="backArrow"
        onLeftIconClick={handleBackwordsArrowClick}
        pageTitle={t("addresses")}
      />
      <Container maxWidth={false} disableGutters>
        <List className="bg-common-white flex flex-col">
          <MainAddress
            openedModal={open}
            setOpenModal={handleSetOpenModal}
            x={x}
            setX={setX}
            animating={animating}
            setAnimating={setAnimating}
            currentId={currentId}
            setCurrentId={setCurrentId}
            addresses={addressGetter.data}
          />
          <OtherAdresses
            openedModal={open}
            setOpenModal={handleSetOpenModal}
            x={x}
            setX={setX}
            animating={animating}
            setAnimating={setAnimating}
            currentId={currentId}
            setCurrentId={setCurrentId}
            addresses={addressGetter.data}
          />
        </List>
      </Container>

      <Container
        maxWidth={false}
        disableGutters
        className="fixed bottom-0 flex flex-col justify-center items-center p-4"
      >
        <StyledButton
          className="w-[290px] h-[48px] bg-primary-dark focus:bg-primary-dark hover:bg-primary-dark"
          variant="contained"
          id="continueBtn"
          onClick={() => router.push(ROUTES.addAddress)}
        >
          {t("addAddress")}
        </StyledButton>
      </Container>
      <div className="">
        <CancelationModal
          addressId={currentId}
          openedModal={open}
          setOpenModal={setOpen}
        />
      </div>
    </>
  );
};
