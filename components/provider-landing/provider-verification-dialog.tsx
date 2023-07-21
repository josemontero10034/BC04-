import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { getCommonBlack, getPrimaryMain } from "@/utils/theme";

const ProviderVerificationDialog = () => {
  const t = useTranslations("providerLanding");
  return (
    <Dialog
      open
      style={{
        margin: "0px",
      }}
      PaperProps={{
        sx: {
          margin: "0px",
          width: "320px",
          height: "617px",
          overflow: "hidden",
          borderRadius: "10px",
          paddingTop: "45px",
          paddingBottom: "40px",
          paddingX: "24px",
        },
      }}
    >
      <DialogContent
        sx={{
          overflow: "visible",
          width: "auto",
          height: "617px",
          padding: "0px",
        }}
      >
        <div
          style={{
            content: "",
            backgroundColor: "rgba(41, 107, 164, 0.16)",
            width: "247px",
            height: "247px",
            left: "-65px",
            top: "-36px",
            position: "absolute",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "262px",
            gap: "24px",
          }}
        >
          <Image
            src={"/blue-pages-icon.png"}
            width="102px"
            height="102px"
            alt="Blue Pages Logo"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "16px",
            }}
          >
            <Typography variant="h3" className="leading-[142%]">
              {t.rich("verificationAdvise.textOne")}
            </Typography>
            <Typography variant="h6" className="leading-[142%]">
              {t.rich("verificationAdvise.textTwo")}
            </Typography>
            <Typography variant="h6" className="leading-[142%]">
              {t("verificationAdvise.texThree")}
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": { display: "list-item" },
              }}
            >
              <ListItem sx={{ color: getPrimaryMain, padding: "0px" }}>
                <ListItemText sx={{ color: getCommonBlack }}>
                  <Typography variant="h6" className="leading-[142%]">
                    {t("verificationAdvise.id")}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem sx={{ color: getPrimaryMain, padding: "0px" }}>
                <ListItemText sx={{ color: getCommonBlack }}>
                  <Typography variant="h6" className="leading-[142%]">
                    {t("verificationAdvise.goodConductCertificate")}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Typography variant="body1" className="leading-[142%]">
              {t.rich("verificationAdvise.textFour")}
            </Typography>
          </div>
        </div>
        <div
          style={{
            content: "",
            backgroundColor: "rgba(41, 107, 164, 0.16)",
            width: "247px",
            height: "247px",
            right: "-65px",
            bottom: "-36px",
            position: "absolute",
            borderRadius: "50%",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
export default ProviderVerificationDialog;
