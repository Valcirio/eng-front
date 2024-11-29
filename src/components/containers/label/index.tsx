import { cn } from '@/lib/utils'

type labelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label ({ children, className, ...props }: labelProps) {
  return (
        <label {...props} className={cn('p-2 w-full flex flex-col justify-start items-start gap-2', className)} >
            {children}
        </label>
  )
}
