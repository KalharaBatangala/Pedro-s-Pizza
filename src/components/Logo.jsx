export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#c8361d" />
        <circle cx="32" cy="32" r="24" fill="#f3c86b" />
        <circle cx="24" cy="25" r="5" fill="#a32414" />
        <circle cx="40" cy="24" r="4" fill="#a32414" />
        <circle cx="38" cy="40" r="5" fill="#a32414" />
        <circle cx="24" cy="40" r="3.5" fill="#a32414" />
        <path d="M30 31c3-3 6-2 7 0" stroke="#3f7d3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Vito’s</span>
        <span className="logo__sub">Pizza House</span>
      </span>
    </span>
  )
}
