export function Defs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="cg" x1="0" x2="1"><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#eadbc6" /><stop offset="1" stopColor="#cdb79b" /></linearGradient>
        <linearGradient id="bg2" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#7a4a2c" /><stop offset="1" stopColor="#2a150b" /></linearGradient>
        <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0b865" /><stop offset="1" stopColor="#b9702a" /></linearGradient>
      </defs>
    </svg>
  )
}

export default function Art({ kind = 'cup', color = '#c49a6c', className = 'size-full' }) {
  const p = { viewBox: '0 0 200 200', className, 'aria-hidden': true }
  if (kind === 'iced') return (
    <svg {...p}>
      <path d="M118 8l12 6-22 80" stroke="#E9A35B" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M55 50h90l-13 115q-32 10-64 0z" fill="rgba(255,255,255,.18)" stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
      <path d="M60 84h80l-8 81q-32 10-64 0z" fill={color} opacity=".92" className="transition-[fill] duration-500" />
      <rect x="72" y="62" width="30" height="26" rx="5" fill="#fff" opacity=".55" transform="rotate(-12 87 75)" />
      <rect x="104" y="72" width="28" height="24" rx="5" fill="#fff" opacity=".45" transform="rotate(10 118 84)" />
    </svg>
  )
  if (kind === 'croissant') return (
    <svg {...p}>
      <path d="M22 134C22 70 178 70 178 134c-22-20-40-24-78-24s-56 4-78 24z" fill="url(#cr)" />
      <path d="M60 92l10 22M86 84l5 26M114 84l-5 26M140 92l-10 22" stroke="#9b5a1d" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 112c30-24 90-24 120 0" stroke="#ffd79a" strokeWidth="4" fill="none" opacity=".6" strokeLinecap="round" />
    </svg>
  )
  if (kind === 'muffin') return (
    <svg {...p}>
      <path d="M52 112h96l-12 52H64z" fill="#d9b48a" />
      <path d="M72 114l6 48M100 114v48M128 114l-6 48" stroke="#b88a5e" strokeWidth="3" />
      <path d="M38 114c-10-44 22-70 62-70s72 26 62 70z" fill="#a9622e" />
      <circle cx="80" cy="84" r="6" fill="#4b3a8a" /><circle cx="116" cy="74" r="6" fill="#4b3a8a" /><circle cx="128" cy="98" r="5" fill="#4b3a8a" />
    </svg>
  )
  if (kind === 'cake') return (
    <svg {...p}>
      <path d="M26 150l148-30V92L26 112z" fill="#f3d9a8" />
      <path d="M26 112l148-20-24-28L52 80z" fill="#fff4dc" />
      <path d="M26 150l148-30V92L26 112z" fill="none" stroke="#d8b878" strokeWidth="3" />
      <circle cx="84" cy="72" r="11" fill="#e0475b" /><path d="M84 62c0-6 6-8 8-8" stroke="#5a8a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
  if (kind === 'bean') return (
    <svg {...p}>
      <ellipse cx="100" cy="100" rx="52" ry="72" transform="rotate(28 100 100)" fill="url(#bg2)" />
      <path d="M92 36C62 92 128 108 108 164" stroke="#160a04" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  )
  return (
    <svg {...p}>
      <ellipse cx="100" cy="166" rx="80" ry="15" fill="#c9b399" />
      <ellipse cx="100" cy="162" rx="74" ry="12" fill="#f1e4d2" />
      <path d="M152 92c34-6 34 40-4 38" fill="none" stroke="#f1e4d2" strokeWidth="10" strokeLinecap="round" />
      <path d="M42 80h116c0 52-24 82-58 82s-58-30-58-82z" fill="url(#cg)" />
      <ellipse cx="100" cy="80" rx="58" ry="13" fill="#efe3d3" />
      <ellipse cx="100" cy="81" rx="52" ry="10" fill={color} className="transition-[fill] duration-500" />
      <ellipse cx="100" cy="81" rx="20" ry="3.5" fill="#fff" opacity=".35" />
      <path className="animate-steam" d="M82 62c-10-14 10-18 0-34M104 60c-10-14 10-18 0-34M126 62c-10-14 10-18 0-34" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
