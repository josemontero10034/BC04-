import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

export interface IMaskCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneNumberMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{ "#": /[1-9]/ }}
        inputRef={ref as never}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const CardIdMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="#000 0000 0000 0000"
        definitions={{ "#": /[1-9]/ }}
        inputRef={ref as never}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const ValidDateMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="#0/00"
        definitions={{ "#": /[1-9]/ }}
        inputRef={ref as never}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const CvvMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="#00"
        definitions={{ "#": /[1-9]/ }}
        inputRef={ref as never}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const IDMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="#00-0000000-0"
        definitions={{ "#": /[1-9]/ }}
        inputRef={ref as never}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const MoneyMask = forwardRef<HTMLElement, IMaskCustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        blocks={{
          moneyInput: {
            mask: String,
            radix: ".",
            scale: 2,
            signed: false,
            thousandsSeparator: ",",
            padFractionalZeros: false,
            normalizeZeros: true,
            maxLength: 8,
          },
        }}
        mask="$moneyInput"
        unmask={true}
        inputRef={ref as never}
        onAccept={(value: any) => {
          onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);
