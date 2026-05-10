import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Building2, Eye, Trash2, X, Plus, Layers, Tags, Search, User, Database, AlertCircle, CheckCircle2, Settings, FileText
} from "lucide-react";
import { 
  getAllProperties, getAllPropertyTypes, getAllAmenitiesMaster, 
  getAllLeads, createProperty, updateProperty, deleteProperty,
  createPropertyType, updatePropertyType, deletePropertyType, bulkUpdatePropertyTypes,
  createAmenity, updateAmenity, deleteAmenity, uploadImage,
  getSiteSettings, updateSiteSettings,
  getAllDevelopers, createDeveloper, updateDeveloper, deleteDeveloper,
  updateLead,
  getAllBlogs, createBlog, updateBlog, deleteBlog
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
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [floorPlanUrl, setFloorPlanUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isBulkEditing, setIsBulkEditing] = useState(false);
  const [bulkData, setBulkData] = useState<any[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [floorPlans, setFloorPlans] = useState<any[]>([]);
  const [developerLogoUrl, setDeveloperLogoUrl] = useState("");
  const [blogImgUrl, setBlogImgUrl] = useState("");

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const { url } = await uploadImage({ data: { base64, fileName: file.name } });
        setter(url);
        toast.success("Image uploaded!");
      } catch (error) {
        toast.error("Upload failed");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsUploading(true);
    const newUrls: string[] = [];
    
    for (const file of files) {
      const reader = new FileReader();
      const uploadPromise = new Promise<string>((resolve) => {
        reader.onload = async () => {
          const base64 = reader.result as string;
          try {
            const { url } = await uploadImage({ data: { base64, fileName: file.name } });
            resolve(url);
          } catch (error) {
            toast.error(`Failed to upload ${file.name}`);
            resolve("");
          }
        };
      });
      reader.readAsDataURL(file);
      const url = await uploadPromise;
      if (url) newUrls.push(url);
    }
    
    setGalleryUrls(prev => [...prev, ...newUrls]);
    setIsUploading(false);
    toast.success(`${newUrls.length} images added to gallery`);
  }
  const [data, setData] = useState<any>({ properties: [], types: [], amenities: [], leads: [], developers: [], blogs: [], settings: null });
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "failed">("checking");

  useEffect(() => {
    if (editingItem && (editingItem._type === undefined || editingItem._type === 'property')) {
      let parsedGallery = editingItem.gallery;
      if (typeof parsedGallery === 'string') {
        try { parsedGallery = JSON.parse(parsedGallery); } catch(e) { parsedGallery = []; }
      }
      setGalleryUrls(Array.isArray(parsedGallery) ? parsedGallery : []);
      setFloorPlanUrl(editingItem.floor_plan_img || "");
      let parsedAmenities = editingItem.amenities_ids;
      if (typeof parsedAmenities === 'string') {
        try { parsedAmenities = JSON.parse(parsedAmenities); } catch(e) { parsedAmenities = []; }
      }
      setSelectedAmenities(Array.isArray(parsedAmenities) ? parsedAmenities : []);
      
      let parsedFloorPlans = editingItem.floor_plans;
      if (typeof parsedFloorPlans === 'string') {
        try { parsedFloorPlans = JSON.parse(parsedFloorPlans); } catch(e) { parsedFloorPlans = []; }
      }
      setFloorPlans(Array.isArray(parsedFloorPlans) ? parsedFloorPlans : []);
    } else if (editingItem && editingItem._type === 'developer') {
      setDeveloperLogoUrl(editingItem.logo_url || "");
    } else {
      setGalleryUrls([]);
      setFloorPlanUrl("");
      setSelectedAmenities([]);
      setFloorPlans([]);
      setDeveloperLogoUrl("");
    }
  }, [editingItem]);

  useEffect(() => {
    if (showAddModal) {
      setGalleryUrls([]);
      setFloorPlanUrl("");
      setSelectedAmenities([]);
      setFloorPlans([]);
      setDeveloperLogoUrl("");
      setBlogImgUrl("");
    }
  }, [showAddModal]);

  useEffect(() => {
    setSearchTerm("");
    refreshData();
  }, [tab]);

  async function refreshData() {
    try {
      const [p, t, a, ld, s, dev, bl] = await Promise.all([
        getAllProperties(),
        getAllPropertyTypes(),
        getAllAmenitiesMaster(),
        getAllLeads(),
        getSiteSettings(),
        getAllDevelopers(),
        getAllBlogs()
      ]);
      
      setData({ 
        properties: p || [], 
        types: t || [], 
        amenities: a || [], 
        leads: ld || [],
        developers: dev || [],
        blogs: bl || [],
        settings: s || null
      });

      if (p && p.length >= 0) setDbStatus("connected");
      else setDbStatus("failed");

    } catch (e) {
      console.error(e);
      setDbStatus("failed");
    }
  }

  async function handleDelete(type: string, id: any) {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      if (type === "property") await deleteProperty({ data: id });
      else if (type === "type") await deletePropertyType({ data: id });
      else if (type === "amenity") await deleteAmenity({ data: id });
      else if (type === "developer") await deleteDeveloper({ data: id });
      else if (type === "blog") await deleteBlog({ data: id });
      toast.success(`${type} deleted successfully`);
      refreshData();
    } catch (e) {
      toast.error(`Failed to delete ${type}`);
    }
  }

  async function handleAddProperty(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const p = {
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      price: formData.get("price") as string,
      type: formData.get("type") as string,
      category: formData.get("category") as string || 'Residential',
      img: formData.get("img") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      gallery: galleryUrls.length > 0 ? galleryUrls : (formData.get("gallery") as string)?.split(",").map(s => s.trim()).filter(Boolean),
      video_url: formData.get("video_url") as string,
      bedrooms: parseInt(formData.get("bedrooms") as string) || 0,
      bathrooms: parseInt(formData.get("bathrooms") as string) || 0,
      area: formData.get("area") as string,
      floor_number: formData.get("floor_number") as string,
      furnishing: formData.get("furnishing") as string,
      map_location: formData.get("map_location") as string,
      agent_name: formData.get("agent_name") as string,
      agent_phone: formData.get("agent_phone") as string,
      agent_image: formData.get("agent_image") as string,
      floor_plan_img: floorPlanUrl || (formData.get("floor_plan_img") as string) || "",
      amenities_ids: selectedAmenities,
      floor_plans: floorPlans,
      developer_id: formData.get("developer_id") ? parseInt(formData.get("developer_id") as string) : null,
    };
    
    setIsSubmitting(true);
    try {
      await createProperty({ data: p });
      toast.success("Property added!");
      setShowAddModal(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to add property.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setIsSubmitting(true);
    try {
      if (editingItem._type === 'type') {
        await updatePropertyType({ data: { id: editingItem.id, name: formData.get("name") as string, category: formData.get("category") as string, img: formData.get("img") as string } });
        toast.success("Category updated!");
      } else if (editingItem._type === 'amenity') {
        await updateAmenity({ data: { id: editingItem.id, name: formData.get("name") as string, icon: formData.get("icon") as string } });
        toast.success("Amenity updated!");
      } else if (editingItem._type === 'developer') {
        await updateDeveloper({ data: { id: editingItem.id, name: formData.get("name") as string, logo_url: developerLogoUrl || (formData.get("logo_url") as string), about: formData.get("about") as string } });
        toast.success("Developer updated!");
      } else if (editingItem._type === 'blog') {
        await updateBlog({ 
          data: { 
            id: editingItem.id, 
            title: formData.get("title") as string, 
            img: formData.get("img") as string, 
            cat: formData.get("cat") as string, 
            excerpt: formData.get("excerpt") as string, 
            content: formData.get("content") as string, 
            author: formData.get("author") as string 
          } 
        });
        toast.success("Blog updated!");
      } else {
        await updateProperty({
          data: {
            id: editingItem.id,
            title: formData.get("title") as string,
            location: formData.get("location") as string,
            price: formData.get("price") as string,
            type: formData.get("type") as string,
            category: formData.get("category") as string,
            img: formData.get("img") as string,
            description: formData.get("description") as string,
            status: formData.get("status") as string,
            gallery: galleryUrls.length > 0 ? galleryUrls : (formData.get("gallery") as string)?.split(",").map(s => s.trim()).filter(Boolean),
            video_url: formData.get("video_url") as string,
            bedrooms: parseInt(formData.get("bedrooms") as string) || 0,
            bathrooms: parseInt(formData.get("bathrooms") as string) || 0,
            area: formData.get("area") as string,
            floor_number: formData.get("floor_number") as string,
            furnishing: formData.get("furnishing") as string,
            map_location: formData.get("map_location") as string,
            agent_name: formData.get("agent_name") as string,
            agent_phone: formData.get("agent_phone") as string,
            agent_image: formData.get("agent_image") as string,
            floor_plan_img: floorPlanUrl || (formData.get("floor_plan_img") as string) || "",
            amenities_ids: selectedAmenities,
            floor_plans: floorPlans,
            developer_id: formData.get("developer_id") ? parseInt(formData.get("developer_id") as string) : null,
          }
        });
        toast.success("Property updated!");
      }
      setEditingItem(null);
      refreshData();
    } catch (error) {
      toast.error("Update failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAddType(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const img = formData.get("img") as string;
    
    setIsSubmitting(true);
    try {
      await createPropertyType({ data: { name, category, img } });
      toast.success("Property type added!");
      setShowAddModal(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to add type.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAddDeveloper(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const d = {
      name: formData.get("name") as string,
      logo_url: developerLogoUrl || (formData.get("logo_url") as string),
      about: formData.get("about") as string,
    };
    
    setIsSubmitting(true);
    try {
      await createDeveloper({ data: d });
      toast.success("Developer added!");
      setShowAddModal(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to add developer.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAddAmenity(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    
    setIsSubmitting(true);
    try {
      await createAmenity({ data: { name, icon } });
      toast.success("Amenity added!");
      setShowAddModal(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to add amenity.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleAddBlog(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const b = {
      title: formData.get("title") as string,
      img: formData.get("img") as string,
      cat: formData.get("cat") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
    };
    
    setIsSubmitting(true);
    try {
      await createBlog({ data: b });
      toast.success("Blog post added!");
      setShowAddModal(null);
      refreshData();
    } catch (error) {
      toast.error("Failed to add blog.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, count: data.properties.length },
    { id: "manage_property", label: "Properties", icon: Building2, count: data.properties.length },
    { id: "property_types", label: "Types", icon: Layers, count: data.types.length },
    { id: "amenities", label: "Amenities", icon: Tags, count: data.amenities.length },
    { id: "developers", label: "Developers", icon: Building2, count: data.developers.length },
    { id: "blogs", label: "Blogs", icon: FileText, count: data.blogs.length },
    { id: "leads", label: "Leads", icon: User, count: data.leads.length },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  async function handleBulkSave() {
    setIsSubmitting(true);
    try {
      await bulkUpdatePropertyTypes({ data: bulkData });
      toast.success("All categories updated!");
      setIsBulkEditing(false);
      refreshData();
    } catch (e) {
      toast.error("Failed to update categories.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex font-sans text-slate-800 antialiased overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-100 flex flex-col p-6 shrink-0 h-screen sticky top-0 z-[100] shadow-xl">
        <div className="flex items-center gap-3 mb-8 px-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold italic shadow-lg shadow-blue-100">e</div>
           <span className="font-bold text-lg tracking-tight text-slate-900">The Estate</span>
        </div>
        <nav className="flex-1 space-y-1">
           {sidebarItems.map((item) => (
             <button 
               key={item.id} 
               onClick={() => navigate({ search: { tab: item.id } })}
               className={`w-full flex items-center justify-between px-5 py-3.5 text-[13px] font-bold transition-all rounded-2xl cursor-pointer group ${tab === item.id ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
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
      <main className="flex-1 p-8 h-screen overflow-y-auto relative bg-[#F0F2F5]">
         <header className="flex items-center gap-6 mb-8 sticky top-0 z-50 bg-[#F0F2F5]/80 backdrop-blur-md py-2">
            <div className="flex-1 relative">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
               <input 
                 className="w-full bg-white border border-transparent rounded-2xl pl-16 pr-6 py-4.5 text-sm focus:outline-none shadow-sm" 
                 placeholder={`Search ${tab === 'leads' ? 'Leads' : 'Properties'}...`}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            {tab === "manage_property" && (
               <button onClick={() => setShowAddModal("property")} className="px-8 py-4 bg-blue-600 text-white rounded-[22px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"><Plus className="w-5 h-5" /> Add Property</button>
            )}
            {tab === "property_types" && (
               <button onClick={() => setShowAddModal("type")} className="px-8 py-4 bg-blue-600 text-white rounded-[22px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"><Plus className="w-5 h-5" /> Add Type</button>
            )}
            {tab === "amenities" && (
               <button onClick={() => setShowAddModal("amenity")} className="px-8 py-4 bg-blue-600 text-white rounded-[22px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"><Plus className="w-5 h-5" /> Add Amenity</button>
            )}
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
              <div className="space-y-6">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manage Inventory</h2>
                 <div className="bg-white rounded-[40px] p-6 shadow-sm border border-white overflow-hidden">
                    <table className="w-full text-left">
                       <tbody className="divide-y divide-slate-50">
                          {data.properties.filter((l:any) => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.location.toLowerCase().includes(searchTerm.toLowerCase())).map((l: any) => (
                             <tr key={l.slug} className="group hover:bg-slate-50/50">
                                <td className="px-6 py-5 flex items-center gap-5">
                                   <img src={l.img} className="w-14 h-14 rounded-[18px] object-cover shadow-sm" />
                                   <div><p className="font-bold text-slate-800 uppercase text-xs">{l.title}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{l.location}</p></div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="flex flex-col gap-1">
                                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Property Type</span>
                                      <select 
                                        value={l.type} 
                                        onChange={async (e) => {
                                          const newType = e.target.value;
                                          try {
                                            await updateProperty({ data: { ...l, type: newType } });
                                            toast.success("Type updated!");
                                            refreshData();
                                          } catch (err) {
                                            toast.error("Failed to update type");
                                          }
                                        }}
                                        className="bg-slate-50 border-transparent rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 focus:bg-white focus:border-blue-200 transition outline-none cursor-pointer"
                                      >
                                         {data.types.map((t: any) => <option key={t.id} value={t.name}>{t.name}</option>)}
                                      </select>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   <div className="flex flex-col gap-1">
                                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Status</span>
                                      <select 
                                        value={l.status} 
                                        onChange={async (e) => {
                                          const newStatus = e.target.value;
                                          try {
                                            await updateProperty({ data: { ...l, status: newStatus } });
                                            toast.success("Status updated!");
                                            refreshData();
                                          } catch (err) {
                                            toast.error("Failed to update status");
                                          }
                                        }}
                                        className={`bg-slate-50 border-transparent rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider focus:bg-white focus:border-blue-200 transition outline-none cursor-pointer ${l.status === 'Sale' ? 'text-emerald-600' : 'text-amber-600'}`}
                                      >
                                         <option value="Sale">For Sale</option>
                                         <option value="Rent">For Rent</option>
                                      </select>
                                   </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex justify-end gap-2">
                                      <Link to="/property/$slug" params={{ slug: l.slug }} target="_blank" className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-blue-500 border border-slate-100 transition-all hover:border-blue-100 shadow-sm"><Eye className="w-4 h-4" /></Link>
                                      <button onClick={() => setEditingItem(l)} className="px-4 h-10 flex items-center gap-2 bg-white rounded-xl text-slate-200 hover:text-emerald-500 border border-slate-100 transition-all hover:border-emerald-100 shadow-sm font-bold text-[10px] uppercase tracking-widest cursor-pointer">
                                         <Plus className="w-3.5 h-3.5 rotate-45" /> Edit
                                      </button>
                                      <button onClick={() => handleDelete("property", l.slug)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-red-500 border border-slate-100 transition-all hover:border-red-100 shadow-sm cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
            )}

            {tab === "property_types" && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-black">Property Categories</h2>
                   <div className="flex gap-3">
                     <button 
                       onClick={() => {
                         if (isBulkEditing) {
                           handleBulkSave();
                         } else {
                           setBulkData(JSON.parse(JSON.stringify(data.types)));
                           setIsBulkEditing(true);
                         }
                       }} 
                       className={`px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${isBulkEditing ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "bg-white text-slate-600 border border-slate-200"}`}
                     >
                       {isBulkEditing ? (isSubmitting ? "Saving..." : "Save Changes") : "Bulk Edit Mode"}
                     </button>
                     {isBulkEditing && (
                       <button onClick={() => setIsBulkEditing(false)} className="px-6 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest bg-slate-100 text-slate-600">Cancel</button>
                     )}
                   </div>
                 </div>

                 {!isBulkEditing ? (
                   <div className="grid grid-cols-3 gap-5">
                      {data.types.map((t: any) => (
                         <div key={t.id} className="bg-white p-6 rounded-[32px] border border-white shadow-sm flex justify-between items-center group hover:border-emerald-100 transition-all">
                            <div className="flex items-center gap-4">
                               {t.img && <img src={t.img} className="w-10 h-10 rounded-full object-cover border border-slate-100" />}
                               <div>
                                  <p className="font-bold uppercase tracking-widest text-[11px] text-slate-600">{t.name}</p>
                                  <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">{t.category}</p>
                               </div>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => setEditingItem({ ...t, _type: 'type' })} className="px-4 h-9 flex items-center gap-2 bg-white rounded-xl text-slate-200 hover:text-emerald-500 border border-slate-100 transition-all hover:border-emerald-100 shadow-sm font-bold text-[9px] uppercase tracking-widest cursor-pointer">
                                  <Plus className="w-3 h-3 rotate-45" /> Edit
                               </button>
                               <button onClick={() => handleDelete("type", t.id)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-red-500 border border-slate-100 transition-all hover:border-red-100 shadow-sm cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </div>
                      ))}
                   </div>
                 ) : (
                   <div className="bg-white rounded-[32px] border border-white shadow-sm overflow-hidden">
                      <table className="w-full">
                         <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                               <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-400">Category Name</th>
                               <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-400">Category Type</th>
                               <th className="px-8 py-4 text-left text-[9px] font-black uppercase tracking-widest text-slate-400">Cover Image URL</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {bulkData.map((t, idx) => (
                               <tr key={t.id}>
                                  <td className="px-8 py-4">
                                     <input 
                                       value={t.name} 
                                       onChange={(e) => {
                                         const newData = [...bulkData];
                                         newData[idx].name = e.target.value;
                                         setBulkData(newData);
                                       }}
                                       className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 transition" 
                                     />
                                  </td>
                                  <td className="px-8 py-4">
                                     <select 
                                       value={t.category} 
                                       onChange={(e) => {
                                         const newData = [...bulkData];
                                         newData[idx].category = e.target.value;
                                         setBulkData(newData);
                                       }}
                                       className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 transition"
                                     >
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                     </select>
                                  </td>
                                  <td className="px-8 py-4">
                                     <input 
                                       value={t.img} 
                                       onChange={(e) => {
                                         const newData = [...bulkData];
                                         newData[idx].img = e.target.value;
                                         setBulkData(newData);
                                       }}
                                       placeholder="https://..."
                                       className="w-full bg-slate-50 border-transparent rounded-xl px-4 py-2 text-xs font-bold focus:bg-white focus:border-blue-500 transition" 
                                     />
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                 )}
              </div>
            )}

            {tab === "amenities" && (
              <div className="space-y-6">
                 <h2 className="text-2xl font-black">Master Amenities</h2>
                 <div className="grid grid-cols-4 gap-5">
                    {data.amenities.map((a: any) => (
                       <div key={a.id} className="bg-white p-6 rounded-[32px] border border-white shadow-sm flex justify-between items-center group hover:border-emerald-100 transition-all">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                {a.icon ? (
                                   <img src={a.icon} className="w-4 h-4 object-contain opacity-60" />
                                ) : (
                                   <Tags className="w-4 h-4 text-slate-300" />
                                )}
                             </div>
                             <p className="font-bold uppercase tracking-widest text-[10px] text-slate-500">{a.name}</p>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => setEditingItem({ ...a, _type: 'amenity' })} className="px-4 h-9 flex items-center gap-2 bg-white rounded-xl text-slate-200 hover:text-emerald-500 border border-slate-100 transition-all hover:border-emerald-100 shadow-sm font-bold text-[9px] uppercase tracking-widest cursor-pointer">
                                <Plus className="w-3 h-3 rotate-45" /> Edit
                             </button>
                             <button onClick={() => handleDelete("amenity", a.id)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-red-500 border border-slate-100 transition-all hover:border-red-100 shadow-sm cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {tab === "developers" && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black">Developers</h2>
                    <button onClick={() => setShowAddModal("developer")} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition shadow-sm">Add Developer</button>
                 </div>
                 <div className="grid grid-cols-3 gap-5">
                    {data.developers.map((d: any) => (
                       <div key={d.id} className="bg-white p-6 rounded-[32px] border border-white shadow-sm flex flex-col gap-4 group hover:border-blue-100 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors overflow-hidden">
                                {d.logo_url ? (
                                   <img src={d.logo_url} className="w-full h-full object-contain" />
                                ) : (
                                   <Building2 className="w-6 h-6 text-slate-300" />
                                )}
                             </div>
                             <div>
                                <p className="font-bold uppercase tracking-widest text-[11px] text-slate-600">{d.name}</p>
                                <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Developer</p>
                             </div>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-3 leading-relaxed">{d.about}</p>
                          <div className="flex gap-2 mt-auto">
                             <button onClick={() => setEditingItem({ ...d, _type: 'developer' })} className="flex-1 px-4 h-9 flex items-center justify-center gap-2 bg-white rounded-xl text-slate-200 hover:text-blue-500 border border-slate-100 transition-all hover:border-blue-100 shadow-sm font-bold text-[9px] uppercase tracking-widest cursor-pointer">
                                <Plus className="w-3 h-3 rotate-45" /> Edit
                             </button>
                             <button onClick={() => handleDelete("developer", d.id)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-red-500 border border-slate-100 transition-all hover:border-red-100 shadow-sm cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {tab === "blogs" && (
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black">Blog Posts</h2>
                    <button onClick={() => setShowAddModal("blog")} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm">Add New Post</button>
                 </div>
                 <div className="grid grid-cols-3 gap-5">
                    {data.blogs.map((b: any) => (
                       <div key={b.id} className="bg-white p-6 rounded-[32px] border border-white shadow-sm flex flex-col gap-4 group hover:border-indigo-100 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors overflow-hidden">
                                {b.img ? (
                                   <img src={b.img} className="w-full h-full object-cover" />
                                ) : (
                                   <FileText className="w-6 h-6 text-slate-300" />
                                )}
                             </div>
                             <div>
                                <p className="font-bold uppercase tracking-widest text-[11px] text-slate-600 line-clamp-1">{b.title}</p>
                                <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">{b.cat || 'News'}</p>
                             </div>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                          <div className="flex gap-2 mt-auto">
                             <button onClick={() => setEditingItem({ ...b, _type: 'blog' })} className="flex-1 px-4 h-9 flex items-center justify-center gap-2 bg-white rounded-xl text-slate-200 hover:text-indigo-500 border border-slate-100 transition-all hover:border-indigo-100 shadow-sm font-bold text-[9px] uppercase tracking-widest cursor-pointer">
                                <Plus className="w-3 h-3 rotate-45" /> Edit
                             </button>
                             <button onClick={() => handleDelete("blog", b.id)} className="w-9 h-9 flex items-center justify-center bg-white rounded-xl text-slate-200 hover:text-red-500 border border-slate-100 transition-all hover:border-red-100 shadow-sm cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {tab === "leads" && (
              <div className="space-y-8">
                 <h2 className="text-3xl font-black">Customer Enquiries</h2>
                 <table className="w-full text-left bg-white rounded-3xl overflow-hidden shadow-sm">
                  <thead className="bg-[#FAF9F6] text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                     <tr>
                        <th className="px-8 py-5">Customer</th>
                        <th className="px-8 py-5">Contact</th>
                        <th className="px-8 py-5">Interest</th>
                        <th className="px-8 py-5">Remark</th>
                        <th className="px-8 py-5">Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {data.leads.length === 0 && (
                        <tr>
                           <td colSpan={5} className="px-8 py-10 text-center text-slate-400 text-sm italic">No enquiries received yet.</td>
                        </tr>
                     )}
                     {data.leads.filter((ld:any) => ld.name.toLowerCase().includes(searchTerm.toLowerCase()) || ld.email.toLowerCase().includes(searchTerm.toLowerCase()) || ld.property_slug?.toLowerCase().includes(searchTerm.toLowerCase())).map((ld: any) => (
                        <tr key={ld.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-8 py-5">
                              <p className="font-bold text-slate-800 text-sm">{ld.name}</p>
                              {ld.property_slug && <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] uppercase tracking-wider rounded font-bold mt-1">{ld.property_slug}</span>}
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-sm text-slate-600">{ld.email}</p>
                              <p className="text-sm font-medium text-slate-800">{ld.phone}</p>
                           </td>
                           <td className="px-8 py-5 text-sm text-slate-600 max-w-xs truncate">
                              {ld.message || "-"}
                           </td>
                           <td className="px-8 py-5 text-sm text-slate-600 max-w-xs">
                              <input 
                                defaultValue={ld.remark || ""} 
                                onBlur={async (e) => {
                                  const newRemark = e.target.value;
                                  if (newRemark === ld.remark) return;
                                  try {
                                    await updateLead({ data: { id: ld.id, remark: newRemark } });
                                    toast.success("Remark updated!");
                                    refreshData();
                                  } catch (err) {
                                    toast.error("Failed to update remark");
                                  }
                                }}
                                className="w-full bg-slate-50 border-transparent rounded-lg px-3 py-1.5 text-xs focus:bg-white focus:border-blue-200 transition"
                                placeholder="Add remark..."
                              />
                           </td>
                           <td className="px-8 py-5 text-xs text-slate-400 font-medium tracking-wider">
                              {new Date(ld.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
              </div>
            )}

            {tab === "settings" && (
            <div className="space-y-6 max-w-3xl">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Website Settings</h2>
               <div className="bg-white rounded-[40px] p-10 shadow-sm border border-white">
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const formData = new FormData(e.currentTarget);
                    try {
                      await updateSiteSettings({
                        data: {
                          logo_url: formData.get("logo_url") as string,
                          theme_color: formData.get("theme_color") as string,
                          email: formData.get("email") as string,
                          phone: formData.get("phone") as string,
                          whatsapp: formData.get("whatsapp") as string,
                        }
                      });
                      toast.success("Settings updated globally!");
                      refreshData();
                    } catch (error) {
                      toast.error("Failed to update settings.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Website Logo</label>
                           <div className="flex items-center gap-4">
                              <div className="relative flex-1">
                                 <input type="file" accept="image/*" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = async () => {
                                       try {
                                          const { url } = await uploadImage({ data: { base64: reader.result as string, fileName: file.name } });
                                          const logoInput = document.getElementById("settings_logo_input") as HTMLInputElement;
                                          if (logoInput) logoInput.value = url;
                                          const logoPreview = document.getElementById("settings_logo_preview") as HTMLImageElement;
                                          if (logoPreview) {
                                            logoPreview.src = url;
                                            logoPreview.style.display = 'block';
                                          }
                                          toast.success("Logo uploaded successfully!");
                                       } catch (error) { 
                                          toast.error("Upload failed"); 
                                       }
                                    };
                                    reader.readAsDataURL(file);
                                 }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                 <div className="w-full bg-slate-50 hover:bg-slate-100 border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-slate-600 transition outline-none text-center cursor-pointer">
                                    Upload Image
                                 </div>
                              </div>
                              <input type="hidden" name="logo_url" id="settings_logo_input" defaultValue={data.settings?.logo_url || ""} />
                              <img id="settings_logo_preview" src={data.settings?.logo_url || ""} className="h-14 w-auto rounded border border-slate-200 bg-white object-contain" style={{ display: data.settings?.logo_url ? 'block' : 'none' }} />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Theme Color (Hex)</label>
                           <div className="flex gap-4">
                              <input type="color" name="theme_color" defaultValue={data.settings?.theme_color || "#a58e58"} className="h-14 w-14 rounded-2xl cursor-pointer border-0 bg-transparent p-0" />
                              <input type="text" defaultValue={data.settings?.theme_color || "#a58e58"} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition outline-none uppercase font-mono" readOnly />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Support Email</label>
                           <input name="email" defaultValue={data.settings?.email || ""} placeholder="info@goldendoorrealty.com" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Display Phone Number</label>
                           <input name="phone" defaultValue={data.settings?.phone || ""} placeholder="+971 50 123 4567" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition outline-none" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">WhatsApp Number (No +)</label>
                           <input name="whatsapp" defaultValue={data.settings?.whatsapp || ""} placeholder="971501234567" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition outline-none" />
                        </div>
                     </div>
                     <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-blue-600 text-white rounded-[22px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all disabled:opacity-50">
                        {isSubmitting ? "Saving..." : "Save Settings"}
                     </button>
                  </form>
               </div>
            </div>
          )}

         </div>
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Edit {editingItem._type === 'type' ? 'Category' : editingItem._type === 'amenity' ? 'Amenity' : 'Listing'}</h3>
                 <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleUpdate} className="p-10 space-y-6 max-h-[85vh] overflow-y-auto">
                  {editingItem._type === 'property' || !editingItem._type ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
                          <input name="title" defaultValue={editingItem.title} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                          <input name="location" defaultValue={editingItem.location} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price</label>
                          <input name="price" defaultValue={editingItem.price} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type</label>
                          <select name="type" defaultValue={editingItem.type} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                             {data.types.map((t: any) => <option key={t.id} value={t.name}>{t.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                          <select name="status" defaultValue={editingItem.status || 'Sale'} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                             <option value="Sale">For Sale</option>
                             <option value="Rent">For Rent</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Beds</label>
                          <input type="number" name="bedrooms" defaultValue={editingItem.bedrooms} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Baths</label>
                          <input type="number" name="bathrooms" defaultValue={editingItem.bathrooms} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area (sqft)</label>
                          <input name="area" defaultValue={editingItem.area} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Furnishing</label>
                          <select name="furnishing" defaultValue={editingItem.furnishing} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                             <option value="Unfurnished">Unfurnished</option>
                             <option value="Furnished">Furnished</option>
                             <option value="Semi-Furnished">Semi-Furnished</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                          <select name="category" defaultValue={editingItem.category || 'Residential'} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                             <option value="Residential">Residential</option>
                             <option value="Commercial">Commercial</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Developer</label>
                           <select name="developer_id" defaultValue={editingItem.developer_id || ""} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                              <option value="">No Developer</option>
                              {data.developers.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                           </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Featured Image URL</label>
                        <input name="img" defaultValue={editingItem.img} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                      </div>

                      <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Property Gallery</h4>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                           {galleryUrls.map((url, i) => (
                              <div key={url} className="aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm relative group">
                                 <img src={url} className="w-full h-full object-cover" />
                                 <button 
                                   type="button"
                                   onClick={() => setGalleryUrls(prev => prev.filter((_, idx) => idx !== i))}
                                   className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    <Trash2 className="w-3 h-3" />
                                 </button>
                              </div>
                           ))}
                           <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-400 relative">
                              <Plus className="w-6 h-6 mb-1" />
                              <span className="text-[8px] font-bold uppercase tracking-widest">Add Images</span>
                              <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                onChange={handleGalleryUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                              />
                           </div>
                        </div>
                        <p className="text-[9px] text-slate-400 uppercase tracking-widest text-center">Manage your property listing gallery images.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Video / Virtual Tour URL</label>
                          <input name="video_url" defaultValue={editingItem.video_url} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Map Location URL</label>
                          <input name="map_location" defaultValue={editingItem.map_location} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                        <textarea name="description" defaultValue={editingItem.description} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-32" />
                      </div>

                      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Select Amenities</h4>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{(Array.isArray(selectedAmenities) ? selectedAmenities : []).length} Selected</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto pr-4">
                           {(data.amenities || []).map((amenity: any) => {
                              if (!amenity) return null;
                              const idStr = amenity.id?.toString() || "";
                              const isSelected = (Array.isArray(selectedAmenities) ? selectedAmenities : []).includes(idStr) || (Array.isArray(selectedAmenities) ? selectedAmenities : []).includes(amenity.id);
                              return (
                              <label key={amenity.id || Math.random()} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                                 <input 
                                   type="checkbox" 
                                   className="hidden"
                                   checked={isSelected}
                                   onChange={(e) => {
                                      const id = amenity.id?.toString();
                                      if (!id) return;
                                      if (e.target.checked) {
                                         setSelectedAmenities(prev => Array.isArray(prev) ? [...prev, id] : [id]);
                                      } else {
                                         setSelectedAmenities(prev => Array.isArray(prev) ? prev.filter(x => x?.toString() !== id) : []);
                                      }
                                   }}
                                 />
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                    <CheckCircle2 className="w-4 h-4" />
                                 </div>
                                 <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>{amenity.name}</span>
                              </label>
                           )})}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Floor Plan Image</h4>
                        <div className="flex items-center gap-6">
                           {editingItem.floor_plan_img || floorPlanUrl ? (
                              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white shrink-0">
                                 <img src={floorPlanUrl || editingItem.floor_plan_img} className="w-full h-full object-contain" />
                              </div>
                           ) : (
                              <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 shrink-0">
                                 <Layers className="w-8 h-8" />
                              </div>
                           )}
                           <div className="flex-1 space-y-4">
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">Select a high-resolution image for the floor plan. PNG or JPG recommended.</p>
                              <div className="relative">
                                 <input 
                                   type="file" 
                                   accept="image/*" 
                                   onChange={(e) => handleFileSelect(e, setFloorPlanUrl)}
                                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                 />
                                 <div className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center flex items-center justify-center gap-2">
                                    {isUploading ? "Uploading..." : "Select File"}
                                 </div>
                              </div>
                              <input type="hidden" name="floor_plan_img" value={floorPlanUrl || editingItem.floor_plan_img || ""} />
                           </div>
                        </div>
                      </div>

                      {/* Dynamic Floor Plans UI (Edit Modal) */}
                      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Dynamic Floor Plans</h4>
                          <button type="button" onClick={() => setFloorPlans(prev => [...prev, { id: Date.now(), type: '1 BHK Apartment', bedrooms: 1, bathrooms: 1, size: '800', price: '₹ 1.5 M', img: '' }])} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">
                            + Add Plan
                          </button>
                        </div>
                        <div className="space-y-4">
                           {floorPlans.map((plan, i) => (
                              <div key={plan.id || i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 relative">
                                 <button type="button" onClick={() => setFloorPlans(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <input value={plan.type} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].type = e.target.value; setFloorPlans(newPlans); }} placeholder="e.g. 2 BHK Apartment" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                    <input value={plan.price} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].price = e.target.value; setFloorPlans(newPlans); }} placeholder="e.g. ₹ 3.3 M" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                    <input value={plan.size} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].size = e.target.value; setFloorPlans(newPlans); }} placeholder="Size (e.g. 1200 sq ft)" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                    <div className="flex gap-2">
                                       <input type="number" value={plan.bedrooms} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].bedrooms = Number(e.target.value); setFloorPlans(newPlans); }} placeholder="Beds" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                       <input type="number" value={plan.bathrooms} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].bathrooms = Number(e.target.value); setFloorPlans(newPlans); }} placeholder="Baths" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div className="relative flex-1">
                                       <input type="file" accept="image/*" onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          const newPlansStart = [...floorPlans];
                                          newPlansStart[i].isUploading = true;
                                          setFloorPlans(newPlansStart);
                                          
                                          const reader = new FileReader();
                                          reader.onload = async () => {
                                             const base64 = reader.result as string;
                                             try {
                                                const { url } = await uploadImage({ data: { base64, fileName: file.name } });
                                                const newPlans = [...floorPlans];
                                                newPlans[i].img = url;
                                                newPlans[i].isUploading = false;
                                                setFloorPlans(newPlans);
                                                toast.success("Floor plan image uploaded!");
                                             } catch (error) { 
                                                const newPlans = [...floorPlans];
                                                newPlans[i].isUploading = false;
                                                setFloorPlans(newPlans);
                                                toast.error("Upload failed"); 
                                             }
                                          };
                                          reader.readAsDataURL(file);
                                       }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                       <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                                          {plan.isUploading ? "Uploading..." : (plan.img ? "Change Image" : "Upload Image")}
                                       </div>
                                    </div>
                                    {plan.img && <div className="w-10 h-10 rounded overflow-hidden border border-slate-200 shrink-0 bg-white"><img src={plan.img} className="w-full h-full object-cover" /></div>}
                                 </div>
                              </div>
                           ))}
                           {floorPlans.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No dynamic floor plans added yet.</p>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Name</label>
                      <input name="name" defaultValue={editingItem.name} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                      {editingItem._type === 'type' && (
                        <>
                          <div className="mt-4 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                             <select name="category" defaultValue={editingItem.category || 'Residential'} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                             </select>
                          </div>
                          <div className="mt-4 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                             <input name="img" defaultValue={editingItem.img} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                          </div>
                        </>
                      )}
                      {editingItem._type === 'developer' && (
                        <>
                          <div className="mt-4 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Developer Logo</label>
                             <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                                   {developerLogoUrl || editingItem.logo_url ? (
                                      <img src={developerLogoUrl || editingItem.logo_url} className="w-full h-full object-contain" />
                                   ) : (
                                      <Building2 className="w-6 h-6 text-slate-300" />
                                   )}
                                </div>
                                <div className="flex-1 relative">
                                   <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => handleFileSelect(e, setDeveloperLogoUrl)} 
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                   />
                                   <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                                      {isUploading ? "Uploading..." : "Upload Logo"}
                                   </div>
                                </div>
                             </div>
                             <input type="hidden" name="logo_url" value={developerLogoUrl || editingItem.logo_url} />
                          </div>
                          <div className="mt-4 space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">About Us</label>
                             <textarea name="about" defaultValue={editingItem.about} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-32" />
                          </div>
                        </>
                      )}
                      {editingItem._type === 'amenity' && (
                        <div className="mt-4 space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Font Awesome Class</label>
                           <input name="icon" defaultValue={editingItem.icon} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="e.g. fas fa-swimmer" />
                        </div>
                      )}
                      {editingItem._type === 'blog' && (
                        <div className="space-y-6">
                           <div className="mt-4 space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
                              <input name="title" defaultValue={editingItem.title} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                           </div>
                           <div className="grid grid-cols-2 gap-4 mt-4">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                <input name="cat" defaultValue={editingItem.cat} required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Author</label>
                                <input name="author" defaultValue={editingItem.author || 'Admin'} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                             </div>
                           </div>
                           <div className="mt-4 space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Featured Image</label>
                              <div className="flex items-center gap-4">
                                 <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                                    {blogImgUrl || editingItem.img ? (
                                       <img src={blogImgUrl || editingItem.img} className="w-full h-full object-cover" />
                                    ) : (
                                       <FileText className="w-6 h-6 text-slate-300" />
                                    )}
                                 </div>
                                 <div className="flex-1 relative">
                                    <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setBlogImgUrl)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                                       {isUploading ? "Uploading..." : "Change Image"}
                                    </div>
                                 </div>
                              </div>
                              <input type="hidden" name="img" value={blogImgUrl || editingItem.img} />
                           </div>
                           <div className="mt-4 space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Excerpt</label>
                              <textarea name="excerpt" defaultValue={editingItem.excerpt} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-20" />
                           </div>
                           <div className="mt-4 space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Content</label>
                              <textarea name="content" defaultValue={editingItem.content} className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-40" />
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                 <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all">
                    {isSubmitting ? "Updating..." : "Save Changes"}
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Modals */}
      {showAddModal === "property" && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Add New Listing</h3>
                 <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddProperty} className="p-10 space-y-6 max-h-[85vh] overflow-y-auto">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
                       <input name="title" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Burj Crown Apartments" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                       <input name="location" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Downtown Dubai" />
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price</label>
                       <input name="price" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="₹ 1.2M" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type</label>
                       <select name="type" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                          {data.types.map((t: any) => <option key={t.id} value={t.name}>{t.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                       <select name="status" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                          <option value="Sale">For Sale</option>
                          <option value="Rent">For Rent</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Beds</label>
                       <input type="number" name="bedrooms" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Baths</label>
                       <input type="number" name="bathrooms" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area (sqft)</label>
                       <input name="area" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Furnishing</label>
                       <select name="furnishing" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                          <option value="Unfurnished">Unfurnished</option>
                          <option value="Furnished">Furnished</option>
                          <option value="Semi-Furnished">Semi-Furnished</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Featured Image URL</label>
                    <input name="img" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="https://..." />
                 </div>

                 <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Property Gallery</h4>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                       {galleryUrls.map((url, i) => (
                          <div key={url} className="aspect-square rounded-xl overflow-hidden border-2 border-white shadow-sm relative group">
                             <img src={url} className="w-full h-full object-cover" />
                             <button 
                               type="button"
                               onClick={() => setGalleryUrls(prev => prev.filter((_, idx) => idx !== i))}
                               className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <Trash2 className="w-3 h-3" />
                             </button>
                          </div>
                       ))}
                       <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-400 relative">
                          <Plus className="w-6 h-6 mb-1" />
                          <span className="text-[8px] font-bold uppercase tracking-widest">Add Images</span>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            onChange={handleGalleryUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                          />
                       </div>
                    </div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest text-center">Select multiple images for the property gallery.</p>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Video / Virtual Tour URL</label>
                       <input name="video_url" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Map Location URL</label>
                       <input name="map_location" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" />
                    </div>
                 </div>

                 <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                     <textarea name="description" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-32" placeholder="Describe the property..." />
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Select Amenities</h4>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{(Array.isArray(selectedAmenities) ? selectedAmenities : []).length} Selected</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto pr-4">
                       {(data.amenities || []).map((amenity: any) => {
                          if (!amenity) return null;
                          const idStr = amenity.id?.toString() || "";
                          const isSelected = (Array.isArray(selectedAmenities) ? selectedAmenities : []).includes(idStr) || (Array.isArray(selectedAmenities) ? selectedAmenities : []).includes(amenity.id);
                          return (
                          <label key={amenity.id || Math.random()} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                             <input 
                               type="checkbox" 
                               className="hidden"
                               checked={isSelected}
                               onChange={(e) => {
                                  const id = amenity.id?.toString();
                                  if (!id) return;
                                  if (e.target.checked) {
                                     setSelectedAmenities(prev => Array.isArray(prev) ? [...prev, id] : [id]);
                                  } else {
                                     setSelectedAmenities(prev => Array.isArray(prev) ? prev.filter(x => x?.toString() !== id) : []);
                                  }
                               }}
                             />
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                <CheckCircle2 className="w-4 h-4" />
                             </div>
                             <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>{amenity.name}</span>
                          </label>
                       )})}
                    </div>
                  </div>

                 <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Floor Plan Image</h4>
                    <div className="flex items-center gap-6">
                       {floorPlanUrl ? (
                          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white shrink-0">
                             <img src={floorPlanUrl} className="w-full h-full object-contain" />
                          </div>
                       ) : (
                          <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 shrink-0">
                             <Layers className="w-8 h-8" />
                          </div>
                       )}
                       <div className="flex-1 space-y-4">
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">Upload the property floor plan layout image.</p>
                          <div className="relative">
                             <input 
                               type="file" 
                               accept="image/*" 
                               onChange={(e) => handleFileSelect(e, setFloorPlanUrl)}
                               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                             />
                             <div className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center flex items-center justify-center gap-2">
                                {isUploading ? "Uploading..." : "Upload Floor Plan"}
                             </div>
                          </div>
                          <input type="hidden" name="floor_plan_img" value={floorPlanUrl} />
                       </div>
                    </div>
                 </div>

                 {/* Dynamic Floor Plans UI (Add Modal) */}
                 <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                   <div className="flex items-center justify-between">
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Dynamic Floor Plans</h4>
                     <button type="button" onClick={() => setFloorPlans(prev => [...prev, { id: Date.now(), type: '1 BHK Apartment', bedrooms: 1, bathrooms: 1, size: '800', price: '₹ 1.5 M', img: '' }])} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition">
                       + Add Plan
                     </button>
                   </div>
                   <div className="space-y-4">
                      {floorPlans.map((plan, i) => (
                         <div key={plan.id || i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 relative">
                            <button type="button" onClick={() => setFloorPlans(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-500 hover:text-red-600"><X className="w-4 h-4" /></button>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               <input value={plan.type} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].type = e.target.value; setFloorPlans(newPlans); }} placeholder="e.g. 2 BHK Apartment" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                               <input value={plan.price} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].price = e.target.value; setFloorPlans(newPlans); }} placeholder="e.g. ₹ 3.3 M" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                               <input value={plan.size} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].size = e.target.value; setFloorPlans(newPlans); }} placeholder="Size (e.g. 1200 sq ft)" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                               <div className="flex gap-2">
                                  <input type="number" value={plan.bedrooms} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].bedrooms = Number(e.target.value); setFloorPlans(newPlans); }} placeholder="Beds" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                                  <input type="number" value={plan.bathrooms} onChange={e => { const newPlans = [...floorPlans]; newPlans[i].bathrooms = Number(e.target.value); setFloorPlans(newPlans); }} placeholder="Baths" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs focus:border-blue-600 outline-none" />
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <input type="file" accept="image/*" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const reader = new FileReader();
                                  reader.onload = async () => {
                                     const base64 = reader.result as string;
                                     try {
                                        const { url } = await uploadImage({ data: { base64, fileName: file.name } });
                                        const newPlans = [...floorPlans];
                                        newPlans[i].img = url;
                                        setFloorPlans(newPlans);
                                        toast.success("Floor plan image uploaded!");
                                     } catch (error) { toast.error("Upload failed"); }
                                  };
                                  reader.readAsDataURL(file);
                               }} className="text-xs" />
                               {plan.img && <img src={plan.img} className="h-10 w-auto rounded border" />}
                            </div>
                         </div>
                      ))}
                      {floorPlans.length === 0 && <p className="text-xs text-slate-400 text-center py-4">No dynamic floor plans added yet.</p>}
                   </div>
                 </div>

                 <button type="submit" disabled={isSubmitting || isUploading} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all disabled:opacity-50">
                    {isSubmitting ? "Adding Property..." : "Add Property"}
                 </button>
              </form>
           </div>
        </div>
      )}

      {showAddModal === "type" && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Add Property Type</h3>
                 <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddType} className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Name</label>
                    <input name="name" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Apartments" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                    <select name="category" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition">
                       <option value="Residential">Residential</option>
                       <option value="Commercial">Commercial</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                    <input name="img" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="https://..." />
                 </div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all">
                    {isSubmitting ? "Saving..." : "Add Category"}
                 </button>
              </form>
           </div>
        </div>
      )}

      {showAddModal === "amenity" && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Add Master Amenity</h3>
                 <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddAmenity} className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Amenity Name</label>
                    <input name="name" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Infinity Pool" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Font Awesome Class</label>
                    <input name="icon" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="e.g. fas fa-swimmer" />
                 </div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all">
                    {isSubmitting ? "Saving..." : "Add Amenity"}
                 </button>
              </form>
           </div>
        </div>
      )}

      {showAddModal === "developer" && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-fade-up">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Add New Developer</h3>
                 <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddDeveloper} className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Developer Name</label>
                    <input name="name" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Godrej Properties" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Developer Logo</label>
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                          {developerLogoUrl ? (
                             <img src={developerLogoUrl} className="w-full h-full object-contain" />
                          ) : (
                             <Building2 className="w-6 h-6 text-slate-300" />
                          )}
                       </div>
                       <div className="flex-1 relative">
                          <input 
                             type="file" 
                             accept="image/*" 
                             onChange={(e) => handleFileSelect(e, setDeveloperLogoUrl)} 
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          />
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                             {isUploading ? "Uploading..." : "Upload Logo"}
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">About Us</label>
                    <textarea name="about" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-32" placeholder="Tell us about the developer..." />
                 </div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-blue-100 hover:scale-[1.01] transition-all">
                    {isSubmitting ? "Saving..." : "Add Developer"}
                 </button>
              </form>
           </div>
        </div>
      )}

      {showAddModal === "blog" && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6 overflow-y-auto">
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-fade-up my-auto">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-black">Add New Blog Post</h3>
                 <button onClick={() => setShowAddModal(null)} className="p-2 hover:bg-slate-50 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddBlog} className="p-10 space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</label>
                       <input name="title" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Market Trends 2026" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                       <input name="cat" required className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition" placeholder="Real Estate" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Featured Image</label>
                    <div className="flex items-center gap-4">
                       <div className="w-20 h-20 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                          {blogImgUrl ? (
                             <img src={blogImgUrl} className="w-full h-full object-cover" />
                          ) : (
                             <FileText className="w-6 h-6 text-slate-300" />
                          )}
                       </div>
                       <div className="flex-1 relative">
                          <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, setBlogImgUrl)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-600 text-center">
                             {isUploading ? "Uploading..." : "Upload Image"}
                          </div>
                          <input type="hidden" name="img" value={blogImgUrl} />
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Excerpt</label>
                    <textarea name="excerpt" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-20" placeholder="Brief summary of the post..." />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Content (HTML Supported)</label>
                    <textarea name="content" className="w-full bg-slate-50 border-transparent rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-blue-600 transition h-40" placeholder="Write your post here..." />
                 </div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-bold text-sm shadow-xl shadow-indigo-100 hover:scale-[1.01] transition-all">
                    {isSubmitting ? "Publish Post" : "Add Blog Post"}
                 </button>
              </form>
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 0.5s ease-out both; }
      `}</style>
    </div>
  );
}
