import React from "react";
import clsx from "clsx";
import styles from "./IconWrapper.module.css";

type SvgComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export type IconProp = SvgComponent | string | null | undefined;

export interface IconWrapperProps {
  icon: IconProp;
  width?: number | string; // px or css value
  height?: number | string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  /** If icon is SVG component, pass additional svg props here */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

/**
 * IconWrapper: обёртка, заставляющая иконку занять весь контейнер
 */
export const IconWrapper: React.FC<IconWrapperProps> = ({
  icon,
  width = 24,
  height = 24,
  ariaLabel,
  className,
  style,
  svgProps,
}) => {
  if (!icon) return null;

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  // SVG как компонент
  if (typeof icon !== "string") {
    const Icon = icon as SvgComponent;
    return (
      <div
        className={clsx(styles.iconWrapper, className)}
        style={containerStyle}
        aria-label={ariaLabel}
      >
        <Icon {...(svgProps || {})} className={styles.iconSvg} />
      </div>
    );
  }

  // icon — строка (url)
  return (
    <div
      className={clsx(styles.iconWrapper, className)}
      style={containerStyle}
      aria-label={ariaLabel}
    >
      <img src={icon} alt={ariaLabel ?? ""} className={styles.iconImg} />
    </div>
  );
};

export default IconWrapper;
