import ProviderRecordIcon from "@/assets/icons/+provider.svg";
import AlertPageIcon from "@/assets/icons/alert-page.svg";
import ConflictiveClient from "@/assets/icons/conflictive-client.svg";
import DislikeBudgetIcon from "@/assets/icons/dislike-budget.svg";
import IneffectiveCommunicationIcon from "@/assets/icons/ineffective-communication.svg";
import PersonalReasonIcon from "@/assets/icons/personal-reasons.svg";
import UnavailableDate from "@/assets/icons/unavailable-date.svg";
import WorkingHoursIcon from "@/assets/icons/working-hours.svg";
import { Cancel, CheckCircle, Schedule, Warning } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { BudgetStatus } from "@prisma/client";
import Image from "next/image";

export const getBudgetTotal = (amount: number) => {
  return {
    amount: amount > 0 ? amount : 0.0,
    get evaluation() {
      return this.amount * 0.18 ?? 0.0;
    },
    get itbis() {
      return this.amount * 0.18 ?? 0.0;
    },
    get isr() {
      return this.amount * 0.02 ?? 0.0;
    },
    get total() {
      return this.amount + this.evaluation + this.itbis + this.isr;
    },
  };
};

export const iconCancellationReasons: Record<string, JSX.Element> = {
  resolvedExternallyClient: (
    <WorkHistoryIcon className="h-5 w-5 text-primary-main" />
  ),
  resolvedExternallyProvider: (
    <WorkHistoryIcon className="h-5 w-5 text-primary-main" />
  ),
  notMatchingWithProviders: (
    <Image
      priority
      src={WorkingHoursIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  unintendedRequest: (
    <Image
      priority
      src={AlertPageIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  otherReasons: <MoreHorizIcon className="text-primary-main" />,
  dissatisfactionService: (
    <SentimentDissatisfiedRoundedIcon className="w-5 h-5 text-primary-main" />
  ),
  budgetDisagreement: (
    <Image
      priority
      src={DislikeBudgetIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  unavailableRequiredDate: (
    <Image
      priority
      src={UnavailableDate}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  ineffectiveCommunication: (
    <Image
      priority
      src={IneffectiveCommunicationIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  conflictiveClient: (
    <Image
      priority
      src={ConflictiveClient}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  personalsReasons: (
    <Image
      priority
      src={PersonalReasonIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
  wantAnotherProvider: (
    <Image
      priority
      src={ProviderRecordIcon}
      alt="Work_Hours"
      height="20px"
      width="20px"
    />
  ),
};

export const getFare = (budget: number) => {
  const halfBudget = 0.5 * budget;
  const minFare = 150;
  if (halfBudget < minFare) {
    return minFare;
  }
  return halfBudget;
};

export const iconByStatus: Record<BudgetStatus | "WARNING", JSX.Element> = {
  PENDING: <Schedule className="h-[20px] w-[20px] text-info-dark" />,
  REJECTED: <Cancel className="h-[20px] w-[20px] text-error-dark" />,
  ACCEPTED: <CheckCircle className="h-[20px] w-[20px] text-success-dark" />,
  WARNING: <Warning className="h-[20px] w-[20px] text-yellow-400" />,
};
