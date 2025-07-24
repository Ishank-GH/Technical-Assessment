import Image from 'next/image';

const thumbFeeds = [
    { name: 'Camera - 01', src: '/images/thumb2.png' }, 
    { name: 'Camera - 02', src: '/images/thumb3.png' },
];

export default function IncidentPlayer() {
  return (
    <div className="flex flex-col h-full bg-black rounded-lg relative overflow-hidden">
      {/* --- Main CCTV Feed --- */}
      <div className="flex-1 w-full h-full">
        <Image src="/images/main-feed.png" alt="Main CCTV feed" layout="fill" objectFit="cover"/>
      </div>
        
      {/* --- Main Feed Overlays --- */}
      <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 text-sm rounded-md flex items-center gap-2">
         <Image src="/icons/calendar-icon.svg" alt="Calendar" width={14} height={14} />
         <p className="text-xs">11/7/2025 - 03:12:37</p>
      </div>
      <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 text-sm rounded-md flex items-center gap-2">
         <Image src="/icons/camera-red-dot-icon.svg" alt="Camera" width={14} height={14} />
         <p className="font-semibold">CAMERA - 01</p>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-4">
        {thumbFeeds.map((feed) => (
          // Container for a single thumbnail
          <div key={feed.name} className="w-[180px] h-[120px] bg-[#0D1117] rounded-lg overflow-hidden border-2 border-gray-700/50 flex flex-col cursor-pointer hover:border-yellow-400 transition-colors">
             {/* Thumbnail Header */}
             <div className="flex items-center justify-between p-2 bg-black/50">
                <p className="text-white text-sm font-semibold">{feed.name}</p>
                <button className="hover:opacity-80">
                  <Image 
                    src="/icons/dots-vertical-icon.svg" 
                    alt="Options" 
                    width={7} 
                    height={7}
                  />
                </button>
             </div>
             {/* Thumbnail Image */}
             <div className="flex-1 relative">
                <Image 
                  src={feed.src} 
                  alt={feed.name} 
                  layout="fill" 
                  objectFit="cover"
                />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}