import type { ChangeEvent } from "react";

export type CheckboxVariant = 'unchecked' | 'mixed' | 'checked';

export type CheckboxProps = {
    variant: CheckboxVariant;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    id: string;
    ariaLabel?: string;
};