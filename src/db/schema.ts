import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin", "manager", "viewer"] }).notNull().default("viewer"),
  affiliation: text("affiliation", { enum: ["iitb", "iitm", "fedex"] }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const people = sqliteTable("people", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique(),
  role: text("role", { enum: ["prof", "researcher", "student", "staff", "admin"] }).notNull(),
  socials: text("socials", { mode: "json" }), // JSON structure storing LinkedIn, GitHub, Twitter links
  department: text("department"),
  institution: text("institution", { enum: ["IIT Bombay", "IIT Madras", "FedEx"] }),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const progressStatuses = sqliteTable("progress_statuses", {
  id: text("id").primaryKey(),
  statusName: text("status_name").notNull().unique(),
});

export const associationTypes = sqliteTable("association_types", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  titleCardImage: text("title_card_image"),
  shortDesc: text("short_desc").notNull(),
  detailedInfoMarkdown: text("detailed_info_markdown"),
  dateOfProject: integer("date_of_project", { mode: "timestamp" }),
  categoryId: text("category_id").references(() => categories.id),
  progressId: text("progress_id").references(() => progressStatuses.id),
  labOrigin: text("lab_origin", { enum: ["iit_bombay_fedex_alfa", "iit_madras_fedex_smart_center"] }).notNull(),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const projectLinks = sqliteTable("project_links", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  url: text("url").notNull(),
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const projectTags = sqliteTable(
  "project_tags",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.tagId] }),
  })
);

export const projectContributors = sqliteTable(
  "project_contributors",
  {
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    personId: text("person_id")
      .notNull()
      .references(() => people.id, { onDelete: "cascade" }),
    associationTypeId: text("association_type_id")
      .notNull()
      .references(() => associationTypes.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.personId] }),
  })
);

import { relations } from "drizzle-orm";

export const projectsRelations = relations(projects, ({ one, many }) => ({
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
  progressStatus: one(progressStatuses, {
    fields: [projects.progressId],
    references: [progressStatuses.id],
  }),
  contributors: many(projectContributors),
  tags: many(projectTags),
}));

export const projectContributorsRelations = relations(projectContributors, ({ one }) => ({
  project: one(projects, {
    fields: [projectContributors.projectId],
    references: [projects.id],
  }),
  person: one(people, {
    fields: [projectContributors.personId],
    references: [people.id],
  }),
  associationType: one(associationTypes, {
    fields: [projectContributors.associationTypeId],
    references: [associationTypes.id],
  }),
}));

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, {
    fields: [projectTags.projectId],
    references: [projects.id],
  }),
  tag: one(tags, {
    fields: [projectTags.tagId],
    references: [tags.id],
  }),
}));
