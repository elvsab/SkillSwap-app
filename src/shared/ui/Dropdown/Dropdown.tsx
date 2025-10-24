import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./types";
import ChevronDownIcon from "../../../shared/assets/icons/ui/chevron-down.svg";

let globalZIndex = 1000;

export const Dropdown: React.FC<DropdownProps> = ({
  label = "",
  placeholder = "",
  options,
  value,
  onChange,
  multi = false,
  className = "",
  fullWidth = false,
  searchable = false,
  onBlur,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [zIndex, setZIndex] = useState<number>(1);
  const ref = useRef<HTMLDivElement | null>(null);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");

  const selectedLabels = (() => {
    if (multi) {
      if (!Array.isArray(value) || value.length === 0) return "";
      return options
        .filter((o) => (value as string[]).includes(o.value))
        .map((o) => o.label)
        .join(", ");
    } else {
      if (!value) return "";
      return options.find((o) => o.value === value)?.label || "";
    }
  })();

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setZIndex(1);
        setFilter("");
        onBlur?.();
      }
    }

    if (open) {
      globalZIndex += 1;
      setZIndex(globalZIndex);
    } else {
      if (zIndex === globalZIndex) {
        globalZIndex = Math.max(1000, globalZIndex - 1);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      if (zIndex === globalZIndex) {
        globalZIndex = Math.max(1000, globalZIndex - 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSingleSelect = (val: string) => {
    if (disabled) return;
    onChange?.(val);
    setOpen(false);
    setFilter("");
  };

  const handleCheckboxChange = (val: string, checked: boolean) => {
    if (disabled) return;
    if (!Array.isArray(value)) {
      onChange?.(checked ? [val] : []);
      return;
    }
    const current = value as string[];
    if (checked) {
      onChange?.([...current, val]);
    } else {
      onChange?.(current.filter((v) => v !== val));
    }
  };

  const toggleOpen = () => {
    if (disabled) return;
    const newOpen = !open;
    setOpen(newOpen);
    if (newOpen) {
      globalZIndex += 1;
      setZIndex(globalZIndex);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filteredOptions[highlightIndex];
      if (opt) {
        if (multi) {
          // toggle
          const checked = Array.isArray(value)
            ? (value as string[]).includes(opt.value)
            : false;
          handleCheckboxChange(opt.value, !checked);
        } else {
          handleSingleSelect(opt.value);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      setFilter("");
    }
  };

  return (
    <div
      className={cn(styles.dropdown, className, {
        [styles.dropdown__fullWidth]: fullWidth,
        [styles["dropdown--disabled"]]: disabled,
      })}
      ref={ref}
      style={{ zIndex }}
      onKeyDown={onKeyDown}
    >
      {label ? <label className={styles.dropdown__label}>{label}</label> : null}

      <div
        className={cn(styles.dropdown__field, {
          [styles["dropdown__field--opened"]]: open,
        })}
        tabIndex={0}
        onClick={() => {
          if (!searchable) toggleOpen();
        }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        data-placeholder={placeholder}
      >
        {searchable ? (
          <input
            type="text"
            className={styles.dropdown__input}
            placeholder={placeholder}
            value={filter || selectedLabels}
            onChange={(e) => {
              setFilter(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            disabled={disabled}
          />
        ) : (
          <span
            className={styles.dropdown__selected}
            data-placeholder={placeholder}
          >
            {multi
              ? Array.isArray(value) && value.length
                ? selectedLabels
                : ""
              : value
              ? selectedLabels
              : ""}
          </span>
        )}

        <ChevronDownIcon
          className={cn(styles.dropdown__arrow, {
            [styles["dropdown__arrow--rotated"]]: open,
          })}
          aria-hidden
        />
      </div>

      {open && (
        <div
          className={styles.dropdown__menu}
          role="listbox"
          style={{ zIndex: zIndex + 1 }}
        >
          {filteredOptions.length === 0 ? (
            <div className={styles.dropdown__empty}>Ничего не найдено</div>
          ) : multi ? (
            <div className={styles.dropdown__checkbox_block}>
              {filteredOptions.map((opt) => {
                const checked = Array.isArray(value)
                  ? (value as string[]).includes(opt.value)
                  : false;
                return (
                  <label
                    key={opt.value}
                    className={styles.dropdown__checkbox_item}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) =>
                        handleCheckboxChange(opt.value, e.target.checked)
                      }
                    />
                    <span className={styles.dropdown__checkbox_label_text}>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            filteredOptions.map((opt, idx) => (
              <div
                key={opt.value}
                className={cn(styles.dropdown__option, {
                  [styles["dropdown__option--selected"]]: opt.value === value,
                })}
                tabIndex={0}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => handleSingleSelect(opt.value)}
                onMouseEnter={() => setHighlightIndex(idx)}
              >
                <span>{opt.label}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
