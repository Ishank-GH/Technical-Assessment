import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const NavItem = ({ iconSrc, label, isActive }) => (
  <a href="#" className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${isActive ? '' : 'text-gray-400 hover:bg-gray-700/50'}`}>
    <Image 
      src={iconSrc}
      alt={`${label} icon`}
      width={18}
      height={18}
    />
    <span className="text-sm font-medium">{label}</span>
  </a>
);

export default function Navbar() {
  return (
    <header className="relative">
    <nav className="bg-transparent flex items-center justify-between px-6 py-4 mt-1">
      <div className="flex items-center gap-4">
        <Image 
          src="/icons/logo-1.svg"
          alt="SecureSight Logo"
          width={17}
          className='ml-3'
          height={17}
        />
        <Image 
          src="/icons/logo-2.svg"
          alt="SecureSight Logo"
          width={28}
          height={28}
          className='absolute left-[18px] top-[16px] ml-3 '
        />
        <div className="font-bold plus-jakarta-sans-text text-lg tracking-wider text-white">MANDLAC<b>X</b></div>
      </div>
      
      
      <div className="flex items-center gap-2">
        <NavItem iconSrc="/icons/dashboard-icon.svg" label="Dashboard" isActive={true} />
        <NavItem iconSrc="/icons/camera-icon.svg" label="Cameras" />
        <NavItem iconSrc="/icons/scenes-icon.svg" label="Scenes" />
        <NavItem iconSrc="/icons/incidents-icon.svg" label="Incidents" />
        <NavItem iconSrc="/icons/users-icon.svg" label="Users" />
      </div>

      <div className="flex items-center gap-2">
          <Image 
          src="/images/profile-pic.png" 
          alt="User profile picture"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-right">
          <p className="text-sm font-medium text-white">Mohammed Ajhas</p>
          <p className="text-xs text-gray-400">ajhas@mandlac.com</p>
        </div>
      
          <ChevronDown size={16} />
          
      </div>
    </nav>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-700/50 z-10"></div>
    </header>
  );
}