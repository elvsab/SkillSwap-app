export type DateOrNull = Date | null;

export type DatePickerProps = {
  value?: DateOrNull;
  defaultValue?: DateOrNull;
  onChange?: (d: DateOrNull) => void;
  placeholder?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  className?: string;
};