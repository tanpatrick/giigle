import { Textarea as HeroTextarea, TextAreaProps as HeroTextAreaProps } from "@heroui/input";

type TextAreaProps = HeroTextAreaProps;

export function Textarea(props: TextAreaProps) {
  return (
    <HeroTextarea
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
