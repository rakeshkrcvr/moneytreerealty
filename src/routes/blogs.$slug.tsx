import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAllBlogs } from "@/lib/server-functions";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { ImageWithFallback } from "@/components/site/ImageWithFallback";

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    const blogs = await getAllBlogs();
    const blog = blogs.find((b: any) => b.slug === params.slug);
    if (!blog) throw new Error("Blog not found");
    
    // Also get related blogs
    const related = blogs.filter((b: any) => b.slug !== params.slug).slice(0, 3);
    
    return { blog, related };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { blog, related } = Route.useLoaderData();
  const content = blog.content || blog.excerpt || "";
  const hasHtmlContent = /<\/?[a-z][\s\S]*>/i.test(content);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32">
        <article>
          {/* Header */}
          <div className="container-realty max-w-4xl mb-12">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand transition-colors text-[10px] font-black uppercase tracking-widest mb-10">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            
            <div className="space-y-6">
              <span className="inline-block bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">{blog.cat}</span>
              <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-tight leading-tight text-slate-900">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Author</p>
                      <p className="text-sm font-bold text-slate-900 leading-none">{blog.author || 'Admin'}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Calendar className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Published</p>
                      <p className="text-sm font-bold text-slate-900 leading-none">{new Date(blog.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                   </div>
                </div>
                
                <div className="ml-auto flex items-center gap-3">
                   <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"><Facebook className="w-4 h-4" /></button>
                   <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"><Twitter className="w-4 h-4" /></button>
                   <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"><LinkIcon className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="container-realty mb-16">
            <div className="aspect-[21/9] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border-8 border-slate-50 bg-slate-100">
              <ImageWithFallback src={blog.img} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="container-realty max-w-4xl pb-24">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-tight prose-brand">
               {hasHtmlContent ? (
                 <div className="text-slate-600 leading-relaxed text-lg font-medium" dangerouslySetInnerHTML={{ __html: content }} />
               ) : (
                 content.split('\n').filter(Boolean).map((para: string, i: number) => (
                   <p key={i} className="mb-6 text-slate-600 leading-relaxed text-lg font-medium">
                     {para}
                   </p>
                 ))
               )}
            </div>
            
            {/* Tags / Footer */}
            <div className="mt-16 pt-12 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share Article</span>
                  <div className="flex gap-2">
                     <button className="px-6 py-2 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"><Share2 className="w-3 h-3" /> Copy Link</button>
                  </div>
               </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-24 bg-slate-50">
          <div className="container-realty">
            <div className="flex items-end justify-between mb-12">
               <h2 className="text-3xl font-serif uppercase tracking-tight">Related <span className="text-brand italic">Articles</span></h2>
               <Link to="/blogs" className="text-[10px] font-black uppercase tracking-widest text-brand border-b border-brand pb-1">View All Blog</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {related.map((p: any) => (
                 <Link key={p.slug} to="/blogs/$slug" params={{ slug: p.slug }} className="group">
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4 shadow-sm">
                       <ImageWithFallback src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                    </div>
                    <h4 className="text-lg font-serif uppercase tracking-tight group-hover:text-brand transition-colors line-clamp-2 leading-tight">{p.title}</h4>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
