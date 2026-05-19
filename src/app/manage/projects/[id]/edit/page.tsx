import { db } from "@/db";
import {
  projects,
  categories,
  progressStatuses,
  tags,
  people,
  associationTypes,
  projectTags,
  projectContributors,
} from "@/db/schema";
import { ProjectForm } from "@/components/manage/project-form";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // FedEx users are view-only — no management access
  if (session.user.affiliation === "fedex" && session.user.role !== "admin") {
    redirect("/");
  }

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, params.id),
  });

  if (!project) {
    notFound();
  }

  // Basic authorization: check lab origin
  if (
    session.user.role !== "admin" &&
    ((session.user.affiliation === "iitb" &&
      project.labOrigin !== "iit_bombay_fedex_alfa") ||
      (session.user.affiliation === "iitm" &&
        project.labOrigin !== "iit_madras_fedex_smart_center"))
  ) {
    redirect("/manage");
  }

  const [
    allCategories,
    allStatuses,
    allTags,
    allPeople,
    allAssociationTypes,
    existingProjectTags,
    existingContributors,
  ] = await Promise.all([
    db.select().from(categories),
    db.select().from(progressStatuses),
    db.select().from(tags),
    db.select().from(people),
    db.select().from(associationTypes),
    db.select().from(projectTags).where(eq(projectTags.projectId, params.id)),
    db
      .select()
      .from(projectContributors)
      .where(eq(projectContributors.projectId, params.id)),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground mt-1">
          Update the details of &quot;{project.title}&quot;.
        </p>
      </div>

      <ProjectForm
        initialData={project}
        categories={allCategories}
        statuses={allStatuses}
        tags={allTags}
        people={allPeople}
        associationTypes={allAssociationTypes}
        initialTagIds={existingProjectTags.map((pt) => pt.tagId)}
        initialContributors={existingContributors.map((c) => ({
          personId: c.personId,
          associationTypeId: c.associationTypeId,
        }))}
      />
    </div>
  );
}
