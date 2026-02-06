type ButtonProps = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export default function Button({ children, size = 'md', onClick }: ButtonProps) {
  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }[size]

  return (
    <button onClick={onClick} className={`bg-orange-500 text-white rounded-md hover:bg-orange-600 transition ${sizeClass}`}>
      {children}
    </button>
  )
}
