import MOCK_ORDER_DETAIL from "@/mock/mock-order-detail";
import { Box, CircularProgress, Container, Dialog, Paper } from "@mui/material";
import { CodeStatus, VerificationOrder } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";

import { trpc } from "@/utils/trpc";

import { client } from "../../client";
import useToggle from "../../hooks/useToggle";
import CreateOrderBudget from "../order-budget-form";
import { ImageInfo } from "../shared/types";
import { Wallpaper } from "../shared/wallpaper";
import TopBar from "../top-bar";
import IdentityVerified from "./identity-verified";
import OrderBudgetClient from "./order-budget-client";
import { ProviderDialog } from "./order-budget-dialogs";
import OrderBudgetProvider from "./order-budget-provider";
import OrderCancellation from "./order-cancellation";
import {
  OrderDescription,
  OrderTitle,
  OrderUserInfo,
} from "./order-components";
import OrderDetailsButtons from "./order-details-buttons";
import { PhotoAttached } from "./photo-attached";
import { BudgetUpdateProps } from "./type";

const OrderDetail = ({ orderId }: { orderId: string }) => {
  // components togglers
  const { status: openBudgetForm, statusToggler: toggleOpenBudgetForm } =
    useToggle();
  const {
    status: openCancellationOrder,
    statusToggler: toggleOpenCancellationOrder,
  } = useToggle();

  const t = useTranslations();

  // data fetchers
  const { data: user, isFetched: isUserFecthed } = trpc.user.getUser.useQuery();
  const { data: order, isFetched: isOrderFetched } = trpc.order.read.useQuery({
    id: BigInt(orderId).toString(),
  });

  // secondary data states
  const [y, setY] = useState<number>(0);
  const [slide, toggleSlide] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // data mutators
  const { mutate, isSuccess } = trpc.orderBudget.upsert.useMutation();
  // data handlers
  const handleBudgetUpdate = useCallback(
    (props: BudgetUpdateProps) => mutate({ ...props }),
    [mutate]
  );

  const { data: verification, isFetching } =
    trpc.pin.getVerificationCode.useQuery(
      {
        orderId: orderId,
      },
      {
        refetchOnMount: true,
      }
    );

  // routes and states to use for verifcation code
  const { mutate: updateStatusCode } = trpc.pin.updateStatusCode.useMutation();
  const [isWarningClosed, setIsWarningClosed] = useState<boolean>(false);
  const { status: thisCodeChanged, statusToggler: toggleOpen } = useToggle();
  const { mutate: deleteCode, isSuccess: isCodeDeleted } =
    trpc.pin.deleteVerificationCode.useMutation();
  // status code from verification code

  const { CONCLUDED } = CodeStatus;

  // data effects
  useEffect(() => {
    if (isSuccess) {
      toggleOpenBudgetForm();
    }
    // logic for client to open warning verification dialog according many attempts
    if (isFetching) {
      if (
        verification?.attempts === 3 &&
        !thisCodeChanged &&
        !isWarningClosed
      ) {
        setIsWarningClosed(true);
        toggleOpen();
      } else if (
        verification?.codeStatus === CONCLUDED &&
        verification?.attempts === 6 &&
        user?.roles[0] === "CLIENT"
      ) {
        deleteCode({ orderId: (verification.orderId ?? 0).toString() });
      }
      if (
        verification?.codeStatus !== CONCLUDED &&
        verification?.Order?.isVerified === true
      ) {
        // updateStatusCode
        updateStatusCode({
          orderId: (verification.orderId ?? 0).toString(),
          statusCode: CONCLUDED,
        });
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    }
    if (isCodeDeleted) {
      setIsWarningClosed(true);
    }
  }, [isSuccess, isFetching, isCodeDeleted]);

  const handleSwiped = (eventData: SwipeEventData) => {
    const maxDisplacementY = -155;

    if (eventData.dir == "Up") {
      setY(maxDisplacementY);
      toggleSlide(true);
    } else if (eventData.dir == "Down") {
      setY(0); // return into initial position
      toggleSlide(false);
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      handleSwiped(eventData);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const Order = MOCK_ORDER_DETAIL.filter((Order) => {
    if (Order !== undefined) {
      return Order.isActive;
    }
  });

  const defaultPicture: Array<ImageInfo> = [
    {
      img: "/assets/images/order-detail-Image-not-reached.png",
      title: "sink-white",
    },
  ];

  const imagesAttached = Order[0]?.imagesAttached ?? defaultPicture;
  const getProviderDialog = (values: VerificationOrder | undefined) => {
    const handleOnClose = () => {
      setIsWarningClosed(false);
    };

    if (verification?.attempts === 6) {
      return (
        <ProviderDialog
          title={t("orderDetail.pinVerification.searchProvider")}
          content={t("orderDetail.pinVerification.contentReasons")}
          open={isWarningClosed}
          onClose={handleOnClose}
        />
      );
    } else if (values?.attempts === 3) {
      return (
        <ProviderDialog
          title={t("orderDetail.pinVerification.newCodeTitle")}
          content={t("orderDetail.pinVerification.content")}
          open={isWarningClosed}
          onClose={handleOnClose}
        />
      );
    }
  };

  return (
    <>
      {openBudgetForm ? (
        <CreateOrderBudget
          onSubmit={handleBudgetUpdate}
          toggleOpenBudgetForm={toggleOpenBudgetForm}
          orderId={order!.id}
        />
      ) : (
        <>
          <TopBar
            leftIcon="backArrow"
            onLeftIconClick={() => window.history.back()}
          />
          {!user ?? !order ?? !isUserFecthed ?? !isOrderFetched ? (
            <Box className="flex h-full w-screen flex-col items-center justify-center">
              <CircularProgress />
            </Box>
          ) : (
            <Container
              disableGutters
              maxWidth={false}
              {...handlers}
              className="absolute top-0 h-full w-full"
            >
              <div className="absolute w-full">
                <Wallpaper style={{ background: Order[0]?.backGround }} />
                {/*  This background color will change based on the serviceType that comes from the db */}
                <Box className="absolute left-0 right-0 top-[15px] z-10 m-auto flex flex-col-reverse justify-around">
                  <Image
                    src={
                      // This image will change based on the serviceType that comes from the db
                      Order[0]?.svg ??
                      "/assets/images/order-detail-Image-not-reached.png"
                    }
                    alt="me"
                    width={144.3}
                    height={185}
                  />
                </Box>
                <Container
                  disableGutters
                  maxWidth={false}
                  className={`absolute top-[210px] z-20 flex flex-col justify-around`}
                  sx={{
                    transition: "transform ease 1s",
                    transform: `translatey(${y}px)`,
                  }}
                >
                  <Box className="z-1 flex flex-wrap">
                    <Paper
                      className="z-2 mb-16 flex w-full flex-col items-center justify-center gap-4 rounded-t-[70px] p-5"
                      elevation={0}
                    >
                      <OrderTitle
                        serviceTypeName={order?.serviceType?.name ?? "..."}
                        subServiceTypeName={
                          order?.subServiceType?.name ?? "..."
                        }
                      />
                      <OrderDescription
                        description={order?.description ?? ""}
                      />
                      <OrderBudgetClient
                        role={user?.roles[0]}
                        orderId={order?.id}
                      />
                      <OrderUserInfo
                        role={user?.roles[0]}
                        orderAddress={order?.address}
                        client={order?.client?.user}
                        provider={order?.provider?.user}
                        isVerified={order?.isVerified ?? false}
                        orderId={order?.id.toString()}
                        orderStatus={order?.status}
                      />
                      <PhotoAttached
                        imagesAttached={imagesAttached}
                        slide={slide}
                      />
                      <OrderBudgetProvider
                        role={user?.roles[0]}
                        orderId={order?.id}
                        onToggleOpenForm={toggleOpenBudgetForm}
                      />
                    </Paper>
                  </Box>
                </Container>
                <OrderDetailsButtons
                  hasProviderAssigned={!!order?.providerId}
                  role={user?.roles[0]}
                  statusToggler={toggleOpenCancellationOrder}
                />
                <OrderCancellation
                  order={order}
                  isOpen={openCancellationOrder}
                  onClose={toggleOpenCancellationOrder}
                  onOpen={toggleOpenCancellationOrder}
                  userRole={user?.roles[0]}
                />
              </div>
              {user?.roles[0] === "CLIENT" && getProviderDialog(verification)}
              <Dialog fullScreen open={isVisible}>
                <IdentityVerified />
              </Dialog>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetail;
