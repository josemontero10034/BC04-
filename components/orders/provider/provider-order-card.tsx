import { CalendarToday, Error, LocationOn } from "@mui/icons-material";
import {
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { currencyFormat, dateFormat } from "@/utils/formats.utils";

import { getBudgetTotal } from "../../order-detail/order-utils";
import { ServiceTypeIcon, orderStatusIcon } from "../orders-icon";
import { OrderCardProps } from "../orders-types";

const ProviderOrderCard = ({ order, style }: OrderCardProps) => {
  const t = useTranslations();
  const { serviceType, address } = order;
  const totalAmount = getBudgetTotal(Number(order.price));
  const router = useRouter();

  const handleOrderClick = async () => {
    await router.push(`/order/${order.id}`);
  };

  return (
    <ListItem
      key={order.id.toString()}
      className="h-[122px] w-80 rounded-[10px] bg-common-white overflow-hidden shadow-md"
      onClick={handleOrderClick}
    >
      <ListItemAvatar className="absolute top-4 left-2">
        <Avatar className="bg-secondary-blue text-primary-blue w-[45px] h-[45px]">
          {ServiceTypeIcon(Number(serviceType?.id))}
        </Avatar>
      </ListItemAvatar>

      <ListItemText className="grow absolute top-4 left-[57px] flex flex-col justify-start mt-0">
        <Typography
          fontSize={"13px"}
          fontWeight={"body1.fontWeight"}
          lineHeight={"18px"}
          color={"common.black"}
          className="h-[18px]"
        >
          {serviceType ? (
            <span>
              {t("providerLanding.serviceOf")}
              <span className="text-primary-blue font-semibold">
                {serviceType.name}
              </span>
            </span>
          ) : (
            <span className="text-error-dark font-semibold">
              {t("serviceType.noServiceType")}
            </span>
          )}
        </Typography>

        <List className="gap-2 flex flex-col">
          <ListItem className="m-0 p-0 h-4 flex flex-row gap-1">
            <ListItemIcon className="text-primary-blue min-w-0 min-h-0">
              <CalendarToday className="w-[14px] h-[14px]" />
            </ListItemIcon>

            <ListItemText>
              <Typography
                fontSize={"11px"}
                fontWeight={"h6.fontWeight"}
                lineHeight={"142%"}
                color={"common.black"}
              >
                {dateFormat(order.createdDate)}
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem className="m-0 p-0 h-4 flex flex-row gap-1">
            <ListItemIcon className="text-primary-blue min-w-0 min-h-0">
              <LocationOn className="w-[14px] h-[14px]" />
            </ListItemIcon>

            <ListItemText>
              <Typography
                fontSize={"11px"}
                fontWeight={"h6.fontWeight"}
                lineHeight={"142%"}
                color={"common.black"}
              >
                {address?.street}
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem className="m-0 p-0 h-4 flex flex-row gap-1">
            <ListItemIcon
              className="min-w-0 min-h-0"
              sx={
                !order.status
                  ? {
                      color: "#D65745",
                    }
                  : {
                      color: style?.color,
                      transform: style?.rotate,
                    }
              }
            >
              {!order.status ? (
                <Error className="w-4" />
              ) : (
                orderStatusIcon[order.status]
              )}
            </ListItemIcon>

            <ListItemText>
              {!order.status ? (
                <Typography className="text-xs font-semibold">
                  <span className="text-[#D53A3A]">{t("orders.status.0")}</span>
                  {t("orders.errorInformation")}
                </Typography>
              ) : (
                <Typography className="text-[11px] font-normal">
                  {style.translation}
                </Typography>
              )}
            </ListItemText>
          </ListItem>
        </List>
      </ListItemText>

      {order.price && (
        <ListItemText className="m-0 p-0 bg-secondary-blue text-primary-blue absolute top-3 right-1 rounded-xl h-[25px] px-2 py-1">
          <Typography
            fontSize={"h5.fontSize"}
            fontWeight={"body1.fontWeight"}
            lineHeight={"142%"}
          >
            RD$ {currencyFormat(totalAmount.total)}
          </Typography>
        </ListItemText>
      )}

      <LinearProgress
        className="absolute bottom-0 left-0 w-full h-1 rounded-[10px] m-0 p-0"
        variant="determinate"
        sx={{
          backgroundColor: (order.status ? style?.color : "#D65745") + "66",
          "& .MuiLinearProgress-bar": {
            backgroundColor: order.status ? style?.color : "#D65745",
            borderRadius: 3,
          },
        }}
        value={style?.progress}
      />
    </ListItem>
  );
};

export default ProviderOrderCard;
