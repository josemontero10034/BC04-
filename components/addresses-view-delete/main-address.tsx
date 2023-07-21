import {
  Container,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

import SwipeableItem from "./swipeable-item";
import { AddressProps } from "./types";

const MainAddress = ({
  setAnimating,
  currentId,
  setCurrentId,
  setX,
  animating,
  x,
  setOpenModal,
  addresses,
}: AddressProps) => {
  const mainAddresses = addresses?.filter((address) => address.isMainAddress);
  const t = useTranslations("deleteAddress");

  return (
    <>
      {!mainAddresses || mainAddresses.length < 1 ? (
        <></>
      ) : (
        <Container maxWidth={false} disableGutters>
          <ListItemText className="ml-[7.5%] mt-[24px] h-[21px] mb-[12px]">
            <Typography
              component="label"
              color="#000000"
              fontWeight={500}
              fontSize="15px"
            >
              {t.rich("mainAddress")}
            </Typography>
          </ListItemText>
          {mainAddresses.map((items) => {
            return (
              <div key={items.id.toString()}>
                <ListItem
                  className="relative justify-between min-w-[360px]"
                  disablePadding={true}
                >
                  <SwipeableItem
                    setOpenModal={setOpenModal}
                    alias={items.alias ?? ""}
                    address={`${items.street}, #${items.number}`}
                    currentId={currentId}
                    x={x}
                    setX={setX}
                    animating={animating}
                    setAnimating={setAnimating}
                    id={items.id.toString()}
                    setCurrentId={setCurrentId}
                  />
                </ListItem>
                <Divider
                  variant="fullWidth"
                  component="div"
                  key={items.id.toString()}
                  className="relative z-[2]"
                />
              </div>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default MainAddress;
