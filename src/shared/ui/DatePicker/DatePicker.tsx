import React, { useEffect, useRef, useState } from "react";
import styles from "./DatePicker.module.scss";
import CalendarIcon from "../../assets/icons/inputs/calendar.svg";
import { Input } from "../input";
import { type DatePickerProps, type DateOrNull } from "./types";

const pad = (n: number) => n.toString().padStart(2, "0");

function formatDDMMYYYY(d: Date) {
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function parseDDMMYYYY(str: string): DateOrNull {
  const m = str.trim().match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
  if (!m) return null;
  const dd = Number(m[1]);
  const mm = Number(m[2]) - 1;
  const yyyy = Number(m[3]);
  const d = new Date(yyyy, mm, dd);
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm || d.getDate() !== dd)
    return null;
  return d;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, months: number) {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}
function isSameDay(a?: DateOrNull, b?: DateOrNull) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function buildWeeks(viewDate: Date) {
  const first = startOfMonth(viewDate);
  const firstDayIndex = (first.getDay() + 6) % 7; // Monday-first
  const start = new Date(first);
  start.setDate(first.getDate() - firstDayIndex);
  const weeks: Date[][] = [];
  const cur = new Date(start);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue = null,
  onChange,
  placeholder = "дд.мм.гггг",
  min,
  max,
  disabled = false,
  className,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DateOrNull>(defaultValue);
  const selected = isControlled ? (value as DateOrNull) : internalValue;

  const [open, setOpen] = useState(false);
  const [tempPick, setTempPick] = useState<DateOrNull>(selected ?? null);
  const [viewDate, setViewDate] = useState<Date>(
    selected ? startOfMonth(selected) : startOfMonth(new Date())
  );
  const [inputText, setInputText] = useState<string>(
    selected ? formatDDMMYYYY(selected) : ""
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) {
      setTempPick(selected ?? null);
      setInputText(selected ? formatDDMMYYYY(selected) : "");
      if (selected) setViewDate(startOfMonth(selected));
    }
  }, [selected, open]);

  useEffect(() => {
    const handleDoc = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDoc);
    return () => document.removeEventListener("mousedown", handleDoc);
  }, []);

  const onInputFocus = () => {
    if (disabled) return;
    setOpen(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setInputText(selected ? formatDDMMYYYY(selected) : "");
      setTempPick(selected);
    } else if (e.key === "Enter") {
      const parsed = parseDDMMYYYY(inputText);
      if (parsed && (!min || parsed >= min) && (!max || parsed <= max)) {
        setTempPick(parsed);
        if (!isControlled) setInternalValue(parsed);
        onChange?.(parsed);
        setOpen(false);
      } else {
        // invalid — можно показать сообщение (в Input есть message prop)
      }
    } else if (e.key === "ArrowDown") {
      setOpen(true);
    }
  };

  const toggleOpen = (ev?: React.MouseEvent) => {
    ev?.stopPropagation();
    if (disabled) return;
    setOpen((s) => !s);
    if (!open) setTimeout(() => inputRef.current?.focus(), 0);
  };

  const onSelectDay = (d: Date) => {
    if (min && d < min) return;
    if (max && d > max) return;
    setTempPick(d);
    setInputText(formatDDMMYYYY(d));
  };

  const confirm = () => {
    if (!isControlled) setInternalValue(tempPick ?? null);
    onChange?.(tempPick ?? null);
    setOpen(false);
  };

  const cancel = () => {
    setTempPick(selected);
    setInputText(selected ? formatDDMMYYYY(selected) : "");
    setOpen(false);
  };

  const months = Array.from({ length: 12 }).map((_, i) =>
    new Date(viewDate.getFullYear(), i, 1).toLocaleString("ru-RU", {
      month: "long",
    })
  );

  const yearOptions = (() => {
    const now = new Date().getFullYear();
    const arr: number[] = [];
    for (let y = now - 20; y <= now + 5; y++) arr.push(y);
    return arr;
  })();

  const weeks = buildWeeks(viewDate);

  return (
    <div
      className={`${styles["date-picker"]} ${className ?? ""}`}
      ref={containerRef}
    >
      <label className={styles["date-picker__label"]}>Дата рождения</label>

      <div
        className={styles["date-picker__input-wrap"]}
        style={{ maxWidth: 320 }}
      >
        <Input
          ref={inputRef}
          value={inputText}
          onChange={onInputChange}
          onFocus={onInputFocus}
          onKeyDown={onInputKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={styles["date-picker__input"]}
          aria-haspopup="dialog"
          aria-expanded={open}
        />

        <div className={styles["date-picker__side"]}>
          <button
            type="button"
            className={styles["date-picker__icon-button"]}
            onClick={toggleOpen}
            aria-label={open ? "Закрыть календарь" : "Открыть календарь"}
          >
            <CalendarIcon
              className={styles["date-picker__icon"]}
              aria-hidden
              focusable={false}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          className={styles["date-picker__pop"]}
          role="dialog"
          aria-modal="false"
        >
          <div className={styles["date-picker__pop-header"]}>
            <button
              type="button"
              className={styles["nav-btn"]}
              onClick={() => setViewDate((v) => addMonths(v, -1))}
              aria-label="Prev month"
            >
              ‹
            </button>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select
                className={styles["month-select"]}
                value={viewDate.getMonth()}
                onChange={(e) =>
                  setViewDate(
                    new Date(viewDate.getFullYear(), Number(e.target.value), 1)
                  )
                }
                aria-label="Выбор месяца"
              >
                {months.map((m, i) => (
                  <option key={m + i} value={i}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                className={styles["year-select"]}
                value={viewDate.getFullYear()}
                onChange={(e) =>
                  setViewDate(
                    new Date(Number(e.target.value), viewDate.getMonth(), 1)
                  )
                }
                aria-label="Выбор года"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className={styles["nav-btn"]}
              onClick={() => setViewDate((v) => addMonths(v, 1))}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className={styles["date-picker__calendar"]}>
            <div className={styles["calendar__weekdays"]}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                <div key={d} className={styles.weekday}>
                  {d}
                </div>
              ))}
            </div>

            <div className={styles["calendar__weeks"]}>
              {weeks.map((week, wi) => (
                <div className={styles["calendar__week"]} key={wi}>
                  {week.map((day) => {
                    const inMonth = day.getMonth() === viewDate.getMonth();
                    const disabledDay =
                      (min && day < min) || (max && day > max);
                    const isSelected = isSameDay(day, tempPick);
                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        className={[
                          styles["calendar__day"],
                          !inMonth ? styles.muted : "",
                          disabledDay ? styles.disabled : "",
                          isSelected ? styles.selected : "",
                        ].join(" ")}
                        onClick={() => onSelectDay(new Date(day))}
                        disabled={disabledDay}
                        aria-pressed={isSelected}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className={styles["date-picker__actions"]}>
            <button
              type="button"
              className={styles["btn-cancel"]}
              onClick={cancel}
            >
              Отменить
            </button>
            <button
              type="button"
              className={styles["btn-confirm"]}
              onClick={confirm}
            >
              Выбрать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;