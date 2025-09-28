export type CheckboxVariant = 'unchecked' | 'mixed' | 'checked';

export type CheckboxProps = {
    variant?: CheckboxVariant;
    defaultVariant?: CheckboxVariant;
    onChange?: (next: CheckboxVariant) => void;
    label?: string;
    id: string;
    ariaLabel?: string;
};