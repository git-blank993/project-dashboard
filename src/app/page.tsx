import { db } from "@/db";
import { projects, categories, progressStatuses, tags } from "@/db/schema";
import { eq, and, or, like } from "drizzle-orm";
import { Filters } from "@/components/dashboard/filters";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Layers, FlaskConical, CheckCircle2, Clock } from "lucide-react";
import { PaginationControls } from "@/components/dashboard/pagination-controls";
import { DashboardStateManager } from "@/components/dashboard/dashboard-state-manager";

export default async function DashboardPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const lab = typeof searchParams.lab === "string" ? searchParams.lab : "";
  const categoryId = typeof searchParams.category === "string" ? searchParams.category : "";
  const statusId = typeof searchParams.status === "string" ? searchParams.status : "";

  // Fetch metadata for filters
  const allCategories = await db.select().from(categories);
  const allStatuses = await db.select().from(progressStatuses);
  const allTags = await db.select().from(tags);

  // Build where clause dynamically
  const conditions = [eq(projects.isPublished, true)];

  if (q) {
    conditions.push(
      or(
        like(projects.title, `%${q}%`),
        like(projects.shortDesc, `%${q}%`)
      ) as any
    );
  }

  if (lab) {
    conditions.push(eq(projects.labOrigin, lab as any));
  }

  if (categoryId) {
    conditions.push(eq(projects.categoryId, categoryId));
  }

  if (statusId) {
    conditions.push(eq(projects.progressId, statusId));
  }

  // Execute main query
  const projectsData = await db.query.projects.findMany({
    where: and(...conditions),
    with: {
      category: true,
      tags: {
        with: {
          tag: true,
        }
      },
      progressStatus: true,
      contributors: {
        with: {
          person: true,
          associationType: true,
        }
      }
    },
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });

  // All published projects for stats (unfiltered)
  const allProjects = await db.query.projects.findMany({
    where: eq(projects.isPublished, true),
    with: { progressStatus: true },
  });
  const inProgressCount = allProjects.filter(p => p.progressStatus?.statusName?.toLowerCase().includes("progress")).length;
  const completedCount = allProjects.filter(p => p.progressStatus?.statusName?.toLowerCase().includes("complet")).length;

  const isFiltered = !!(q || lab || categoryId || statusId);

  // Pagination Logic
  const pageStr = typeof searchParams.page === "string" ? searchParams.page : "1";
  const currentPage = parseInt(pageStr, 10) || 1;
  const pageSize = 9;
  const totalFiltered = projectsData.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const paginatedProjects = projectsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col min-h-full">
      <DashboardStateManager />
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-gradient border-b border-border/50">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="w-full max-w-screen-2xl mx-auto relative px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-xl">

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Project Dashboard
              </h1>

            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="flex flex-col items-center justify-center bg-card border border-border/60 rounded-xl px-5 py-4 shadow-sm min-w-[90px]">
                <Layers className="h-5 w-5 text-primary mb-1.5" />
                <span className="text-2xl font-bold tabular-nums">{allProjects.length}</span>
                <span className="text-xs text-muted-foreground mt-0.5 text-center">Total</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-card border border-border/60 rounded-xl px-5 py-4 shadow-sm min-w-[90px]">
                <Clock className="h-5 w-5 text-sky-500 mb-1.5" />
                <span className="text-2xl font-bold tabular-nums">{inProgressCount}</span>
                <span className="text-xs text-muted-foreground mt-0.5 text-center">Active</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-card border border-border/60 rounded-xl px-5 py-4 shadow-sm min-w-[90px]">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mb-1.5" />
                <span className="text-2xl font-bold tabular-nums">{completedCount}</span>
                <span className="text-xs text-muted-foreground mt-0.5 text-center">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ─────────────────────────────────────────── */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-8 flex-1">
        <Filters
          categories={allCategories}
          statuses={allStatuses}
          tags={allTags}
          currentLab={lab}
          currentCategory={categoryId}
          currentStatus={statusId}
          currentQ={q}
        />

        <div className="mt-8">
          {isFiltered && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing <span className="font-semibold text-foreground">{totalFiltered}</span> result{totalFiltered !== 1 ? "s" : ""}
              {q && <> for <span className="font-semibold text-foreground">"{q}"</span></>}
            </p>
          )}
          {paginatedProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-2xl border-border bg-muted/20 text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Layers className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No projects match your criteria.</p>
              <p className="text-xs text-muted-foreground/70">Try adjusting or clearing the filters above.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project as any} />
                ))}
              </div>

              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

