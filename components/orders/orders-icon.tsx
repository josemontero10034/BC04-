import {
  Cancel,
  CarRepair,
  Carpenter,
  Chair,
  DataUsage,
  FormatPaint,
  Plumbing,
  QuestionMark,
} from "@mui/icons-material";
import { OrderStatus } from "@prisma/client";

export const ServiceTypeIcon = (type: number) => {
  switch (type) {
    case 1:
      return <Chair />;
    case 2:
      return <CarRepair />;
    case 3:
      return <Plumbing />;
    case 4:
      return <Carpenter />;
    case 5:
      return <FormatPaint />;
    default:
      return <QuestionMark />;
  }
};

export const orderStatusIcon: Record<OrderStatus, JSX.Element> = {
  ASSIGNED: <DataUsage className="w-4" />,
  CANCELED: <Cancel className="w-4" />,
  IN_PROGRESS: <DataUsage className="w-4" />,
  COMPLETED: <DataUsage className="w-4" />,
  CREATED: <DataUsage className="w-4" />,
  EVALUATING: <DataUsage className="w-4" />,
};
