import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  MapPin, BedDouble, Building2, Compass, User, Star, ArrowRight,
  Search, SlidersHorizontal, LayoutGrid, List, Images, X, ChevronLeft, ChevronRight
} from "lucide-react";
import { getLaunchBySlug, getAllLaunches, getAllCommunities, createLead, getAllAmenitiesMaster, getAllPropertyTypes } from "@/lib/server-functions";
import { toast } from "sonner";
import { useState, useMemo, useEffect } from "react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

const filters = {
  purpose: ["Buy", "Rent", "Commercial", "Plots & Land"],
  buy: ["Apartments", "Villas", "Independent Houses", "Builder Floors", "Studio Apartments", "Luxury Homes"],
  rent: ["Apartments", "PG / Hostel", "Villas", "Office Spaces", "Shops"],
  commercial: ["Office Space", "Retail Shops", "Warehouses", "Showrooms", "Co-working Spaces"],
  plots: ["Residential Plots", "Commercial Plots", "Agricultural Land"],
  tags: ["New Launch", "Ready To Move", "Luxury Projects", "Affordable Housing", "RERA Approved", "Verified"]
};

// Icon Map for Dynamic Amenities (fallback only, FontAwesome is primary)
export const Route = createFileRoute("/property/$slug")({
  loader: async ({ params }) => {
    const [l, allL, allAmenities, allPropertyTypes] = await Promise.all([
      getLaunchBySlug({ data: params.slug }),
      getAllLaunches(),
      getAllAmenitiesMaster(),
      getAllPropertyTypes()
    ]);

    // If no individual property found, check if it's a category (property type)
    if (!l) {
      const dbTypes = (allPropertyTypes || []).map((t: any) => t.name);
      const propertyInstanceTypes = Array.from(new Set((allL || []).map((p: any) => p.type)));
      
      const allPossibleTypes = Array.from(new Set([
        ...dbTypes, 
        ...propertyInstanceTypes,
        ...filters.buy,
        ...filters.commercial,
        ...filters.rent,
        ...filters.plots
      ]));

      const isKnownType = allPossibleTypes.some(t => t.toLowerCase().replace(/ /g, '-') === params.slug.toLowerCase());

      if (isKnownType) {
        const typeProperties = (allL || []).filter((p: any) => p.type.toLowerCase().replace(/ /g, '-') === params.slug.toLowerCase());
        const foundType = allPossibleTypes.find(t => t.toLowerCase().replace(/ /g, '-') === params.slug.toLowerCase()) || params.slug;
        
        return {
          isCategory: true,
          categoryName: foundType,
          properties: typeProperties,
          allL: allL || [],
          allAmenities: allAmenities || []
        };
      }
      throw notFound();
    }
    
    return { 
      isCategory: false,
      l, 
      others: (allL || []).filter((p: any) => p.slug !== params.slug).slice(0, 3),
      allAmenities: allAmenities || []
    };
  },
  component: PropertyDetail,
});

