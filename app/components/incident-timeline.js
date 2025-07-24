import Image from "next/image";

const PILL_HEIGHT_REM = 1.75;
const VERTICAL_GAP_BETWEEN_PILLS = 0.25; 
const ROW_VERTICAL_PADDING = 0.75; 

const TimelinePill = ({ incident, rowIndex, totalRows }) => {
  const getSecondsFromMidnight = (date) =>
    new Date(date).getHours() * 3600 + new Date(date).getMinutes() * 60;
  const startSeconds = getSecondsFromMidnight(incident.tsStart);
  const leftPosition = (startSeconds / 86400) * 100;

  const typeStyles = {
    "Unauthorised Access": "bg-orange-900/80 border-orange-700 text-orange-300",
    "Gun Threat": "bg-red-900/80 border-red-700 text-red-300",
    "Face Recognised": "bg-blue-900/80 border-blue-700 text-blue-300",
    "Traffic Congestion": "bg-green-900/80 border-green-700 text-green-300",
    "Multiple Events": "bg-gray-700/80 border-gray-500 text-gray-300",
  };
  const iconMap = {
    "Unauthorised Access": "/icons/unauthorised-access-icon.svg",
    "Gun Threat": "/icons/gun-threat-icon.svg",
    "Face Recognised": "/icons/face-recognised-icon.svg",
    "Multiple Events": "/icons/multiple-events-icon.svg",
    "Traffic Congestion": "/icons/traffic-congestion-icon.svg",
  };

  const topPosition = `${
    ROW_VERTICAL_PADDING +
    rowIndex * (PILL_HEIGHT_REM + VERTICAL_GAP_BETWEEN_PILLS)
  }rem`;

  return (
    <div
      className={`absolute h-7 rounded-lg border ${
        typeStyles[incident.type] || ""
      } flex items-center px-3 text-xs whitespace-nowrap`}
      style={{
        left: `${leftPosition}%`,
        top: topPosition,
      }}
    >
      <Image
        src={iconMap[incident.type] || ""}
        alt=""
        width={10}
        height={10}
        className="mr-1"
      />
      <span className="font-semibold">{incident.type}</span>
    </div>
  );
};

export default function IncidentTimeline({ incidents }) {
  // Correctly maps database camera IDs to "Camera - 1, 2, 3"
  const cameraIds = [...new Set(incidents.map((i) => i.cameraId))].sort(
    (a, b) => a - b
  );
  const cameraNameMap = new Map(
    cameraIds.map((id, index) => [id, `Camera - ${index + 1}`])
  );

  const incidentsByCamera = incidents.reduce((acc, incident) => {
    const key = incident.cameraId;
    if (!acc[key]) acc[key] = { name: cameraNameMap.get(key), incidents: [] };
    acc[key].incidents.push(incident);
    return acc;
  }, {});

  const processOverlaps = (cameraIncidents) => {
    if (!cameraIncidents) return [];
    const sorted = [...cameraIncidents].sort(
      (a, b) => new Date(a.tsStart) - new Date(b.tsStart)
    );
    const rows = [];
    const rowEndTimes = [];

    sorted.forEach((incident) => {
      let placed = false;
      for (let i = 0; i < rows.length; i++) {
        if (new Date(incident.tsStart) >= rowEndTimes[i]) {
          rows[i].push(incident);
          rowEndTimes[i] = new Date(incident.tsEnd);
          placed = true;
          break;
        }
      }
      if (!placed) {
        rows.push([incident]);
        rowEndTimes.push(new Date(incident.tsEnd));
      }
    });
    return rows;
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Play Controls Component*/}
      <div className="bg-[#131313] border border-gray-700/50 rounded-lg">
        <div className="flex items-center gap-4 text-sm p-4">
          <div className="flex items-center gap-3">
            <button className="hover:opacity-80">
              <Image
                src="/icons/forward.svg"
                alt="Forward"
                width={13}
                height={13}
              />
            </button>
            <button className="hover:opacity-80">
              <Image
                src="/icons/timeline-rewind.svg"
                alt="Rewind"
                width={20}
                height={20}
              />
            </button>
            <button className="hover:opacity-80">
              <Image
                src="/icons/timeline-play.svg"
                alt="Play"
                width={32}
                height={32}
              />
            </button>
            <button className="hover:opacity-80">
              <Image
                src="/icons/timeline-forward.svg"
                alt="Forward"
                width={20}
                height={20}
              />
            </button>
            <button className="hover:opacity-80">
              <Image
                src="/icons/back.svg"
                alt="Forward"
                width={20}
                height={20}
              />
            </button>
          </div>
          <span className="text-gray-400">04:12:37 (15-Jun-2025)</span>
          <span className="text-gray-400">1x</span>
          <button className="hover:opacity-80">
            <Image src="/icons/Icon.svg" alt="Replay" width={20} height={20} />
          </button>
          <div className="flex-1"></div>
        </div>
      </div>

      {/* Timeline Component */}
      <div className="bg-[#131313] border border-gray-700/50 rounded-lg flex-1 flex overflow-hidden">
        {/* Left Column (Camera Names) */}
        <div className="flex flex-col w-40">
          <div className="h-12 flex items-end px-8">
            <p className="font-semibold text-gray-300">Camera List</p>
          </div>
          <div className="flex-1 pt-2">
            {Object.values(incidentsByCamera).map((data) => {
              const numRows = processOverlaps(data.incidents).length || 1;
              // Calculate laneHeight dynamically based on actual pill heights + gaps + padding
              const dynamicLaneHeight = `${
                numRows * PILL_HEIGHT_REM + // Total height of pills
                (numRows - 1) * VERTICAL_GAP_BETWEEN_PILLS + // Total gap between pills
                2 * ROW_VERTICAL_PADDING // Top and bottom padding for the entire row
              }rem`;

              return (
                <div
                  key={data.name}
                  style={{ height: dynamicLaneHeight }}
                  className="flex items-center justify-center hover:bg-gray-800/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/reverted-camera.svg"
                      alt="Camera"
                      width={16}
                      height={16}
                    />
                    <span>{data.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (Timeline) */}
        <div className="flex-1 flex flex-col relative">
          <div className="h-12 flex-shrink-0 relative p-4 pb-2">
            <Image
              src="/images/timeline-ruler.png"
              alt="Timeline Ruler"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1 pt-2 hide-scrollbar ">
            {Object.values(incidentsByCamera).map((data) => {
              const rows = processOverlaps(data.incidents);
              const numRows = rows.length || 1;

              // Calculate laneHeight dynamically as in the left column
              const dynamicLaneHeight = `${
                numRows * PILL_HEIGHT_REM +
                (numRows - 1) * VERTICAL_GAP_BETWEEN_PILLS +
                2 * ROW_VERTICAL_PADDING // Top and bottom padding for the entire row
              }rem`;

              return (
                <div
                  key={data.name}
                  className="relative w-full hover:bg-gray-800/30 transition-colors"
                  style={{ height: dynamicLaneHeight }}
                >
                  {rows.map((row, rowIndex) =>
                    row.map((incident) => (
                      <TimelinePill
                        key={incident.id}
                        incident={incident}
                        rowIndex={rowIndex}
                        totalRows={rows.length}
                      />
                    ))
                  )}
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 left-[25%] h-full w-px bg-yellow-400 z-10">
            <div className="absolute top-[8px] -left-9 w-20 h-5 bg-yellow-400 text-black text-xs font-bold rounded-md flex items-center justify-center">
              04:12:37
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
