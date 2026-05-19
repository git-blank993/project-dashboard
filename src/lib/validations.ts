import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  titleCardImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  shortDesc: z.string().min(10, "Short description must be at least 10 characters"),
  detailedInfoMarkdown: z.string().min(10, "Detailed information must be provided"),
  categoryId: z.string().min(1, "Category is required"),
  progressId: z.string().min(1, "Progress status is required"),
  isPublished: z.boolean(),
  tagIds: z.array(z.string()),
  contributors: z.array(
    z.object({
      personId: z.string(),
      associationTypeId: z.string(),
    })
  ),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

// ---------- metadata schemas ----------

export const personSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  role: z.enum(["prof", "researcher", "student", "staff", "admin"]),
  department: z.string().optional().or(z.literal("")),
  institution: z.enum(["IIT Bombay", "IIT Madras", "FedEx"]).optional(),
  bio: z.string().optional().or(z.literal("")),
  profileImageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type PersonFormValues = z.infer<typeof personSchema>;

export const simpleNameSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});

export type SimpleNameFormValues = z.infer<typeof simpleNameSchema>;

export const statusSchema = z.object({
  id: z.string().optional(),
  statusName: z.string().min(1, "Status name is required"),
});

export type StatusFormValues = z.infer<typeof statusSchema>;
