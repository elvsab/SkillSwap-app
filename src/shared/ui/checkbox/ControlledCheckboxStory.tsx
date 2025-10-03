import type React from "react";
import { useState } from "react";
import { Checkbox } from "./checkbox";
import type { CheckboxVariant } from "./types";

export const ControlledCheckboxStory: React.FC<
  React.ComponentProps<typeof Checkbox>
> = (args) => {
  const [variant, setVariant] = useState<CheckboxVariant>(
    args.variant ?? "unchecked"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next: CheckboxVariant = e.target.indeterminate
      ? "mixed"
      : e.target.checked
      ? "checked"
      : "unchecked";
    setVariant(next);
    args.onChange?.(e);
  };

  return <Checkbox {...args} variant={variant} onChange={handleChange} />;
};
