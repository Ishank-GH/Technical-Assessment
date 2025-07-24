import IncidentList from "./components/incident-list.js";
import Navbar from "./components/navbar.js";
import IncidentPlayer from "./components/incident-player.js";
import IncidentTimeline from "./components/incident-timeline.js";

async function getIncidents(resolvedStatus) {
  const query = resolvedStatus !== undefined ? `?resolved=${resolvedStatus}` : '';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/incidents${query}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch data`);
  return res.json();
}

export default async function DashboardPage() {
  const [unresolvedIncidents, allIncidents] = await Promise.all([
    getIncidents(false),
    getIncidents(undefined) 
  ]);
  
  const resolvedCount = allIncidents.length - unresolvedIncidents.length;

  return (
    <div className="flex flex-col min-h-screen text-white relative main-container">
      <Navbar />
      <main className="flex flex-col p-8 pt-6 gap-8 z-10">
        <section 
          className="flex gap-8" 
          style={{ height: 'calc(100vh - 76px - 48px)' }}
        >
            <div className="w-7/12 h-full">
              <IncidentPlayer />
            </div>
            <div className="w-5/12 h-full">
              <IncidentList incidents={unresolvedIncidents} resolvedCount={resolvedCount} />
            </div>
        </section>

        <section className="h-[320px]">
          <IncidentTimeline incidents={allIncidents} />
        </section>
      </main>
    </div>
  );
}