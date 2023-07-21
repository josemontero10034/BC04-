import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { StyledButton } from "../shared/styled-components";
import DeleteConfirmation from "./delete-confirmation";
import TopBar from "./top-bar";
import { CardDetailProps } from "./types";

const DetailsCardList = ({
  cardInfo,
  setOpenDetailsCard,
  setCurrentTitle,
  setCardInfo,
  deleteCard,
  cardType,
}: CardDetailProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TopBar title={t("cards.addNewCardForm.details")} />

      <Container className="flex flex-col items-center justify-center mt-[35px]">
        <section className="justify-center flex flex-col">
          <div>
            <div className="relative">
              <Image
                src={`${cardType(cardInfo.cardId)}`}
                alt="mnn"
                width="320px"
                height="187px"
              />

              <div className="absolute top-[65px] ml-[63%]">
                <Typography className=" w-[55px] h-[33px] text-common-white text-[22px] font-semibold">
                  {cardInfo.cardId.slice(-4)}
                </Typography>
              </div>
              <div className="flex ml-[8%] mt-[20%] [w-61px]">
                <div className="absolute top-[122px]">
                  <Typography
                    className=" w-[50px] text-common-white"
                    variant="body2"
                  >
                    {t("cards.addNewCardForm.owner")}
                  </Typography>
                </div>
                <div className="absolute top-[142px]">
                  <Typography
                    className="w-[98px] text-common-white"
                    variant="body1"
                  >
                    {cardInfo.owner}
                  </Typography>
                </div>
              </div>

              <div className="flex ml-[73%] mt-[20%] w-[61px]">
                <div className="absolute top-[122px]">
                  <Typography
                    className="w-[63px] text-common-white"
                    variant="body2"
                  >
                    {t("cards.addNewCardForm.expDate")}
                  </Typography>
                </div>
                <div className="absolute top-[142px]">
                  <Typography
                    className="w-[98px] text-common-white"
                    variant="body1"
                  >
                    {cardInfo.expiredDate}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Container
        disableGutters
        className="flex flex-row space-x-2 absolute inset-x-0 bottom-5 justify-center"
      >
        <StyledButton
          className="w-[156px] h-[40px] border-2 focus:border-2 hover:border-2 border-primary-main focus:border-primary-main hover:border-primary-main bg-white focus:bg-white hover:bg-white"
          variant="outlined"
          onClick={() => {
            setCurrentTitle(t("cards.addNewCardForm.edit"));
            setOpenDetailsCard("editForm");
            setCardInfo(cardInfo);
          }}
        >
          {t.rich("cards.addNewCardForm.edit")}
        </StyledButton>

        <StyledButton
          className="w-[156px] h-[40px] bg-error-dark focus:bg-error-dark hover:bg-error-dark"
          variant="contained"
          type="submit"
          onClick={() => setOpen(true)}
        >
          {t.rich("cards.addNewCardForm.remove")}
        </StyledButton>
        <DeleteConfirmation
          onClick={deleteCard}
          value={cardInfo}
          openedModal={open}
          setOpenModal={setOpen}
        />
      </Container>
    </>
  );
};

export default DetailsCardList;
