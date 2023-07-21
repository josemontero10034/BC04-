import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { EmptyElement } from "../shared/empty-element";
import { StyledButton } from "../shared/styled-components";
import { AddCardForm } from "./add-card-form";
import DetailsCardList from "./card-details";
import { PaymentMethodList } from "./payment-methods";
import TopBar from "./top-bar";
import { CardObject, SetFlow } from "./types";

const cardList: Array<CardObject> = [];

const Cards = () => {
  const t = useTranslations("cards");
  const [currentTitle, setCurrentTitle] = useState<string>(t("title"));
  const [stage, setStage] = useState<SetFlow>("closed");
  const emptyValueCard = {
    cardId: "",
    svgLocation: "/assets/icons/visa.svg",
    expiredDate: "",
    cvv: "",
    country: "",
    owner: "",
  };
  const [cardInfo, setCardInfo] = useState<CardObject>(emptyValueCard);

  const handleAddCard = (values: CardObject) => {
    cardList.push(values);
    setCardInfo(emptyValueCard);
  };

  const handleDeleteCard = (values: CardObject) => {
    const index = cardList.indexOf(values);
    cardList.splice(index, 1);
    setStage("closed");
  };

  const handleUpdateCard = (value: CardObject, oldValue: CardObject) => {
    const index = cardList.indexOf(oldValue);
    cardList[index] = value;
  };

  const cardType = (value: string) => {
    const lastDigits = Number(value.slice(-1));

    if (lastDigits <= 5) {
      return "/visa.svg";
    }
    return "/master-card.svg";
  };

  return (
    <div className="w-screen">
      {stage === "openDetails" ? (
        <DetailsCardList
          setCardInfo={setCardInfo}
          setCurrentTitle={setCurrentTitle}
          setOpenDetailsCard={setStage}
          cardInfo={cardInfo}
          cardType={cardType}
          deleteCard={handleDeleteCard}
        />
      ) : (
        <>
          <TopBar title={currentTitle} />
          <Container
            disableGutters
            maxWidth={false}
            className="bg-[#FDFEFF] relative flex flex-col items-center h-[800px] max-w-[360px] "
          >
            {stage === "addCard" || stage === "editForm" ? (
              <AddCardForm
                stage={stage}
                setStage={setStage}
                addingNewCard={handleAddCard}
                updateCard={handleUpdateCard}
                currentValue={cardInfo}
                setCurrentTitle={setCurrentTitle}
              />
            ) : (
              <>
                {cardList.length === 0 ? (
                  <EmptyElement
                    iconLocation="/assets/images/client-empty-wallet.svg"
                    textDescription={t("emptyWalletMessage")}
                  />
                ) : (
                  <>
                    <Typography
                      paddingTop={"42px"}
                      width={"100%"}
                      paddingLeft="20px"
                      textAlign="left"
                      fontWeight={500}
                      marginBottom="10px"
                      fontSize="15px"
                      lineHeight="22.5px"
                    >
                      {t("paymentMethods")}
                    </Typography>
                    {cardList.map((card) => (
                      <PaymentMethodList
                        cardType={cardType}
                        setCardInfo={setCardInfo}
                        setOpenDetailsCard={setStage}
                        cardDetail={card}
                        key={card.cardId}
                      />
                    ))}
                  </>
                )}

                <Box position="absolute" top="686px" className="min-w-[322px]">
                  <StyledButton
                    className="bg-primary-dark focus:bg-primary-dark w-[100%] h-12"
                    variant="contained"
                    id="continueBtn"
                    onClick={(): void => {
                      setCurrentTitle(t("addNewCardForm.title"));
                      setCardInfo(emptyValueCard);
                      setStage("addCard");
                    }}
                  >
                    {t("addNewCardForm.title")}
                  </StyledButton>
                </Box>
              </>
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default Cards;
