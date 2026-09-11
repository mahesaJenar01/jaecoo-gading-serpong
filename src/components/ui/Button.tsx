import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
export type ButtonSize = "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  secondary: "bg-bg text-ink border border-line hover:bg-surface",
  ghost: "text-brand hover:bg-brand-soft",
  /* Situs ini monokrom, jadi tombol WhatsApp tidak lagi memakai hijau
     merek. Yang menandainya sebagai WhatsApp adalah ikonnya. */
  whatsapp: "bg-wa text-bg hover:bg-brand-hover",
};

const SIZE: Record<ButtonSize, string> = {
  md: "min-h-[44px] px-4 t-body",
  lg: "min-h-[52px] px-6 t-body",
};

/** Target sentuh minimal 44px tinggi, sesuai bagian 3 brief. */
function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  block: boolean,
  className: string,
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-btn font-semibold",
    "transition-colors duration-150",
    VARIANT[variant],
    SIZE[size],
    block ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
  "aria-label"?: string;
};

type LinkProps = CommonProps & {
  href: string;
  /** Paksa buka tab baru. Otomatis true untuk tautan http eksternal. */
  external?: boolean;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type NativeProps = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button(props: LinkProps | NativeProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    block = false,
    className = "",
  } = props;
  const cls = classes(variant, size, block, className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    const isHttp = href.startsWith("http");
    const isProtocol = href.startsWith("tel:") || href.startsWith("mailto:");
    const openNew = external ?? isHttp;

    if (isHttp || isProtocol) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={props["aria-label"]}
          {...(openNew ? { target: "_blank", rel: "noopener" } : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={cls} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled } = props as NativeProps;
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
