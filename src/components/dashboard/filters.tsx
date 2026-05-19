"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

const LAB_LABELS: Record<string, string> = {
  iit_bombay_fedex_alfa: "IIT Bombay FedEx Alfa",
  iit_madras_fedex_smart_center: "IIT Madras FedEx Smart Center",
};

export function Filters({
  categories,
  statuses,
  currentLab,
  currentCategory,
  currentStatus,
  currentQ,
}: {
  categories: any[];
  statuses: any[];
  tags: any[];
  currentLab: string;
  currentCategory: string;
  currentStatus: string;
  currentQ: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(currentQ);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString("q", q)}`);
  };

  const clearSearch = () => {
    setQ("");
    router.push(`${pathname}?${createQueryString("q", "")}`);
  };

  const activeFilterCount = [currentLab, currentCategory, currentStatus, currentQ].filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-border/70 bg-card shadow-sm overflow-hidden">
      {/* Top accent strip */}
      <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

      <div className="p-4">
        {/* ── Filter row (fixed layout — never shifts) ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          {/* Search — takes all available space */}
          <form onSubmit={handleSearch} className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="project-search"
              placeholder="Search by keyword, title, or description…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9 pr-9 bg-muted/40 border-border/60 focus-visible:bg-background transition-colors"
            />
            {q && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>

          {/* Separator */}
          <div className="hidden sm:block h-8 w-px bg-border/60 shrink-0" />

          {/* Lab select */}
          <Select
            value={currentLab || "all"}
            onValueChange={(val) => {
              const value = val === "all" ? "" : (val || "");
              router.push(`${pathname}?${createQueryString("lab", value)}`);
            }}
          >
            <SelectTrigger
              id="lab-filter"
              className="w-full sm:w-[220px] bg-muted/40 border-border/60 shrink-0"
            >
              <SelectValue>
                {LAB_LABELS[currentLab] ?? "All Labs"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="min-w-[260px]">
              <SelectItem value="all">All Labs</SelectItem>
              {Object.entries(LAB_LABELS).map(([val, label]) => (
                <SelectItem key={val} value={val}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category select */}
          <Select
            value={currentCategory || "all"}
            onValueChange={(val) => {
              const value = val === "all" ? "" : (val || "");
              router.push(`${pathname}?${createQueryString("category", value)}`);
            }}
          >
            <SelectTrigger
              id="category-filter"
              className="w-full sm:w-[165px] bg-muted/40 border-border/60 shrink-0"
            >
              <SelectValue>
                {currentCategory && currentCategory !== "all"
                  ? categories.find((c) => c.id === currentCategory)?.name ?? "All Categories"
                  : "All Categories"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className={"min-w-[260px]"}>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status select */}
          <Select
            value={currentStatus || "all"}
            onValueChange={(val) => {
              const value = val === "all" ? "" : (val || "");
              router.push(`${pathname}?${createQueryString("status", value)}`);
            }}
          >
            <SelectTrigger
              id="status-filter"
              className="w-full sm:w-[150px] bg-muted/40 border-border/60 shrink-0"
            >
              <SelectValue>
                {currentStatus && currentStatus !== "all"
                  ? statuses.find((s) => s.id === currentStatus)?.statusName ?? "All Statuses"
                  : "All Statuses"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.statusName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ── Clear filters row — separate so it never moves the inputs above ── */}
        {activeFilterCount > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
            </span>
            <button
              onClick={() => router.push(pathname)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/75 transition-colors"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


