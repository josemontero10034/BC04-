import { Address } from "@prisma/client";
import { SetStateAction } from "react";

export interface SwipeableItemProps {
  id?: string;
  x: number;
  setX: (value: SetStateAction<number>) => void;
  currentId?: string;
  animating: boolean;
  setAnimating: (value: SetStateAction<boolean>) => void;
  setCurrentId: (value: SetStateAction<string | undefined>) => void;
  alias?: string;
  address?: string;
  setOpenModal: (value: SetStateAction<boolean>) => void;
}

export interface AddressProps {
  setAnimating: (value: SetStateAction<boolean>) => void;
  setCurrentId: (value: SetStateAction<string | undefined>) => void;
  currentId?: string;
  animating: boolean;
  x: number;
  setX: (value: SetStateAction<number>) => void;
  openedModal: boolean;
  setOpenModal: (value: SetStateAction<boolean>) => void;
  addresses?: Address[];
}

export interface DeleteAdressProps {
  addressId?: string;
  openedModal: boolean;
  setOpenModal: (value: SetStateAction<boolean>) => void;
}
