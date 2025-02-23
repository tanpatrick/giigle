import { DateFormatter } from "@internationalized/date";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(value);
}

const formatter = new DateFormatter("en-NZ", {
  dateStyle: "full",
});

export function formatDate(date: string | undefined) {
  if (!date) {
    return "...";
  }

  return formatter.format(new Date(date));
}
