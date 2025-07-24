import Image from 'next/image';

const IconButton = ({ iconSrc, alt, bgColor, borderColor, className = '' }) => (
  <button className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center hover:opacity-90 border ${borderColor} relative ${className}`}>
    <Image src={iconSrc} alt={alt} width={12} height={12}/>
  </button>
);

export default function DashboardHeader({ unresolvedCount, resolvedCount }) {
  return (
    <div className="flex items-center justify-between pb-1 border-gray-700/50">
      {/* --- Left Side --- */}
      <div className="flex items-center shrink-0 gap-2">
        <div className="w-[29px] h-[29px] rounded-full bg-red-900/80 flex items-center justify-center border border-red-700">
          <Image src="/icons/alert-icon.svg" alt="Alert icon" width={17} height={17}/>
        </div>
        <h2 className="text-md font-semibold text-white whitespace-nowrap">{unresolvedCount} Unresolved Incidents</h2>
      </div>
      
      <div className="flex items-center gap-1 text-sm">
        <div className="flex items-center -space-x-2"> {/* This creates the overlap */}
          <IconButton 
            iconSrc="/icons/filter-icon.svg" 
            alt="Filter" 
            bgColor="bg-orange-900"
            borderColor="border-orange-700"
          />
          <IconButton 
            iconSrc="/icons/add-user-icon.svg" 
            alt="Add User" 
            bgColor="bg-red-900"
            borderColor="border-red-700"
          />
          <IconButton 
            iconSrc="/icons/face-recognised-icon.svg"
            alt="Search" 
            bgColor="bg-blue-900"
            borderColor="border-blue-700"
          />
        </div>

        <div className="bg-[#010101] border border-[#2A2E33] rounded-full px-2.5 py-1 flex items-center gap-1.5 whitespace-nowrap">
          <Image src="/icons/check-circle-icon.svg" alt="Resolved checkmark" width={14} height={14}/>
          <span className="text-gray-400 text-sm">{resolvedCount} resolved incidents</span>
        </div>
      </div>
    </div>
  );
}