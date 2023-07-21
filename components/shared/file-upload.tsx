import CloseIcon from "@mui/icons-material/Close";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FileUploadProps {
  key: string;
  file: File | null | undefined;
  onDelete: (name?: string) => void;
}

const calculateFileSize = (size?: number): string => {
  if (size) {
    return size < 1048576
      ? `${(size / 1000).toFixed(2)} KB`
      : `${(size / 1048576).toFixed(2)} MB`;
  }

  return "";
};

const FileUpload = (props: FileUploadProps) => {
  const t = useTranslations("fileUpload");
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (props.file) {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const result = event.target?.result;
        console.log(result);
      });

      reader.addEventListener("progress", (event) => {
        if (event.loaded && event.total) {
          const percent = (event.loaded / event.total) * 100;
          setPercentage(Math.round(percent));
        }
      });

      reader.readAsDataURL(props.file);
    }
  }, [props]);

  return (
    <Box className="flex flex-col items-center justify-center w-80 h-[97px]">
      <Box className="flex flex-row items-start space-x-4">
        <Image src="/file-outlined.svg" alt="" width={40} height={40} />

        <Box className="w-[172px]">
          <Typography variant="h6" color="#000000DE">
            {props.file?.name}
          </Typography>

          <Typography
            variant="body2"
            color="#0000008A"
            className="flex flex-row space-x-2"
            component={"span"}
          >
            <Typography variant="inherit">
              {calculateFileSize(props.file?.size)}
            </Typography>

            <Typography variant="inherit">•</Typography>

            <Typography variant="inherit">
              {percentage < 100 ? t("status.loading") : t("status.complete")}
            </Typography>
          </Typography>

          <LinearProgress
            variant="determinate"
            value={percentage}
            className="mt-5 bg-[#A3C8ED]"
            classes={{ bar1Determinate: "bg-[#1976D2]" }}
          />
        </Box>

        <Box>
          <CloseIcon
            sx={{ fontSize: "20px" }}
            className="m-3 fill-[#0000008A]"
            onClick={() => {
              props.onDelete(props.file?.name);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FileUpload;
