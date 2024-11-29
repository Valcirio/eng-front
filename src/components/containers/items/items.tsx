import { type HTMLAttributes, type DetailedHTMLProps } from 'react'

type divProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Items = ({ children, ...props }: divProps) => {
  return (
        <div {...props} className='px-4 pb-1 flex flex-row items-start justify-between border-b last:border-b-0 border-border'>
            {children}
        </div>
  )
}
export default Items
