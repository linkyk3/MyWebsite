import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export function GlobalNav() {
  const [isHovered, setIsHovered] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/cv', label: 'CV' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/creations', label: 'CREATIONS' },
  ];

  return (
    <>
      {/* Site-wide blur overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 pointer-events-none
          ${isHovered ? 'backdrop-blur-[12px] bg-white/10 dark:bg-black/10' : 'backdrop-blur-none bg-transparent'}
        `}
      />

      {/* Nav Container */}
      <div 
        className="fixed top-8 left-8 z-50 flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="nav-container"
      >
        {/* Geometric Logo */}
        <Link href="/" aria-label="Home" data-testid="logo-home" className="relative z-10 w-8 h-8 cursor-pointer flex items-center justify-center bg-foreground text-background shrink-0 transition-colors hover:bg-destructive">
          <div className="flex items-center justify-center select-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="1" width="5" height="5" />
              <rect x="8" y="1" width="5" height="5" />
              <rect x="1" y="8" width="5" height="5" />
              <rect x="8" y="8" width="5" height="5" />
            </svg>
          </div>
        </Link>

        {/* Expanding Links */}
        <div 
          className="overflow-hidden transition-[max-width] duration-200 ease-linear flex items-center h-8"
          style={{ maxWidth: isHovered ? '400px' : '0px' }}
        >
          <div className="flex items-center px-4 gap-6 whitespace-nowrap font-sans font-normal text-xs tracking-widest uppercase bg-background border border-l-0 border-foreground h-full min-w-max">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`transition-colors duration-200 hover:text-accent cursor-pointer ${
                  location === link.href ? 'text-accent' : 'text-foreground'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
