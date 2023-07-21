import { CalendarToday, Error, Person } from "@mui/icons-material";
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

import { dateFormat } from "@/utils/formats.utils";

import { ServiceTypeIcon, orderStatusIcon } from "../orders-icon";
import { OrderCardProps } from "../orders-types";

const ClientOrderCard = ({ order, style }: OrderCardProps) => {
  const router = useRouter();
  const t = useTranslations();

  const { serviceType, provider } = order;

  const handleOrderClick = async () => {
    await router.push(`/order/${order.id}`);
  };

  return (
    <ListItem
      key={order.id.toString()}
      className={`w-80 rounded-[10px] bg-common-white overflow-hidden shadow-md ${
        provider ? "h-[122px]" : "h-24"
      }`}
      onClick={handleOrderClick}
    >
      <ListItemAvatar
        className={`absolute left-2 ${provider ? "top-4" : "top-3"}`}
      >
        <Avatar className="bg-secondary-blue text-primary-blue w-11 h-11">
          {ServiceTypeIcon(Number(serviceType?.id))}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        className={`grow absolute left-[57px] flex flex-col justify-start mt-0 ${
          provider ? "top-4" : "top-2"
        }`}
      >
        {serviceType ? (
          <Typography variant="subtitle1" className="h-[18px] mt-1">
            {t("clientLanding.typeOfService")}
            <span className="text-primary-blue">{serviceType.name}</span>
          </Typography>
        ) : (
          <Typography variant="subtitle1" className="h-[18px] mt-1">
            <span className="text-primary-blue">
              {t("serviceType.noServiceType")}
            </span>
          </Typography>
        )}

        <List className="gap-2 flex flex-col">
          <ListItem className="m-0 p-0 h-4 flex flex-row gap-1">
            <ListItemIcon className="text-primary-blue min-w-0 min-h-0">
              <CalendarToday className="w-[14px] h-[14px]" />
            </ListItemIcon>

            <ListItemText>
              <Typography className="text-xs font-normal">
                {dateFormat(order.createdDate)}
              </Typography>
            </ListItemText>
          </ListItem>
          {provider && (
            <ListItem className="m-0 p-0 h-4 flex flex-row gap-1">
              <ListItemIcon className="text-primary-blue min-w-0 min-h-0">
                <Person className="w-[14px] h-[14px]" />
              </ListItemIcon>
              <ListItemText>
                <Typography className="text-xs font-normal">
                  {provider.user.firstName + " " + provider.user.lastName}
                </Typography>
              </ListItemText>
            </ListItem>
          )}
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
                <Typography className="text-xs font-normal">
                  {style.translation}
                </Typography>
              )}
            </ListItemText>
          </ListItem>
        </List>
      </ListItemText>
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

export default ClientOrderCard;
