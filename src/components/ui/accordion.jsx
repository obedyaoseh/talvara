import { cn } from '../../lib/utils'

export function Accordion({ className, ...props }) {
  return <div className={cn('ui-accordion', className)} {...props} />
}

export function AccordionItem({ title, children, className, ...props }) {
  return (
    <details className={cn('ui-accordion-item', className)} {...props}>
      <summary className="ui-accordion-trigger">{title}</summary>
      <div className="ui-accordion-content">{children}</div>
    </details>
  )
}
