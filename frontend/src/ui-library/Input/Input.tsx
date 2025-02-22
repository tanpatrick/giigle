import { Input as HeroInput, InputProps as HeroInputProps } from "@heroui/input";

type InputProps = HeroInputProps;

export function Input(props: InputProps) {
  return (
    <HeroInput
      {...props}
      errorMessage={({ validationDetails }) => {
        if (validationDetails.valueMissing) {
          return "This field is required.";
        }

        return "Unknown error";
      }}
    />
  );
}
