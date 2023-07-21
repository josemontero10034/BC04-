import { OrderStatus } from "@prisma/client";
import { createTranslator } from "next-intl";

import * as messages from "../../../messages/en.json";

const OrderStatusStyles = (status: OrderStatus | undefined) => {
  const { CREATED, ASSIGNED, EVALUATING, IN_PROGRESS, COMPLETED, CANCELED } =
    OrderStatus;
  const t = createTranslator({ locale: "en", messages });

  switch (status) {
    case CREATED:
      return {
        color: "#FFA726",
        progress: 20,
        rotate: "rotate(0deg)",
        translation: t("orders.status.1"),
      };
    case ASSIGNED:
      return {
        color: "#8257DD",
        progress: 40,
        rotate: "rotate(90deg)",
        translation: t("orders.status.2"),
      };
    case EVALUATING:
      return {
        color: "#E36584",
        progress: 60,
        rotate: "rotate(-180deg)",
        translation: t("orders.status.3"),
      };
    case IN_PROGRESS:
      return {
        color: "#588157",
        progress: 80,
        rotate: "rotate(-180deg)",
        translation: t("orders.status.4"),
      };
    case COMPLETED:
      return {
        color: "#366BD4",
        progress: 100,
        rotate: "rotate(-90deg)",
        translation: t("orders.status.5"),
      };
    case CANCELED:
      return {
        color: "#B10401",
        progress: 100,
        rotate: "rotate(-90deg)",
        translation: t("orders.status.6"),
      };
    default:
      return {
        color: "#D65745",
        progress: 25,
        rotate: "rotate(360deg)",
        translation: t("orders.status.0"),
      };
  }
};

export default OrderStatusStyles;
