import { Select as HeroSelect, SelectItem as HeroSelectItem, SelectProps as HeroSelectProps } from "@heroui/select";

export type SelectProps<T extends object> = Omit<HeroSelectProps<T>, "children" | "items"> & {
  items: {
    key: string;
    label: string;
  }[];
};

export function Select<T extends object>({ items, ...props }: SelectProps<T>) {
  return (
    <HeroSelect
      {...props}
      errorMessage={({ validationDetails }) => {
        if (validationDetails.valueMissing) {
          return "This field is required.";
        }

        return "Unknown error";
      }}
    >
      {items.map(({ key, label }) => (
        <HeroSelectItem key={key}>{label}</HeroSelectItem>
      ))}
    </HeroSelect>
  );
}
