import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#f9f2eb] text-[#2e2a2a] border border-[#2e2a2a] hover:bg-[#2e2a2a] hover:text-white",
        destructive:
          "bg-[#f9f2eb] text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
        outline:
          "border border-[#2e2a2a] bg-transparent hover:bg-[#f9f2eb] hover:text-[#2e2a2a]",
        secondary:
          "bg-[#f9f2eb] text-[#2e2a2a] border border-[#2e2a2a]/20 hover:bg-[#2e2a2a]/5",
        ghost: "hover:bg-[#f9f2eb] hover:text-[#2e2a2a]",
        link: "text-[#2e2a2a] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
