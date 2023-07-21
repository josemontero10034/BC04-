import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PinDropSharpIcon from "@mui/icons-material/PinDropSharp";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { useEffect } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";

import { SwipeableItemProps } from "./types";

const SwipeableItem = ({
  id,
  currentId,
  setCurrentId,
  x,
  setX,
  animating,
  setAnimating,
  alias,
  address,
  setOpenModal,
}: SwipeableItemProps) => {
  const handleSwiping = (eventData: SwipeEventData, id: string | undefined) => {
    setCurrentId(id);
    const driftMax = 60; // drift max allowed
    const driftMin = 0;
    setX(eventData.deltaX);
    if (eventData.deltaX < driftMin && Math.abs(eventData.deltaX) > driftMax) {
      setOpenModal(true);
      setX(0);
    }
  };

  const handleMouseDown = () => {
    setAnimating(false);
    setX(0);
  };

  const handleMouseUp = () => {
    setAnimating(true);
  };

  useEffect(() => {
    let animationFrameId: number;
    const minDelta = 1; //minimun value absolute of distance

    if (animating) {
      animationFrameId = requestAnimationFrame(() => {
        const delta = x / 8; // the delta displacement will be the value swiped divided by eight.
        if (Math.abs(delta) < minDelta) {
          setAnimating(false);
          setX(0);
        }
        setX(x - delta); // the displacement swiped have to be reduced by delta in a progressive way. in this case the swiped values and delta are negative according the direction on each swipping
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animating, setAnimating, setX, x]);

  const handlers = useSwipeable({
    onTouchEndOrOnMouseUp: handleMouseUp,
    trackMouse: true,
    onSwiping: (eventData) => {
      handleSwiping(eventData, id);
    },
    preventScrollOnSwipe: true,
    onTap: handleMouseDown,
    trackTouch: true,
    onTouchStartOrOnMouseDown: handleMouseDown,
  });

  const ratio = 0.084; // this ratios allowed us to reduce the displacement on the UI only 5px (5px/driftMax)

  return (
    <>
      <>
        <ListItemText
          primary={alias}
          secondary={address}
          sx={{
            ".MuiListItemText-primary": {
              paddingTop: "9px",
              height: "20px",
              fontSize: "14px",
            },
            ".MuiListItemText-secondary": {
              paddingTop: "20px",
              fontSize: "13px",
              height: "18px",
              color: "#000000",
            },
            background: "#FDFEFF",
            height: "77px",
            width: id === currentId && x < 0 ? `calc(100% + ${x}px)` : "100%",
            zIndex: 1,
            position: "absolute",
            paddingLeft:
              x < 0 && currentId == id ? `calc(50px + ${x * ratio}px)` : "50px",
            left: "0px",
            borderRadius: id === currentId && x < 0 ? "20px" : "0px",
          }}
          {...handlers}
        />
        <ListItemAvatar
          sx={{
            marginLeft:
              x < 0 && currentId == id ? `calc(0px + ${x * ratio}px)` : "0px",
          }}
        >
          <PinDropSharpIcon className="ml-[24.14px] h-[16.67px] fill-primary-main absolute z-[2] top-2.5" />
        </ListItemAvatar>
        <Avatar className="bg-[#F0E0E7] w-[84px] h-[77px]" variant="square">
          <DeleteRoundedIcon className="ml-[25px] text-[#BF0603]" />
        </Avatar>
      </>
    </>
  );
};

export default SwipeableItem;