function PropertyDetail() {
  const data = Route.useLoaderData() as any;
  const settings = useSiteSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [activePurpose, setActivePurpose] = useState("Buy");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // --- Category View ---
  if (data.isCategory) {
    const { categoryName, properties, allL } = data;
    
    const filteredItems = properties.filter((it: any) => 
      it.title.toLowerCase().includes(search.toLowerCase()) || 
      it.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="bg-ink text-white py-32 border-b border-white/5">
          <div className="container-realty text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Golden Door Realty Portfolio</p>
            <h1 className="text-4xl md:text-7xl uppercase" style={{ fontFamily: "var(--font-serif)" }}>{categoryName}</h1>
          </div>
        </section>

        <section className="py-24 bg-surface">
          <div className="container-realty flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-72 shrink-0 space-y-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search in this category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-border px-10 py-3 text-xs focus:outline-none focus:border-brand uppercase tracking-wider"
                />
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-ink mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="w-3 h-3" /> Categories
                </h4>
                <div className="flex flex-col gap-2">
                  {filters.buy.map(p => (
                    <Link 
                      key={p} 
                      to="/property/$slug" 
                      params={{ slug: p.toLowerCase().replace(/ /g, '-') }}
                      className={`text-left px-4 py-2 text-xs uppercase tracking-widest transition-colors ${categoryName.toLowerCase() === p.toLowerCase() ? "bg-brand text-white font-bold" : "text-muted-foreground hover:text-ink"}`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-brand/5 p-6 rounded-2xl border border-brand/10">
                 <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand mb-4">Need Help?</h4>
                 <p className="text-xs text-slate-600 leading-relaxed mb-4">Can't find what you're looking for? Speak to our experts.</p>
                 <a href={`tel:${settings?.phone || ''}`} className="text-sm font-bold text-ink block mb-6">{settings?.phone || '+971 50 123 4567'}</a>
                 
                 <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const fd = new FormData(e.currentTarget);
                    try {
                      await createLead({ data: {
                        name: fd.get("name") as string,
                        email: fd.get("email") as string,
                        phone: fd.get("phone") as string,
                        source: `Sidebar Category Inquiry: ${categoryName}`
                      }});
                      toast.success("Enquiry sent! We will contact you shortly.");
                      (e.target as HTMLFormElement).reset();
                    } catch(err) {
                      toast.error("Failed to send enquiry");
                    } finally {
                      setIsSubmitting(false);
                    }
                 }} className="space-y-4 pt-6 border-t border-brand/10">
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Name</label>
                       <input name="name" required className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand transition-all text-xs" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Email</label>
                       <input name="email" required type="email" className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand transition-all text-xs" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Phone</label>
                       <input name="phone" required className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-brand transition-all text-xs" />
                    </div>
                    <button disabled={isSubmitting} type="submit" className="w-full bg-brand text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-ink transition-all shadow-lg shadow-brand/20 mt-4">
                      {isSubmitting ? "Submitting..." : "Send Enquiry"}
                    </button>
                 </form>
              </div>
            </aside>

            {/* Listings Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-border">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Showing {filteredItems.length} results</p>
                <div className="flex items-center gap-4">
                  <LayoutGrid className="w-4 h-4 text-ink cursor-pointer" />
                  <List className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredItems.map((it: any) => (
                   <PropertyCard key={it.slug} property={it} />
                 ))}
                
                {filteredItems.length === 0 && (
                  <div className="col-span-full py-24 text-center border border-dashed border-border rounded-3xl">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl uppercase tracking-widest text-ink mb-2">No properties found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search terms or check other categories.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // --- Individual Property View ---
  const { l, others, allAmenities } = data;
  
  const propertyAmenities = useMemo(() => {
    if (!l.amenities_ids || !allAmenities) return [];
    return allAmenities.filter((a: any) => l.amenities_ids.includes(a.id.toString()) || l.amenities_ids.includes(a.id));
  }, [l.amenities_ids, allAmenities]);

  const dynamicFloorPlans = useMemo(() => {
    if (!l.floor_plans) return [];
    if (typeof l.floor_plans === 'string') {
       try { return JSON.parse(l.floor_plans); } catch(e) { return []; }
    }
    return Array.isArray(l.floor_plans) ? l.floor_plans : [];
  }, [l.floor_plans]);

  const galleryImages = useMemo(() => {
    const rawGallery = l.gallery;
    let parsedGallery: any[] = [];

    if (typeof rawGallery === "string") {
      try {
        const parsed = JSON.parse(rawGallery);
        parsedGallery = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        parsedGallery = rawGallery.split(",");
      }
    } else if (Array.isArray(rawGallery)) {
      parsedGallery = rawGallery;
    }

    return parsedGallery
      .map((item: any) => typeof item === "string" ? item : item?.url || item?.src)
      .filter((url: any) => typeof url === "string" && url.trim().length > 0)
      .map((url: string) => url.trim());
  }, [l.gallery]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPreviousImage = () => {
    setLightboxIndex((current) => {
      if (current === null || galleryImages.length === 0) return current;
      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };
  const showNextImage = () => {
    setLightboxIndex((current) => {
      if (current === null || galleryImages.length === 0) return current;
      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  };
  
  const [activePlan, setActivePlan] = useState<any>(null);

  useEffect(() => {
    if (dynamicFloorPlans.length > 0 && !activePlan) {
      setActivePlan(dynamicFloorPlans[0]);
    }
  }, [dynamicFloorPlans, activePlan]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsSubmitting(true);
     const fd = new FormData(e.currentTarget);
     try {
        await createLead({ data: {
           name: fd.get("name") as string,
           email: fd.get("email") as string,
           phone: fd.get("phone") as string,
           source: `Property Inquiry: ${l.title}`
        }});
        toast.success("Interest registered successfully! We will contact you soon.");
        (e.target as HTMLFormElement).reset();
     } catch (err) {
        toast.error("Failed to register interest");
     } finally {
        setIsSubmitting(false);
     }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Header />
      
      {/* Floating WhatsApp Button */}
      <a href={`https://wa.me/${settings?.whatsapp || '971501234567'}?text=Hi, I am interested in ${l.title}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-[100] bg-[#25D366] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-transform">
         <i className="fab fa-whatsapp text-3xl"></i>
      </a>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
           <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2">{l.title}</h1>
              <p className="text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4 text-brand" /> {l.location}</p>
           </div>
           <div className="mt-4 md:mt-0 flex gap-1 items-center">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-[#F2C94C] fill-[#F2C94C]" />)}
              <span className="text-sm text-slate-400 ml-2 font-medium">12 Reviews</span>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           {/* Left Column (Main Content) */}
           <div className="lg:col-span-2 space-y-12">
              {/* Main Image */}
              <div className="w-full h-[500px] rounded-[24px] overflow-hidden shadow-sm">
                  <ImageWithFallback src={l.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt={l.title} />
              </div>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-serif font-bold text-slate-900">Gallery</h2>
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 transition hover:border-brand hover:text-brand"
                    >
                      <Images className="w-4 h-4" />
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {galleryImages.slice(0, 5).map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => openLightbox(index)}
                        className={`group relative overflow-hidden rounded-[18px] bg-slate-100 shadow-sm ${index === 0 ? "col-span-2 row-span-2 h-[300px] md:h-[420px]" : "h-[145px] md:h-[204px]"}`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${l.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
                        {index === 4 && galleryImages.length > 5 && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-sm font-bold uppercase tracking-[0.2em]">
                            +{galleryImages.length - 5} More
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Info Box (4 Icons) */}
              <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-200 rounded-[20px] divide-x divide-slate-200 text-center py-8 bg-[#FAFAFA]">
                 <div className="flex flex-col items-center justify-center gap-3">
                    <Compass className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">{l.area} Sqft</span>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-3">
                    <User className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">Available</span>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-3">
                    <BedDouble className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">{l.bedrooms} Beds</span>
                 </div>
                 <div className="flex flex-col items-center justify-center gap-3">
                    <Building2 className="w-8 h-8 text-slate-700" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">City View</span>
                 </div>
              </div>

              {/* Description */}
              <div>
                 <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Description</h2>
                 <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{l.description}</p>
              </div>

              {/* Developer Section */}
              {l.developer_name && (
                <div className="bg-[#FAF9F6] p-8 rounded-[30px] border border-slate-100">
                   <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-24 h-24 bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-4 shadow-sm shrink-0">
                         {l.developer_logo ? (
                            <img src={l.developer_logo} className="w-full h-full object-contain" alt={l.developer_name} />
                         ) : (
                            <Building2 className="w-10 h-10 text-slate-300" />
                         )}
                      </div>
                      <div className="flex-1">
                         <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">About Developer: {l.developer_name}</h3>
                         <p className="text-sm text-slate-600 leading-relaxed">{l.developer_about || "A premier developer committed to excellence and quality in every project."}</p>
                      </div>
                   </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                 <h2 className="text-2xl font-serif font-bold mb-8 text-slate-900">Amenities</h2>
                 <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                    {propertyAmenities.map((amenity: any) => {
                       const faClass = amenity.icon && amenity.icon.includes('fa-') ? amenity.icon : 'fas fa-check';
                       return (
                          <div key={amenity.id} className="flex items-center gap-6 text-slate-600">
                             <div className="w-12 h-12 rounded-xl bg-[#FAFAFA] border border-slate-100 flex items-center justify-center">
                               <i className={`${faClass} text-xl text-slate-700`} />
                             </div>
                             <span className="font-medium">{amenity.name}</span>
                          </div>
                       )
                    })}
                    {propertyAmenities.length === 0 && (
                       <p className="text-slate-400 italic">Facilities are being updated.</p>
                    )}
                 </div>
              </div>

              {/* Floor Plan */}
              <div>
                 <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Floor Plan</h2>
                 
                 {dynamicFloorPlans.length > 0 ? (
                    <div className="bg-[#FAFAFA] border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
                       {/* Tabs */}
                       <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar bg-slate-50">
                          {dynamicFloorPlans.map((plan: any, i: number) => (
                             <button 
                                key={i} 
                                onClick={() => setActivePlan(plan)}
                                className={`px-8 py-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${activePlan?.id === plan.id ? 'bg-white text-brand border-t-4 border-brand' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50 border-t-4 border-transparent'}`}
                             >
                                {plan.type}
                             </button>
                          ))}
                       </div>
                       
                       {/* Content */}
                       {activePlan && (
                          <div className="grid md:grid-cols-5 bg-white">
                             <div className="md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-slate-100 flex items-center justify-center bg-[#FAFAFA]/50">
                                <img src={activePlan.img || l.floor_plan_img || "https://images.unsplash.com/photo-1626297314545-2b4cd92b2d07?q=80&w=2000&auto=format&fit=crop"} className="w-full max-h-[400px] object-contain drop-shadow-lg" alt={activePlan.type} />
                             </div>
                             <div className="md:col-span-2 p-8 flex flex-col justify-center space-y-8">
                                <div>
                                   <div className="inline-block bg-[#1a2b4c] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded mb-6 shadow-sm">
                                      {activePlan.type}
                                   </div>
                                   <div className="flex items-center gap-6 text-slate-700">
                                      <div className="text-center">
                                         <BedDouble className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                                         <p className="text-xl font-bold">{activePlan.bedrooms}</p>
                                         <p className="text-[9px] uppercase tracking-wider text-slate-500">Bedrooms</p>
                                      </div>
                                      <div className="w-[1px] h-8 bg-slate-200"></div>
                                      <div className="text-center">
                                         <User className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                                         <p className="text-xl font-bold">{activePlan.bathrooms}</p>
                                         <p className="text-[9px] uppercase tracking-wider text-slate-500">Bathrooms</p>
                                      </div>
                                      <div className="w-[1px] h-8 bg-slate-200"></div>
                                      <div className="text-center">
                                         <Compass className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                                         <p className="text-[#004037] text-[15px] font-black leading-none mb-1">
                                            {activePlan.size}
                                         </p>
                                         <p className="text-[9px] uppercase tracking-wider text-slate-500">SQ FT</p>
                                      </div>
                                   </div>
                                </div>
                                
                                <div className="border-t border-slate-100 pt-8">
                                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Price</p>
                                   <p className="text-3xl font-serif font-bold text-[#1a2b4c]">{activePlan.price}</p>
                                </div>
                                
                                <div className="space-y-3 pt-4">
                                   <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="w-full bg-brand text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg shadow-brand/20">
                                      Book a Site Visit
                                   </button>
                                   <a href={`https://wa.me/${settings?.whatsapp || '971501234567'}?text=Hi, I want more details on the ${activePlan.type} floor plan in ${l.title}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg shadow-[#25D366]/20 text-center">
                                      <i className="fab fa-whatsapp text-lg"></i> WhatsApp Us
                                   </a>
                                </div>
                             </div>
                          </div>
                       )}
                    </div>
                 ) : (
                    <div className="bg-[#FAFAFA] p-8 border border-slate-100 rounded-[24px]">
                       <img src={l.floor_plan_img || "https://images.unsplash.com/photo-1626297314545-2b4cd92b2d07?q=80&w=2000&auto=format&fit=crop"} className={`w-full h-auto object-contain rounded-lg shadow-sm ${!l.floor_plan_img ? 'opacity-70 grayscale' : ''}`} alt="Floor Plan" />
                       {!l.floor_plan_img && (
                          <div className="mt-6 text-center">
                             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Representative Layout. Register interest for precise floor plans.</p>
                          </div>
                       )}
                    </div>
                 )}
              </div>

              {/* Location Map */}
              <div>
                 <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">Location Map</h2>
                 <div className="w-full h-[400px] bg-slate-100 rounded-[24px] overflow-hidden border border-slate-200">
                    <iframe 
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(l.location || 'Noida')}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                    ></iframe>
                 </div>
              </div>
              
              {/* Bottom Enquiry Form */}
              <div className="pt-12 border-t border-slate-200">
                 <div className="bg-[#FAF9F6] p-10 border border-slate-100 rounded-[30px] shadow-sm">
                    <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">Enquire Now</h3>
                    <p className="text-slate-500 mb-8">Fill out the form below and our real estate experts will contact you shortly.</p>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                       <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Your Name</label>
                             <input name="name" required className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:border-brand transition-colors" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Email Address</label>
                             <input name="email" required type="email" className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:border-brand transition-colors" placeholder="john@example.com" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Phone Number</label>
                          <input name="phone" required className="w-full bg-white border border-slate-200 px-5 py-4 rounded-xl focus:outline-none focus:border-brand transition-colors" placeholder="+971 50 123 4567" />
                       </div>
                       <button type="submit" disabled={isSubmitting} className="w-full bg-brand hover:opacity-90 text-white font-bold uppercase tracking-widest text-sm py-5 rounded-xl mt-6 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand/30">
                          {isSubmitting ? "Submitting..." : "Schedule Visit"} <ArrowRight className="w-5 h-5" />
                       </button>
                    </form>
                 </div>
              </div>
           </div>

           {/* Right Column (Sidebar) */}
           <div className="space-y-8 sticky top-32 h-max">
              {/* Sticky Form Box */}
              <div className="bg-[#FAF9F6] p-8 border border-brand/20 rounded-[30px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
                 <div className="text-center mb-8 pb-8 border-b border-slate-200">
                    <span className="text-slate-500 uppercase text-xs font-bold tracking-widest">Price</span>
                    <h3 className="text-4xl font-serif font-bold text-slate-900 mt-2">{l.price}</h3>
                 </div>

                 <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Name</label>
                       <input name="name" required className="w-full bg-white border border-slate-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand transition-colors" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Email</label>
                       <input name="email" required type="email" className="w-full bg-white border border-slate-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand transition-colors" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Phone</label>
                       <input name="phone" required className="w-full bg-white border border-slate-200 px-4 py-3.5 rounded-xl focus:outline-none focus:border-brand transition-colors" />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand hover:opacity-90 text-white font-bold uppercase tracking-[0.2em] text-[11px] py-4 rounded-xl mt-6 transition-colors flex items-center justify-center gap-2">
                       {isSubmitting ? "Submitting..." : "Book Visit"}
                    </button>
                 </form>
              </div>

              {/* Booking Help */}
              <div className="bg-brand p-10 rounded-[30px] text-center text-white shadow-xl shadow-brand/20">
                 <h4 className="text-sm uppercase tracking-widest font-bold mb-4 opacity-90">Booking Help</h4>
                 <p className="text-2xl font-serif font-bold">{settings?.phone || '+971 50 123 4567'}</p>
                 <p className="text-xs mt-2 opacity-80">Call us for immediate assistance</p>
              </div>

              {/* Popular Rooms / Similar Properties */}
              <div>
                 <h4 className="text-xl font-serif font-bold mb-6 text-slate-900 border-b border-slate-200 pb-4">Popular Properties</h4>
                  <div className="space-y-5">
                    {others.map((p: any) => (
                       <Link key={p.slug} to="/property/$slug" params={{ slug: p.slug }} className="flex gap-5 group items-center bg-white p-3 rounded-2xl border border-slate-100 hover:border-brand/30 hover:shadow-md transition-all">
                          <ImageWithFallback src={p.img} className="w-20 h-20 object-cover rounded-xl group-hover:scale-105 transition-transform" alt={p.title} />
                          <div className="flex-1">
                             <h5 className="font-serif font-bold text-sm text-slate-900 group-hover:text-brand transition-colors line-clamp-1">{p.title}</h5>
                             <p className="text-[10px] text-slate-500 mb-2 mt-1 uppercase tracking-wider">From <span className="font-bold text-slate-900">{p.price}</span></p>
                             <span className="text-[9px] uppercase tracking-widest font-bold bg-brand text-white px-2 py-1 rounded-md inline-block">Book Now</span>
                          </div>
                       </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
      {lightboxIndex !== null && galleryImages[lightboxIndex] && (
        <div className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center px-4 py-6">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={showPreviousImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          <div className="w-full max-w-6xl">
            <img
              src={galleryImages[lightboxIndex]}
              alt={`${l.title} gallery image ${lightboxIndex + 1}`}
              className="mx-auto max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-5 text-center text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={showNextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
