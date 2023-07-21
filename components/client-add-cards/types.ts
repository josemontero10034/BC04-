import { SetStateAction } from "react";

export interface CardObject {
  cardId: string;
  svgLocation: string;
  expiredDate: string;
  cvv: string;
  country: string;
  owner: string;
}

export type SetFlow = "addCard" | "openDetails" | "closed" | "editForm";

export interface CardDetailProps {
  setCurrentTitle: (value: SetStateAction<string>) => void;
  setCardInfo: (value: SetStateAction<CardObject>) => void;
  cardInfo: CardObject;
  setOpenDetailsCard: (values: SetStateAction<SetFlow>) => void;
  deleteCard: (values: CardObject) => void;
  cardType: (value: string) => void;
}

export interface SetCurrentProps {
  stage: string;
  setStage: (value: SetStateAction<SetFlow>) => void;
  addingNewCard: (values: CardObject) => void;
  updateCard: (values: CardObject, oldValue: CardObject) => void;
  currentValue: CardObject;
  setCurrentTitle: (value: SetStateAction<string>) => void;
}

export interface PaymentDetails {
  setOpenDetailsCard: (values: SetStateAction<SetFlow>) => void;
  cardType: (value: string) => void;
  setCardInfo: (values: SetStateAction<CardObject>) => void;
  cardDetail: CardObject;
}

export interface DeleteCardProps {
  openedModal: boolean;
  setOpenModal: (value: SetStateAction<boolean>) => void;
  onClick: (value: any) => void;
  value: any;
}
