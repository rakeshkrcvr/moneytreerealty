import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Building2, Eye, Trash2, X, Plus, Layers, Tags, Search, User, Database, AlertCircle, CheckCircle2
} from "lucide-react";
import { 
  getAllProperties, getAllPropertyTypes, getAllAmenitiesMaster, 
  getAllLeads, createProperty, deleteProperty,
  createPropertyType, deletePropertyType,
  createAmenity, deleteAmenity
} from "../lib/server-functions";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>) => {
    return { tab: (search.tab as string) || "dashboard" };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { tab } = useSearch({ from: "/admin" });
  const navigate = useNavigate({ from: "/admin" });
  
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<any>({ properties: [], types: [], amenities: [], leads: [] });
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "failed">("checking");

  useEffect(() => {
    refreshData();
  }, [tab]);

  async function refreshData() {
    try {
      const [p, t, a, ld] = await Promise.all([
        getAllProperties(),
        getAllPropertyTypes(),
        getAllAmenitiesMaster(),
        getAllLeads()
      ]);
      
      setData({ 
        properties: p || [], 
        types: t || [], 
        amenities: a || [], 
        leads: ld || [] 
      });

      if (p && p.length > 0) setDbStatus("connected");
      else if (p && p.length === 0) setDbStatus("connected"); // Connected but empty
      else setDbStatus("failed");

    } catch (e) {
      console.error(e);
      setDbStatus("failed");
    }
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, count: data.properties.length },
    { id: "manage_property", label: "Properties", icon: Building2, count: data.properties.length },
    { id: "property_types", label: "Types", icon: Layers, count: data.types.length },
    { id: "amenities", label: "Amenities", icon: Tags, count: data.amenities.length },
    { id: "leads", label: "Leads", icon: User, count: data.leads.length },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex font-sans text-slate-800 antialiased overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col p-8 shrink-0 h-screen sticky top-0 z-[100] shadow-xl">
        <div className="flex items-center gap-3 mb-12 px-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg shadow-blue-100">e</div>
           <span className="font-bold text-xl tracking-tight">The Estate</span>
        </div>
        <nav className="flex-1 space-y-1">
           {sidebarItems.map((item) => (
             <button 
               key={item.id} 
               onClick={() => navigate({ search: { tab: item.id } })}
               className={`w-full flex items-center justify-between px-5 py-4 text-[13px] font-bold transition-all rounded-2xl cursor-pointer group ${tab === item.id ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
             >
               <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
               </div>
               {item.count !== undefined && <span className={`px-2 py-0.5 rounded-lg text-[10px] ${tab === item.id ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>{item.count}</span>}
             </button>
           ))}
        </nav>
        
        {/* DB Connection Badge */}
        <div className={`mt-auto p-4 rounded-2xl flex items-center gap-3 border ${dbStatus === "connected" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"}`}>
           {dbStatus === "connected" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
           <div className="text-[10px] font-black uppercase tracking-widest">
              DB: {dbStatus === "connected" ? "SYNCED" : "OFFLINE"}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 h-screen overflow-y-auto relative bg-[#F0F2F5]">
         <header className="flex items-center gap-8 mb-12 sticky top-0 z-50 bg-[#F0F2F5]/80 backdrop-blur-md py-4">
            <div className="flex-1 relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input className="w-full bg-white border border-transparent rounded-2xl pl-16 pr-6 py-5 text-sm focus:outline-none shadow-sm" placeholder="Search Listings..." />
            </div>
            <button onClick={() => setShowAddModal("property")} className="px-8 py-4.5 bg-blue-600 text-white rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all cursor-pointer"><Plus className="w-5 h-5" /> Add Property</button>
         </header>

         <div className="animate-fade-up">
            {tab === "dashboard" && (
              <div className="space-y-12">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="bg-white p-12 rounded-[56px] shadow-sm border border-white group relative overflow-hidden">
                       <p className="text-[11px] uppercase font-black text-slate-300 mb-2 tracking-[0.2em]">Live Listings</p>
                       <p className="text-6xl font-black text-blue-600 tracking-tighter">{data.properties.length}</p>
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all"><Building2 className="w-20 h-20" /></div>
                    </div>
                    <div className="bg-white p-12 rounded-[56px] shadow-sm border border-white group relative overflow-hidden">
                       <p className="text-[11px] uppercase font-black text-slate-300 mb-2 tracking-[0.2em]">Customer Leads</p>
                       <p className="text-6xl font-black text-emerald-500 tracking-tighter">{data.leads.length}</p>
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all"><User className="w-20 h-20" /></div>
                    </div>
                 </div>
                 
                 {data.properties.length === 0 && (
                    <div className="p-16 bg-white rounded-[56px] border-2 border-dashed border-slate-100 text-center">
                       <Database className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                       <h3 className="text-xl font-bold text-slate-400 mb-2">No Data Visible</h3>
                       <p className="text-sm text-slate-400 max-w-sm mx-auto">If Neon shows 50 rows but here is 0, please verify the <b>DATABASE_URL</b> in your <b>.env</b> matches the Neon project.</p>
                       <button onClick={refreshData} className="mt-6 px-8 py-3 bg-slate-50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">Retry Connection</button>
                    </div>
                 )}
              </div>
            )}

            {tab === "manage_property" && (
              <div className="space-y-8">
                 <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Inventory</h2>
                    <button onClick={() => setShowAddModal("property")} className="px-10 py-5 bg-blue-600 text-white rounded-[28px] font-bold shadow-2xl shadow-blue-100 cursor-pointer">+ New Property</button>
                 </div>
                 <div className="bg-white rounded-[56px] p-10 shadow-sm border border-white overflow-hidden">
                    <table className="w-full text-left">
                       <tbody className="divide-y divide-slate-50">
                          {data.properties.map((l: any) => (
                             <tr key={l.slug} className="group hover:bg-slate-50/50">
                                <td className="px-8 py-8 flex items-center gap-5">
                                   <img src={l.img} className="w-16 h-16 rounded-[20px] object-cover shadow-sm" />
                                   <div><p className="font-bold text-slate-800 uppercase">{l.title}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{l.location}</p></div>
                                </td>
                                <td className="px-8 py-8 text-right">
                                   <Link to={`/launches/${l.slug}`} target="_blank" className="p-4 bg-white rounded-2xl text-slate-300 hover:text-blue-600 border border-slate-100 shadow-sm inline-block mr-2"><Eye className="w-5 h-5" /></Link>
                                   <button onClick={() => handleDelete("property", l.slug)} className="p-4 bg-white rounded-2xl text-slate-300 hover:text-red-500 border border-slate-100 shadow-sm cursor-pointer"><Trash2 className="w-5 h-5" /></button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}
         </div>
      </main>

      <style>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.5s ease-out both; }
      `}</style>
    </div>
  );
}
