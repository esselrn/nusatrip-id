import Link from 'next/link'

export default function DropdownMenu({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 py-2 hover:text-orange-500">
        {label} <span className="text-xs">▾</span>
      </button>

      <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition min-w-[180px]">
        {items.map((item, i) => (
          <Link key={i} href={item.href} className="block px-4 py-2 hover:text-orange-500">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
