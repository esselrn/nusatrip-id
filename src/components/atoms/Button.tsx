type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyle = 'px-6 py-3 rounded-md font-inter text-sm flex items-center gap-2 transition'

  const variantStyle = variant === 'primary' ? 'bg-[#FB8C00] hover:bg-orange-600 text-white' : 'bg-gray-200 text-black'

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {children}
    </button>
  )
}
