"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { saveProjectAction, deleteProjectAction } from "@/lib/actions/projects";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { X, Plus, Tag, Users, Trash2 } from "lucide-react";

import type {
  categories as categoriesTable,
  progressStatuses as progressStatusesTable,
  tags as tagsTable,
  people as peopleTable,
  associationTypes as associationTypesTable,
} from "@/db/schema";

type Category = typeof categoriesTable.$inferSelect;
type ProgressStatus = typeof progressStatusesTable.$inferSelect;
type Tag = typeof tagsTable.$inferSelect;
type Person = typeof peopleTable.$inferSelect;
type AssociationType = typeof associationTypesTable.$inferSelect;

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface InitialContributor {
  personId: string;
  associationTypeId: string;
}

export function ProjectForm({
  initialData,
  categories,
  statuses,
  tags,
  people,
  associationTypes,
  initialTagIds = [],
  initialContributors = [],
}: {
  initialData?: {
    id?: string;
    title?: string;
    shortDesc?: string;
    titleCardImage?: string | null;
    detailedInfoMarkdown?: string | null;
    categoryId?: string | null;
    progressId?: string | null;
    isPublished?: boolean;
  };
  categories: Category[];
  statuses: ProgressStatus[];
  tags: Tag[];
  people: Person[];
  associationTypes: AssociationType[];
  initialTagIds?: string[];
  initialContributors?: InitialContributor[];
}) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [tagSearch, setTagSearch] = useState("");
  const [peopleSearch, setPeopleSearch] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: initialData?.id ?? undefined,
      title: initialData?.title ?? "",
      shortDesc: initialData?.shortDesc ?? "",
      titleCardImage: initialData?.titleCardImage ?? "",
      detailedInfoMarkdown: initialData?.detailedInfoMarkdown ?? "",
      categoryId: initialData?.categoryId ?? "",
      progressId: initialData?.progressId ?? "",
      isPublished: initialData?.isPublished ?? false,
      tagIds: initialTagIds,
      contributors: initialContributors,
    },
  });

  const { fields: contributorFields, append: appendContributor, remove: removeContributor } =
    useFieldArray({ control: form.control, name: "contributors" });

  const selectedTagIds = form.watch("tagIds");

  const toggleTag = (tagId: string) => {
    const current = form.getValues("tagIds");
    if (current.includes(tagId)) {
      form.setValue("tagIds", current.filter((id) => id !== tagId));
    } else {
      form.setValue("tagIds", [...current, tagId]);
    }
  };

  const filteredTags = tags.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const filteredPeople = people.filter(
    (p) =>
      p.name.toLowerCase().includes(peopleSearch.toLowerCase()) &&
      !contributorFields.some((c) => c.personId === p.id)
  );

  const onSubmit = (data: ProjectFormValues) => {
    startTransition(async () => {
      const result = await saveProjectAction(data);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Project Title</Label>
          <Input id="title" {...form.register("title")} placeholder="Enter project title" />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="shortDesc">Short Description</Label>
          <Textarea
            id="shortDesc"
            {...form.register("shortDesc")}
            placeholder="A brief summary of the project..."
            rows={3}
          />
          {form.formState.errors.shortDesc && (
            <p className="text-sm text-destructive">{form.formState.errors.shortDesc.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger>
                  <SelectValue>
                    {field.value
                      ? (categories.find((c) => c.id === field.value)?.name ?? "Select Category")
                      : "Select Category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[260px]">
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.categoryId && (
            <p className="text-sm text-destructive">{form.formState.errors.categoryId.message}</p>
          )}
        </div>

        {/* Progress Status */}
        <div className="space-y-2">
          <Label>Progress Status</Label>
          <Controller
            name="progressId"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger>
                  <SelectValue>
                    {field.value
                      ? (statuses.find((s) => s.id === field.value)?.statusName ?? "Select Status")
                      : "Select Status"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[260px]">
                  {statuses.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.statusName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.progressId && (
            <p className="text-sm text-destructive">{form.formState.errors.progressId.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-3 md:col-span-2">
          <Label className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </Label>
          <div className="border border-border rounded-lg p-4 space-y-3">
            {/* Selected tags */}
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
              {selectedTagIds.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No tags selected</p>
              )}
              {selectedTagIds.map((id) => {
                const tag = tags.find((t) => t.id === id);
                return tag ? (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/10 hover:text-destructive gap-1"
                    onClick={() => toggleTag(id)}
                  >
                    {tag.name}
                    <X className="h-3 w-3" />
                  </Badge>
                ) : null;
              })}
            </div>
            {/* Tag search + picker */}
            <Input
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="h-8 text-sm"
            />
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {filteredTags
                .filter((t) => !selectedTagIds.includes(t.id))
                .map((t) => (
                  <Badge
                    key={t.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary"
                    onClick={() => toggleTag(t.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {t.name}
                  </Badge>
                ))}
              {filteredTags.filter((t) => !selectedTagIds.includes(t.id)).length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  {tagSearch ? "No matching tags" : "All tags selected"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contributors */}
        <div className="space-y-3 md:col-span-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Associated People
          </Label>
          <div className="border border-border rounded-lg p-4 space-y-4">
            {/* Current contributors list */}
            {contributorFields.length > 0 && (
              <div className="space-y-2">
                {contributorFields.map((field, index) => {
                  const person = people.find((p) => p.id === field.personId);
                  const assocType = associationTypes.find(
                    (a) => a.id === field.associationTypeId
                  );
                  return (
                    <div
                      key={field.id}
                      className="flex items-center gap-3 bg-muted/50 rounded-md px-3 py-2"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{person?.name ?? "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{person?.institution ?? ""}</p>
                      </div>
                      {/* Association type selector */}
                      <Controller
                        name={`contributors.${index}.associationTypeId`}
                        control={form.control}
                        render={({ field: f }) => (
                          <Select onValueChange={f.onChange} value={f.value}>
                            <SelectTrigger className="h-7 w-36 text-xs">
                              <SelectValue>
                                {associationTypes.find((a) => a.id === f.value)?.name ?? "Role"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {associationTypes.map((a) => (
                                <SelectItem key={a.id} value={a.id} className="text-xs">
                                  {a.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeContributor(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add person */}
            <div className="space-y-2">
              <Input
                placeholder="Search people by name..."
                value={peopleSearch}
                onChange={(e) => setPeopleSearch(e.target.value)}
                className="h-8 text-sm"
              />
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {filteredPeople.length === 0 && (
                  <p className="text-sm text-muted-foreground italic px-1">
                    {peopleSearch ? "No matching people" : "No more people to add"}
                  </p>
                )}
                {filteredPeople.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-md hover:bg-muted text-sm transition-colors"
                    onClick={() => {
                      appendContributor({
                        personId: p.id,
                        associationTypeId: associationTypes[0]?.id ?? "",
                      });
                      setPeopleSearch("");
                    }}
                  >
                    <Plus className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{p.name}</span>
                    {p.institution && (
                      <span className="text-xs text-muted-foreground ml-auto">{p.institution}</span>
                    )}
                    {p.role && (
                      <Badge variant="outline" className="text-xs ml-1 capitalize">
                        {p.role}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Title card image */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="titleCardImage">Title Card Image URL (Optional)</Label>
          <Input
            id="titleCardImage"
            {...form.register("titleCardImage")}
            placeholder="https://..."
          />
          {form.formState.errors.titleCardImage && (
            <p className="text-sm text-destructive">
              {form.formState.errors.titleCardImage.message}
            </p>
          )}
        </div>

        {/* Markdown editor */}
        <div className="space-y-2 md:col-span-2">
          <Label>Detailed Information (Markdown)</Label>
          <div
            data-color-mode="light"
            className="border border-border rounded-md overflow-hidden dark:data-[color-mode='light']:dark"
          >
            <Controller
              name="detailedInfoMarkdown"
              control={form.control}
              render={({ field }) => (
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                  className="w-full"
                />
              )}
            />
          </div>
          {form.formState.errors.detailedInfoMarkdown && (
            <p className="text-sm text-destructive">
              {form.formState.errors.detailedInfoMarkdown.message}
            </p>
          )}
        </div>

        {/* Publish toggle */}
        <div className="space-y-2 md:col-span-2 flex items-center space-x-3 bg-muted/50 p-4 rounded-lg border border-border">
          <Controller
            name="isPublished"
            control={form.control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} id="isPublished" />
            )}
          />
          <div>
            <Label htmlFor="isPublished" className="font-semibold text-base">
              Publish Project
            </Label>
            <p className="text-sm text-muted-foreground">
              If published, the project will be visible on the public dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Danger zone — delete project (edit mode only) */}
      {initialData?.id && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-destructive">Danger Zone</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permanently delete this project. This action cannot be undone.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-destructive/50 text-destructive hover:bg-destructive hover:text-white"
            disabled={isDeleting}
            onClick={() => {
              if (
                !confirm(
                  `Delete "${initialData.title}"? This cannot be undone.`
                )
              )
                return;
              startDeleteTransition(async () => {
                const result = await deleteProjectAction(initialData.id!);
                if (result?.error) alert(result.error);
              });
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Project"}
        </Button>
      </div>
    </form>
  );
}
