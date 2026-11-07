import React from 'react';

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-4 h-4' }) => {
  const common = { strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const icons: Record<string, React.ReactNode> = {
    sprout: (
      <path
        d="M7 20h10M12 20v-8M12 12c-3 0-6-3-6-7 4 0 7 3 7 7ZM12 12c3 0 6-3 6-7-4 0-7 3-7 7Z"
        stroke="currentColor"
        {...common}
      />
    ),
    shieldCheck: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" stroke="currentColor" {...common} />
    ),
    phone: (
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        {...common}
      />
    ),
    messageSquare: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" {...common} />
    ),
    calendar: (
      <path
        d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"
        stroke="currentColor"
        {...common}
      />
    ),
    map: <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16" stroke="currentColor" {...common} />,
    compass: (
      <React.Fragment>
        <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" {...common} />
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    droplets: (
      <path
        d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z"
        stroke="currentColor"
        {...common}
      />
    ),
    checkCircle2: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <path d="m9 12 2 2 4-4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    clock: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    bookmarkCheck: (
      <React.Fragment>
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" stroke="currentColor" {...common} />
        <path d="m9 10 2 2 4-4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    lock: (
      <React.Fragment>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" {...common} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    shieldAlert: (
      <React.Fragment>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" {...common} />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" {...common} />
        <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    users: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" {...common} />
        <circle cx="9" cy="7" r="4" stroke="currentColor" {...common} />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    userCheck: (
      <React.Fragment>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" {...common} />
        <circle cx="9" cy="7" r="4" stroke="currentColor" {...common} />
        <polyline points="16 11 18 13 22 9" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    bell: (
      <React.Fragment>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" {...common} />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    layers: (
      <React.Fragment>
        <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" {...common} />
        <polyline points="2 17 12 22 22 17" stroke="currentColor" {...common} />
        <polyline points="2 12 12 17 22 12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    gitBranch: (
      <React.Fragment>
        <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" {...common} />
        <circle cx="18" cy="6" r="3" stroke="currentColor" {...common} />
        <circle cx="6" cy="18" r="3" stroke="currentColor" {...common} />
        <path d="M18 9a9 9 0 0 1-9 9" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    tag: (
      <path
        d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z M7 7h.01"
        stroke="currentColor"
        {...common}
      />
    ),
    folderPlus: (
      <React.Fragment>
        <path
          d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
          stroke="currentColor"
          {...common}
        />
        <line x1="12" y1="10" x2="12" y2="16" stroke="currentColor" {...common} />
        <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    pieChart: (
      <React.Fragment>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" {...common} />
        <path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    archive: (
      <React.Fragment>
        <polyline points="21 8 21 21 3 21 3 8" stroke="currentColor" {...common} />
        <rect x="1" y="3" width="22" height="5" stroke="currentColor" {...common} />
        <line x1="10" y1="12" x2="14" y2="12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    creditCard: (
      <React.Fragment>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" {...common} />
        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    fileText: (
      <React.Fragment>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" {...common} />
        <polyline points="14 2 14 8 20 8" stroke="currentColor" {...common} />
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" {...common} />
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    sun: (
      <React.Fragment>
        <circle cx="12" cy="12" r="4" stroke="currentColor" {...common} />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" {...common} />,
    check: <polyline points="20 6 9 17 4 12" stroke="currentColor" {...common} />,
    x: (
      <React.Fragment>
        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" {...common} />
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    xCircle: (
      <React.Fragment>
        <circle cx="12" cy="12" r="10" stroke="currentColor" {...common} />
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" {...common} />
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    barChart: (
      <React.Fragment>
        <line x1="12" y1="20" x2="12" y2="10" stroke="currentColor" {...common} />
        <line x1="18" y1="20" x2="18" y2="4" stroke="currentColor" {...common} />
        <line x1="6" y1="20" x2="6" y2="16" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    download: (
      <React.Fragment>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" {...common} />
        <polyline points="7 10 12 15 17 10" stroke="currentColor" {...common} />
        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    plus: (
      <React.Fragment>
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" {...common} />
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    zoomIn: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" stroke="currentColor" {...common} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" {...common} />
        <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" {...common} />
        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    zoomOut: (
      <React.Fragment>
        <circle cx="11" cy="11" r="8" stroke="currentColor" {...common} />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" {...common} />
        <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
    rotateCcw: (
      <React.Fragment>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" {...common} />
        <path d="M3 3v5h5" stroke="currentColor" {...common} />
      </React.Fragment>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[name] || icons.check}
    </svg>
  );
};
