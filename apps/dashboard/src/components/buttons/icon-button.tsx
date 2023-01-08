import clsx from "clsx"
import Link from "next/link"
import { HTMLProps } from "react"

type Variant = "solid" | "outline" | "ghost"

type IconButtonProps = HTMLProps<HTMLDivElement> & {
  icon: React.ReactNode,
  isActive?: boolean,
  variant?: Variant,
}

const IconButton: React.FC<IconButtonProps> = ({
  className: classNameProp,
  ...props
}) => {
  if (props.href) {
    return (
      <Link
        href={props.href}
        passHref
      >
        <IconButtonCore
          {...props}
        />
      </Link>
    )
  }

  return (
    <IconButtonCore
      {...props}
    />
  )
}

const IconButtonCore: React.FC<IconButtonProps> = ({
  icon,
  title,
  isActive,
  className,
  variant = "outline",
  ...props
}) => {

  return (
    <div
      className={clsx(
        "icon-button",
        variant,
        className
      )}
      data-active={isActive ? "" : undefined}
      {...props}
    >
      {icon}
    </div>
  )
}

export default IconButton