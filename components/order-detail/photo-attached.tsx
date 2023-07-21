import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

import { ImageDistribution } from "@/utils/constants";

import { PictureOrder } from "../shared/types";

export const PhotoAttached = ({ imagesAttached, slide }: PictureOrder) => {
  const t = useTranslations("orderDetail");

  const fadeWay = slide ? "fadeOut" : "fadeIn";

  return (
    <Box className="flex flex-col gap-5">
      <Box
        className="flex w-full flex-col items-start gap-2 text-common-black"
        sx={{
          animation: `${fadeWay} ease 1s`,
          [`@keyframes ${fadeWay}`]: {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.5 },
            "100%": { opacity: 1 },
          },
        }}
      >
        <Typography fontSize={"14px"} fontWeight="400">
          {t("images")}
        </Typography>
        <ImageList
          className={"h-32 w-full"}
          variant="quilted"
          cols={5}
          rowHeight={62.5}
        >
          {imagesAttached.map((item, index) => {
            const position = ImageDistribution[(index % 4) + 1];

            return (
              <ImageListItem
                key={item.img}
                cols={position?.col || 1}
                rows={position?.row || 1}
              >
                <img // eslint-disable-line @next/next/no-img-element
                  src={`${item.img}?w=${121 * position!.col}&h=${
                    121 * position!.row
                  }&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </Box>
  );
};
