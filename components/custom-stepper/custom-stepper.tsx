import classNames from "classnames";

interface CustomStepperProps {
  currentStep: number;
  numberOfSteps: number;
  className?: string;
}

const CustomStepper = ({
  currentStep,
  numberOfSteps,
  className,
}: CustomStepperProps) => {
  const steps = Array.from({ length: numberOfSteps }, (v, i) => i + 1);

  return (
    <div className={classNames("flex space-x-2", className)}>
      {steps.map((step) => (
        <div
          key={`custom-stepper-${step}`}
          className={classNames(
            "border rounded-md border-primary-dark h-3 transition-all",
            { "w-3": currentStep !== step },
            { "w-11 bg-primary-dark": currentStep === step }
          )}
        />
      ))}
    </div>
  );
};

export default CustomStepper;
