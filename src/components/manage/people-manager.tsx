"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema, PersonFormValues } from "@/lib/validations";
import { savePersonAction, deletePersonAction } from "@/lib/actions/metadata";
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
import { Badge } from "@/components/ui/badge";
import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, User, Lock } from "lucide-react";
import type { people as peopleTable } from "@/db/schema";

type Person = typeof peopleTable.$inferSelect;

const ROLES = ["prof", "researcher", "student", "staff", "admin"] as const;
const INSTITUTIONS = ["IIT Bombay", "IIT Madras", "FedEx"] as const;

// ownedInstitution: the institution this manager can edit (null = admin, can edit all)
function PersonForm({
  initialData,
  ownedInstitution,
  onSuccess,
}: {
  initialData?: Person;
  ownedInstitution: string | null;
  onSuccess: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  // For non-admins, the institution is fixed to their own
  const lockedInstitution = ownedInstitution;

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      role: initialData?.role ?? "researcher",
      department: initialData?.department ?? "",
      institution: initialData?.institution ?? (lockedInstitution as typeof INSTITUTIONS[number] | undefined) ?? undefined,
      bio: initialData?.bio ?? "",
      profileImageUrl: initialData?.profileImageUrl ?? "",
    },
  });

  const onSubmit = (data: PersonFormValues) => {
    // Enforce locked institution client-side too
    if (lockedInstitution) {
      data.institution = lockedInstitution as typeof INSTITUTIONS[number];
    }
    startTransition(async () => {
      const result = await savePersonAction(data);
      if (result?.error) {
        alert(result.error);
      } else {
        onSuccess();
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="person-name">Name *</Label>
          <Input id="person-name" {...form.register("name")} placeholder="Full name" />
          {form.formState.errors.name && (
            <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="person-email">Email</Label>
          <Input
            id="person-email"
            type="email"
            {...form.register("email")}
            placeholder="name@institution.edu"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label>Role *</Label>
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r} className="capitalize">
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-1">
          <Label className="flex items-center gap-1">
            Institution
            {lockedInstitution && <Lock className="h-3 w-3 text-muted-foreground" />}
          </Label>
          {lockedInstitution ? (
            // Non-admins: institution is fixed, show a read-only display
            <div className="flex h-9 items-center rounded-md border border-border bg-muted/50 px-3 text-sm text-muted-foreground">
              {lockedInstitution}
            </div>
          ) : (
            <Controller
              name="institution"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {INSTITUTIONS.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="person-department">Department</Label>
          <Input
            id="person-department"
            {...form.register("department")}
            placeholder="e.g. Computer Science"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="person-bio">Bio</Label>
          <Textarea
            id="person-bio"
            {...form.register("bio")}
            placeholder="Short bio..."
            rows={2}
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="person-image">Profile Image URL</Label>
          <Input
            id="person-image"
            {...form.register("profileImageUrl")}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : initialData ? "Update Person" : "Add Person"}
        </Button>
      </div>
    </form>
  );
}

export function PeopleManager({
  people,
  ownedInstitution,
}: {
  people: Person[];
  // null = admin (can manage all); string = the institution this user owns
  ownedInstitution: string | null;
}) {
  const [openAdd, setOpenAdd] = useState(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const filtered = people.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const canManage = (person: Person) =>
    ownedInstitution === null || person.institution === ownedInstitution;

  const handleDelete = (id: string) => {
    if (!confirm("Delete this person? They will be removed from all projects.")) return;
    startTransition(async () => {
      const result = await deletePersonAction(id);
      if (result?.error) alert(result.error);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger render={<Button />}>
            <Plus className="h-4 w-4 mr-2" />
            Add Person
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Person</DialogTitle>
            </DialogHeader>
            <PersonForm
              ownedInstitution={ownedInstitution}
              onSuccess={() => setOpenAdd(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editPerson} onOpenChange={(o) => !o && setEditPerson(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Person</DialogTitle>
          </DialogHeader>
          {editPerson && (
            <PersonForm
              initialData={editPerson}
              ownedInstitution={ownedInstitution}
              onSuccess={() => setEditPerson(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="rounded-md border border-border divide-y divide-border">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12 text-sm">
            {search ? "No people match your search." : "No people added yet."}
          </p>
        )}
        {filtered.map((person) => {
          const editable = canManage(person);
          return (
            <div
              key={person.id}
              className={`flex items-center gap-4 px-4 py-3 ${!editable ? "opacity-60" : ""}`}
            >
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{person.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {[person.department, person.institution].filter(Boolean).join(" · ")}
                </p>
              </div>
              <Badge variant="outline" className="capitalize text-xs shrink-0">
                {person.role}
              </Badge>
              {person.email && (
                <p className="text-xs text-muted-foreground hidden md:block truncate max-w-[180px]">
                  {person.email}
                </p>
              )}
              <div className="flex gap-1 shrink-0">
                {editable ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setEditPerson(person)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(person.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </>
                ) : (
                  <div
                    className="h-8 w-8 flex items-center justify-center text-muted-foreground/50"
                    title="You can only edit people from your own institution"
                  >
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
