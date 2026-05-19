"use server";

import { db } from "@/db";
import {
  people,
  tags,
  categories,
  progressStatuses,
  associationTypes,
} from "@/db/schema";
import {
  personSchema,
  simpleNameSchema,
  statusSchema,
  PersonFormValues,
  SimpleNameFormValues,
  StatusFormValues,
} from "@/lib/validations";
import { auth } from "@/auth";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ─── People ────────────────────────────────────────────────────────────────

const AFFILIATION_TO_INSTITUTION = {
  iitb: "IIT Bombay",
  iitm: "IIT Madras",
} as const;

type Affiliation = keyof typeof AFFILIATION_TO_INSTITUTION;

function getAllowedInstitution(affiliation: string): string | null {
  return AFFILIATION_TO_INSTITUTION[affiliation as Affiliation] ?? null;
}

export async function savePersonAction(data: PersonFormValues) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { role, affiliation } = session.user;

  // FedEx users cannot manage people
  if (affiliation === "fedex" && role !== "admin") {
    return { error: "You do not have permission to manage people." };
  }

  const parsed = personSchema.safeParse(data);
  if (!parsed.success) return { error: "Validation failed", details: parsed.error.format() };

  const v = parsed.data;

  // Non-admins can only create/edit people from their own institution
  if (role !== "admin") {
    const allowed = getAllowedInstitution(affiliation);
    if (v.institution !== allowed) {
      return { error: `You can only manage people from ${allowed}.` };
    }

    // When editing, also verify the existing record belongs to their institution
    if (v.id) {
      const existing = await db.query.people.findFirst({
        where: eq(people.id, v.id),
      });
      if (!existing || existing.institution !== allowed) {
        return { error: "You do not have permission to edit this person." };
      }
    }
  }

  try {
    if (v.id) {
      await db
        .update(people)
        .set({
          name: v.name,
          email: v.email || null,
          role: v.role,
          department: v.department || null,
          institution: v.institution ?? null,
          bio: v.bio || null,
          profileImageUrl: v.profileImageUrl || null,
        })
        .where(eq(people.id, v.id));
    } else {
      await db.insert(people).values({
        id: `person_${uuidv4()}`,
        name: v.name,
        email: v.email || null,
        role: v.role,
        department: v.department || null,
        institution: v.institution ?? null,
        bio: v.bio || null,
        profileImageUrl: v.profileImageUrl || null,
      });
    }
    revalidatePath("/manage/people");
  } catch (e) {
    console.error(e);
    return { error: "Failed to save person" };
  }
}

export async function deletePersonAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const { role, affiliation } = session.user;

  // FedEx users cannot manage people
  if (affiliation === "fedex" && role !== "admin") {
    return { error: "You do not have permission to delete people." };
  }

  // Non-admins can only delete people from their own institution
  if (role !== "admin") {
    const allowed = getAllowedInstitution(affiliation);
    const existing = await db.query.people.findFirst({ where: eq(people.id, id) });
    if (!existing || existing.institution !== allowed) {
      return { error: "You do not have permission to delete this person." };
    }
  }

  await db.delete(people).where(eq(people.id, id));
  revalidatePath("/manage/people");
}

// ─── Tags ──────────────────────────────────────────────────────────────────

export async function saveTagAction(data: SimpleNameFormValues) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = simpleNameSchema.safeParse(data);
  if (!parsed.success) return { error: "Validation failed" };

  const v = parsed.data;
  try {
    if (v.id) {
      await db.update(tags).set({ name: v.name }).where(eq(tags.id, v.id));
    } else {
      await db.insert(tags).values({ id: `tag_${uuidv4()}`, name: v.name });
    }
    revalidatePath("/manage/tags");
  } catch (e) {
    console.error(e);
    return { error: "Failed to save tag" };
  }
}

export async function deleteTagAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await db.delete(tags).where(eq(tags.id, id));
  revalidatePath("/manage/tags");
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function saveCategoryAction(data: SimpleNameFormValues) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = simpleNameSchema.safeParse(data);
  if (!parsed.success) return { error: "Validation failed" };

  const v = parsed.data;
  try {
    if (v.id) {
      await db.update(categories).set({ name: v.name }).where(eq(categories.id, v.id));
    } else {
      await db.insert(categories).values({ id: `cat_${uuidv4()}`, name: v.name });
    }
    revalidatePath("/manage/categories");
  } catch (e) {
    console.error(e);
    return { error: "Failed to save category" };
  }
}

export async function deleteCategoryAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/manage/categories");
}

// ─── Progress Statuses ─────────────────────────────────────────────────────

export async function saveStatusAction(data: StatusFormValues) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = statusSchema.safeParse(data);
  if (!parsed.success) return { error: "Validation failed" };

  const v = parsed.data;
  try {
    if (v.id) {
      await db
        .update(progressStatuses)
        .set({ statusName: v.statusName })
        .where(eq(progressStatuses.id, v.id));
    } else {
      await db.insert(progressStatuses).values({
        id: `status_${uuidv4()}`,
        statusName: v.statusName,
      });
    }
    revalidatePath("/manage/statuses");
  } catch (e) {
    console.error(e);
    return { error: "Failed to save status" };
  }
}

export async function deleteStatusAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await db.delete(progressStatuses).where(eq(progressStatuses.id, id));
  revalidatePath("/manage/statuses");
}

// ─── Association Types ─────────────────────────────────────────────────────

export async function saveAssociationTypeAction(data: SimpleNameFormValues) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = simpleNameSchema.safeParse(data);
  if (!parsed.success) return { error: "Validation failed" };

  const v = parsed.data;
  try {
    if (v.id) {
      await db
        .update(associationTypes)
        .set({ name: v.name })
        .where(eq(associationTypes.id, v.id));
    } else {
      await db.insert(associationTypes).values({
        id: `assoc_${uuidv4()}`,
        name: v.name,
      });
    }
    revalidatePath("/manage/statuses"); // association types managed alongside statuses page
  } catch (e) {
    console.error(e);
    return { error: "Failed to save association type" };
  }
}

export async function deleteAssociationTypeAction(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await db.delete(associationTypes).where(eq(associationTypes.id, id));
  revalidatePath("/manage/statuses");
}
