import {
  Address,
  BudgetStatus,
  Client,
  OfferStatus,
  Order,
  OrderBudget,
  OrderStatus,
  Provider,
  ServiceType,
  SubServiceType,
  User,
  UserRole,
} from "@prisma/client";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { ImageInfo } from "../shared/types";

export interface OrderDetail {
  clientId: string;
  isActive: boolean;
  serviceCategory: string;
  subServiceCategory: string;
  budget: string;
  providerName: string;
  providerPic: string;
  orderDescription: string;
  svg: string;
  backGround: string;
  address: string;
  city: string;
  imagesAttached: Array<ImageInfo>;
}

export interface OrderDetailInfo {
  order: OrderDetail;
}

export interface FindProviderProps {
  providerName: string;
  providerPic: string;
  orderStatus: OrderStatus;
}

export interface ServiceDescriptionProps {
  serviceCategory: string;
  subServiceCategory: string;
  budget: string;
  orderDescription: string;
}

export interface FindClientProps {
  providerName: string;
  providerPic: string;
  address: string;
  city: string;
  orderStatus: OrderStatus;
}

export interface OrderTitleProps {
  serviceTypeName: string;
  subServiceTypeName: string;
}

export interface OrderDescriptionProps {
  description: string;
}

export interface OrderUserInfoProps {
  user?: User;
  role: UserRole | undefined;
  client?: User;
  provider?: User;
  orderAddress: Address;
  orderId: string;
  orderStatus: OrderStatus | null;
  isVerified: boolean;
}

export interface ProviderDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>;
}

export interface ClientBudgetDialogProps {
  amount: number;
  description: string;
  open: boolean;
  onClose: () => void;
  onBudgetDecision: (decision: BudgetStatus) => Promise<void>;
}

export interface BudgetUpdateProps {
  orderId: string;
  amount: number;
  description: string;
}

export interface OrderBudgetProviderProps {
  role?: UserRole;
  orderId: bigint;
  onToggleOpenForm: () => void;
}

export interface OrderBudgetClientProps {
  role: UserRole | undefined;
  orderId: bigint;
}

export type OrderCancellationStatus =
  | OfferStatus
  | OrderStatus
  | null
  | undefined;

export interface OrderCancellationProps {
  order: Order & {
    provider:
      | (Provider & {
          user: User;
        })
      | null;
    client: Client & {
      user: User;
    };
    budget: OrderBudget | null;
    address: Address;
    serviceType: ServiceType | null;
    subServiceType: SubServiceType | null;
  };
  isOpen?: boolean;
  onClose: () => void;
  onOpen: () => void;
  userRole?: UserRole;
}

export interface CancellationConfirmationProps extends OrderCancellationProps {
  selectedReason?: string;
  cancellationStatus: OrderCancellationStatus;
}
