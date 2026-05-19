import { db } from "@/db";
import {
  categories,
  progressStatuses,
  tags,
  people,
  associationTypes,
} from "@/db/schema";
import { ProjectForm } from "@/components/manage/project-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // FedEx users are view-only — no management access
  if (session.user.affiliation === "fedex" && session.user.role !== "admin") {
    redirect("/");
  }

  const [allCategories, allStatuses, allTags, allPeople, allAssociationTypes] =
    await Promise.all([
      db.select().from(categories),
      db.select().from(progressStatuses),
      db.select().from(tags),
      db.select().from(people),
      db.select().from(associationTypes),
    ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        <p className="text-muted-foreground mt-1">
          Add a new research project to the FedEx dashboard.
        </p>
      </div>

      <ProjectForm
        categories={allCategories}
        statuses={allStatuses}
        tags={allTags}
        people={allPeople}
        associationTypes={allAssociationTypes}
      />
    </div>
  );
}
