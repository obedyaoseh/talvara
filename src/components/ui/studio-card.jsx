import { cn } from '../../lib/utils'
import { Card } from './card'

export function FeatureCard({ className, children, ...props }) {
  return (
    <Card className={cn('feature-card motion-card magnetic-card', className)} {...props}>
      {children}
    </Card>
  )
}

export function CompactListCard({ className, children, ...props }) {
  return (
    <Card className={cn('compact-list-card motion-card', className)} {...props}>
      {children}
    </Card>
  )
}

export function StatMetricCard({ className, children, ...props }) {
  return (
    <Card className={cn('metric-card motion-card', className)} {...props}>
      {children}
    </Card>
  )
}

export function TestimonialCard({ className, children, ...props }) {
  return (
    <Card className={cn('quote-card motion-card', className)} {...props}>
      {children}
    </Card>
  )
}

export function CtaCard({ className, children, ...props }) {
  return (
    <Card className={cn('cta-card conversion-card motion-card', className)} {...props}>
      {children}
    </Card>
  )
}

export function CardMedia({ className, children, ...props }) {
  return (
    <div className={cn('card-media', className)} {...props}>
      {children}
    </div>
  )
}

export function CardLabel({ className, ...props }) {
  return <span className={cn('card-label', className)} {...props} />
}

export function CardBody({ className, ...props }) {
  return <div className={cn('card-body', className)} {...props} />
}

export function CardMeta({ className, ...props }) {
  return <div className={cn('card-meta', className)} {...props} />
}

export function CardAction({ className, ...props }) {
  return <span className={cn('card-action-arrow', className)} aria-hidden="true" {...props} />
}
