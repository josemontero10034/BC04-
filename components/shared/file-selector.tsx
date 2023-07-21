import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { getPrimaryDark } from "@/utils/theme";

interface FileSelectorProps {
  pictures: File[];
  setPictures: Dispatch<SetStateAction<File[]>>;
  setUpload: Dispatch<SetStateAction<boolean>>;
}

const FileSelector = (props: FileSelectorProps) => {
  const t = useTranslations("fileSelector");

  return (
    <Box className="flex flex-col items-center justify-center w-80 h-[97px] border rounded border-dashed border-[#0000001F]">
      <Box className="flex flex-row items-center space-x-2 mb-2">
        <Image src="/file-filled.svg" alt="" width={40} height={40} />

        <Typography variant="h4" color={getPrimaryDark} className="underline">
          {t("title")}
        </Typography>
      </Box>

      <Typography variant="body2" color="#0000008A">
        {t("fileTypes")}
      </Typography>

      <input
        name="pictures"
        type="file"
        accept=".svg, .png, .jpg, .gif"
        multiple
        className="absolute w-80 h-[97px] opacity-0"
        onChange={(e) => {
          if (e.target.files) {
            const pictures = Array.from(e.target.files).filter(
              (file) =>
                !props.pictures.find((element) => element.name === file.name)
            );
            props.setPictures(props.pictures.concat(pictures));
            props.setUpload(true);
          }
        }}
      />
    </Box>
  );
};

export default FileSelector;
