import { Search, ChevronDown } from "lucide-react";

const fields = ["Property Type", "Bedrooms", "Price Range", "Community"];

export function SearchBar() {
  return (
    <div className="bg-background shadow-[var(--shadow-elegant)] border-t border-border">
      <div className="container-emaar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {fields.map((f) => (
          <button
            key={f}
            className="flex items-center justify-between px-6 py-5 border-r border-border last:border-r-0 hover:bg-surface transition text-left"
          >
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              {f}
            </span>
            <ChevronDown className="w-4 h-4 text-ink/60" />
          </button>
        ))}
        <button className="bg-ink text-white flex items-center justify-center gap-3 py-5 px-6 hover:bg-brand transition group">
          <Search className="w-4 h-4" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
            Search Properties
          </span>
        </button>
      </div>
    </div>
  );
}
