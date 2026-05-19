import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Users, Tag, Layers, BarChart2 } from "lucide-react";
import { ProjectsTable } from "@/components/manage/projects-table";

const metadataNav = [
  {
    href: "/manage/people",
    icon: Users,
    label: "People",
    description: "Researchers, professors & staff",
  },
  {
    href: "/manage/metadata",
    icon: Tag,
    label: "Tags",
    description: "Tags, categories, statuses & roles",
    sub: "& Metadata",
  },
];

export default async function ManagePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { role, affiliation } = session.user;

  // FedEx users are view-only — no management access
  if (affiliation === "fedex" && role !== "admin") {
    redirect("/");
  }

  const conditions =
    role === "admin"
      ? undefined
      : eq(
          projects.labOrigin,
          affiliation === "iitb"
            ? "iit_bombay_fedex_alfa"
            : "iit_madras_fedex_smart_center"
        );

  const projectsData = await db.query.projects.findMany({
    where: conditions,
    with: {
      category: true,
      progressStatus: true,
    },
    orderBy: [desc(projects.createdAt)],
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Management</h1>
          <p className="text-muted-foreground mt-1">
            {role === "admin"
              ? "Global Administration"
              : `Managing for ${affiliation.toUpperCase()}`}
          </p>
        </div>
        <Link href="/manage/projects/new" className={buttonVariants()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Reference data nav cards */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Reference Data
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metadataNav.map(({ href, icon: Icon, label, description, sub }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:bg-primary/5 transition-colors"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">
                  {label}
                  {sub && (
                    <span className="font-normal text-muted-foreground ml-1">{sub}</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Projects table */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Projects
        </h2>
        <ProjectsTable projects={projectsData} />
      </div>
    </div>
  );
}
