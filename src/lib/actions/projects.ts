"use server";

import { db } from "@/db";
import { projects, projectTags, projectContributors } from "@/db/schema";
import { projectSchema } from "@/lib/validations";
import { auth } from "@/auth";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function saveProjectAction(data: unknown) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Validation failed", details: parsed.error.format() };
  }

  const values = parsed.data;

  // Set lab origin based on manager's affiliation
  const labOrigin =
    session.user.role === "admin"
      ? "iit_bombay_fedex_alfa"
      : session.user.affiliation === "iitb"
      ? "iit_bombay_fedex_alfa"
      : "iit_madras_fedex_smart_center";

  try {
    let projectId: string;

    if (values.id) {
      projectId = values.id;
      // Update core project fields
      await db
        .update(projects)
        .set({
          title: values.title,
          shortDesc: values.shortDesc,
          detailedInfoMarkdown: values.detailedInfoMarkdown,
          titleCardImage: values.titleCardImage || null,
          categoryId: values.categoryId,
          progressId: values.progressId,
          isPublished: values.isPublished,
        })
        .where(eq(projects.id, projectId));
    } else {
      projectId = `proj_${uuidv4()}`;
      await db.insert(projects).values({
        id: projectId,
        title: values.title,
        shortDesc: values.shortDesc,
        detailedInfoMarkdown: values.detailedInfoMarkdown,
        titleCardImage: values.titleCardImage || null,
        categoryId: values.categoryId,
        progressId: values.progressId,
        isPublished: values.isPublished,
        labOrigin: labOrigin as "iit_bombay_fedex_alfa" | "iit_madras_fedex_smart_center",
      });
    }

    // Sync tags: replace all existing entries
    await db.delete(projectTags).where(eq(projectTags.projectId, projectId));
    if (values.tagIds.length > 0) {
      await db.insert(projectTags).values(
        values.tagIds.map((tagId) => ({ projectId, tagId }))
      );
    }

    // Sync contributors: replace all existing entries
    await db
      .delete(projectContributors)
      .where(eq(projectContributors.projectId, projectId));
    if (values.contributors.length > 0) {
      await db.insert(projectContributors).values(
        values.contributors.map((c) => ({
          projectId,
          personId: c.personId,
          associationTypeId: c.associationTypeId,
        }))
      );
    }

    revalidatePath("/");
    revalidatePath("/manage");
  } catch (error) {
    console.error("Failed to save project", error);
    return { error: "Failed to save project to database" };
  }

  redirect("/manage");
}

export async function deleteProjectAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { role, affiliation } = session.user;

  // FedEx users cannot delete projects
  if (affiliation === "fedex" && role !== "admin") {
    return { error: "You do not have permission to delete projects." };
  }

  // Verify the project exists and the user has rights to it
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  });

  if (!project) return { error: "Project not found." };

  if (role !== "admin") {
    const ownedOrigin =
      affiliation === "iitb"
        ? "iit_bombay_fedex_alfa"
        : "iit_madras_fedex_smart_center";
    if (project.labOrigin !== ownedOrigin) {
      return { error: "You do not have permission to delete this project." };
    }
  }

  await db.delete(projects).where(eq(projects.id, id));

  revalidatePath("/");
  revalidatePath("/manage");
  redirect("/manage");
}
