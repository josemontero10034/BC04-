import { Address, Order, Provider, ServiceType, User } from "@prisma/client";

export interface OrderStyleProps {
  color: string;
  progress: number;
  rotate: string;
  translation: string;
}

export interface OrderCardProps {
  order: Order & {
    serviceType?: ServiceType | null;
    provider?:
      | (Provider & {
          user: User;
        })
      | null;
    address?: Address;
  };
  style: OrderStyleProps;
}
