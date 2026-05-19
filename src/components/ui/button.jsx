import { cn } from '../../lib/utils'

export function Button({
  as: Component = 'button',
  variant = 'default',
  size = 'default',
  className,
  type,
  ...props
}) {
  const buttonType = Component === 'button' ? { type: type || 'button' } : {}

  return (
    <Component
      className={cn('ui-button', `ui-button-${variant}`, `ui-button-${size}`, className)}
      {...buttonType}
      {...props}
    />
  )
}
