import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        spiritual:
          "border-transparent bg-spiritual text-spiritual-foreground hover:bg-spiritual/80",
        blessed:
          "border-transparent bg-blessed text-blessed-foreground hover:bg-blessed/80",
        sacred:
          "border-transparent bg-sacred text-sacred-foreground hover:bg-sacred/80",
        katoličko:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        pravoslavno:
          "border-transparent bg-spiritual text-spiritual-foreground hover:bg-spiritual/80",
        protestantsko:
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        ekumensko:
          "border-transparent bg-blessed text-blessed-foreground hover:bg-blessed/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
