// SiteRadar - Minimalist Icon System (1px stroke, refined)

import React from 'react';

interface IconProps {
  className?: string;
}

const Icon: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = 'w-5 h-5' 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const RadarIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </Icon>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-5 h-5'}>
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-5 h-5'}>
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

export const StopIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-5 h-5'}>
    <rect x="6" y="6" width="12" height="12" rx="1" />
  </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </Icon>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Icon>
);

export const BookmarkIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </Icon>
);

export const BookmarkFilledIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || 'w-5 h-5'}>
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);

export const PassportIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="12" cy="11" r="3" />
    <path d="M7 17h10" />
  </Icon>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="9" ry="4" />
    <line x1="12" y1="3" x2="12" y2="21" />
  </Icon>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <polyline points="9 18 15 12 9 6" />
  </Icon>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />
  </Icon>
);

export const VolumeIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 010 7.07" />
  </Icon>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <Icon className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </Icon>
);
