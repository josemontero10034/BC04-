import { Box, ImageList, ImageListItem } from "@mui/material";

import { ImageDistribution } from "@/utils/constants";

import { PictureOrder } from "../shared/types";

export const PhotoGallery = ({ imagesAttached }: PictureOrder) => {
  return (
    <Box>
      <ImageList
        className="h-[208px]"
        variant="quilted"
        cols={3}
        rowHeight={104}
      >
        {imagesAttached.map((item, index) => {
          const position = ImageDistribution[(index % 4) + 1];
          return (
            <ImageListItem key={item.img}>
              <img
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
  );
};
