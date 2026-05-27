import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/badge";

const LAB_LABELS: Record<string, string> = {
  iit_bombay_fedex_alfa: "IIT Bombay FedEx ALFA",
  iit_madras_fedex_smart_center: "IIT Madras FedEx SMART",
};

function getStatusClass(statusName?: string): string {
  const s = statusName?.toLowerCase() ?? "";
  if (s.includes("progress")) return "status-in-progress";
  if (s.includes("complet")) return "status-completed";
  if (s.includes("ideation") || s.includes("idea")) return "status-ideation";
  if (s.includes("hold")) return "status-on-hold";
  return "status-default";
}

function getCategoryColor(name?: string): string {
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-indigo-100 text-indigo-700",
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function ProjectCard({ project }: { project: any }) {
  const leadProfs = project.contributors?.filter(
    (c: any) => c.associationType?.name === "Lead Professor"
  ).map((c: any) => c.person) || [];

  const statusClass = getStatusClass(project.progressStatus?.statusName);
  const categoryColorClass = getCategoryColor(project.category?.name);
  const labLabel = LAB_LABELS[project.labOrigin] ?? project.labOrigin ?? "Unknown Lab";

  return (
    <Link href={`/projects/${project.id}`} className="block h-full group">
      <Card className={`project-card h-full flex flex-col border-border/70 bg-card`}>
        {/* Image */}
        {project.titleCardImage && (
          <div className="w-full h-44 overflow-hidden bg-muted">
            <img
              src={project.titleCardImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader className="flex-none pb-3">
          {/* Badges row */}
          <div className="flex justify-between items-start gap-2 mb-3">
            <span className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5 ${categoryColorClass}`}>
              {project.category?.name || "Uncategorized"}
            </span>
            <span className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5 ${statusClass}`}>
              {project.progressStatus?.statusName || "Unknown"}
            </span>
          </div>

          <CardTitle className="text-lg font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {project.title}
          </CardTitle>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mt-1.5">
            {labLabel}
          </p>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed">
            {project.shortDesc}
          </p>
        </CardContent>
        {
          project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 p-4">
              {project.tags.map((t: any) => (
                <Badge key={t.tag.id} variant="secondary" className="bg-secondary/50">
                  {t.tag.name}
                </Badge>
              ))}
            </div>
          )
        }
        <CardFooter className="flex-none pt-3 border-t border-border/60 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex -space-x-2">
                {leadProfs.slice(0, 3).map((prof: any) => (
                  <Avatar key={prof.id} className="border-2 border-card h-7 w-7">
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">
                      {prof.name?.trim().charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium truncate">
                {leadProfs.length > 0
                  ? leadProfs.map((p: any) => p.name).join(", ")
                  : "No leads assigned"}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors duration-200 shrink-0 ml-2" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

