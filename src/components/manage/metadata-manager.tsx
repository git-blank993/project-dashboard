"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simpleNameSchema, statusSchema, SimpleNameFormValues, StatusFormValues } from "@/lib/validations";
import {
  saveTagAction,
  deleteTagAction,
  saveCategoryAction,
  deleteCategoryAction,
  saveStatusAction,
  deleteStatusAction,
  saveAssociationTypeAction,
  deleteAssociationTypeAction,
} from "@/lib/actions/metadata";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import type {
  tags as tagsTable,
  categories as categoriesTable,
  progressStatuses as progressStatusesTable,
  associationTypes as associationTypesTable,
} from "@/db/schema";

type Tag = typeof tagsTable.$inferSelect;
type Category = typeof categoriesTable.$inferSelect;
type ProgressStatus = typeof progressStatusesTable.$inferSelect;
type AssociationType = typeof associationTypesTable.$inferSelect;

// ─── Generic simple-name entity list (tags, categories, association types) ──

type SimpleItem = { id: string; name: string };

function SimpleItemList({
  label,
  items,
  onAdd,
  onEdit,
  onDelete,
}: {
  label: string;
  items: SimpleItem[];
  onAdd: (name: string) => Promise<{ error?: string } | void | undefined>;
  onEdit: (id: string, name: string) => Promise<{ error?: string } | void | undefined>;
  onDelete: (id: string) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    startTransition(async () => {
      const result = await onAdd(inputValue.trim());
      if (result?.error) alert(result.error);
      else {
        setInputValue("");
        setAdding(false);
      }
    });
  };

  const handleEdit = (id: string) => {
    if (!editValue.trim()) return;
    startTransition(async () => {
      const result = await onEdit(id, editValue.trim());
      if (result?.error) alert(result.error);
      else setEditingId(null);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{label}</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setAdding(true); setInputValue(""); }}
          disabled={adding}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>

      {adding && (
        <div className="flex gap-2">
          <Input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`New ${label.toLowerCase()} name`}
            className="h-8 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setAdding(false);
            }}
          />
          <Button size="sm" className="h-8" onClick={handleAdd} disabled={isPending}>
            <Check className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8" onClick={() => setAdding(false)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="rounded-md border border-border divide-y divide-border">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-6">
            No {label.toLowerCase()} yet.
          </p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 px-3 py-2">
            {editingId === item.id ? (
              <>
                <Input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-7 text-sm flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEdit(item.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
                <Button size="sm" className="h-7 px-2" onClick={() => handleEdit(item.id)} disabled={isPending}>
                  <Check className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setEditingId(null)}>
                  <X className="h-3 w-3" />
                </Button>
              </>
            ) : (
              <>
                <span className="text-sm flex-1">{item.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => { setEditingId(item.id); setEditValue(item.name); }}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(item.id)}
                  disabled={isPending}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Status list (statusName instead of name) ────────────────────────────────

function StatusList({ statuses }: { statuses: ProgressStatus[] }) {
  const [isPending, startTransition] = useTransition();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    startTransition(async () => {
      const result = await saveStatusAction({ statusName: inputValue.trim() });
      if (result?.error) alert(result.error);
      else { setInputValue(""); setAdding(false); }
    });
  };

  const handleEdit = (id: string) => {
    if (!editValue.trim()) return;
    startTransition(async () => {
      const result = await saveStatusAction({ id, statusName: editValue.trim() });
      if (result?.error) alert(result.error);
      else setEditingId(null);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Progress Statuses</h3>
        <Button size="sm" variant="outline" onClick={() => { setAdding(true); setInputValue(""); }} disabled={adding}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add
        </Button>
      </div>

      {adding && (
        <div className="flex gap-2">
          <Input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="New status name"
            className="h-8 text-sm"
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAdding(false); }}
          />
          <Button size="sm" className="h-8" onClick={handleAdd} disabled={isPending}><Check className="h-3.5 w-3.5" /></Button>
          <Button size="sm" variant="ghost" className="h-8" onClick={() => setAdding(false)}><X className="h-3.5 w-3.5" /></Button>
        </div>
      )}

      <div className="rounded-md border border-border divide-y divide-border">
        {statuses.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-6">No statuses yet.</p>
        )}
        {statuses.map((s) => (
          <div key={s.id} className="flex items-center gap-2 px-3 py-2">
            {editingId === s.id ? (
              <>
                <Input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-7 text-sm flex-1"
                  onKeyDown={(e) => { if (e.key === "Enter") handleEdit(s.id); if (e.key === "Escape") setEditingId(null); }}
                />
                <Button size="sm" className="h-7 px-2" onClick={() => handleEdit(s.id)} disabled={isPending}><Check className="h-3 w-3" /></Button>
                <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setEditingId(null)}><X className="h-3 w-3" /></Button>
              </>
            ) : (
              <>
                <span className="text-sm flex-1">{s.statusName}</span>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setEditingId(s.id); setEditValue(s.statusName); }}><Pencil className="h-3 w-3" /></Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" onClick={() => { if (confirm("Delete this status?")) startTransition(() => deleteStatusAction(s.id)); }} disabled={isPending}><Trash2 className="h-3 w-3" /></Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const TABS = ["Tags", "Categories", "Progress Statuses", "Association Types"] as const;
type Tab = (typeof TABS)[number];

export function MetadataManager({
  tags,
  categories,
  statuses,
  associationTypes,
}: {
  tags: Tag[];
  categories: Category[];
  statuses: ProgressStatus[];
  associationTypes: AssociationType[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Tags");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Tags" && (
        <SimpleItemList
          label="Tags"
          items={tags}
          onAdd={(name) => saveTagAction({ name })}
          onEdit={(id, name) => saveTagAction({ id, name })}
          onDelete={(id) => {
            if (confirm("Delete this tag? It will be removed from all projects."))
              startTransition(() => deleteTagAction(id));
          }}
        />
      )}

      {activeTab === "Categories" && (
        <SimpleItemList
          label="Categories"
          items={categories}
          onAdd={(name) => saveCategoryAction({ name })}
          onEdit={(id, name) => saveCategoryAction({ id, name })}
          onDelete={(id) => {
            if (confirm("Delete this category?"))
              startTransition(() => deleteCategoryAction(id));
          }}
        />
      )}

      {activeTab === "Progress Statuses" && (
        <StatusList statuses={statuses} />
      )}

      {activeTab === "Association Types" && (
        <SimpleItemList
          label="Association Types"
          items={associationTypes}
          onAdd={(name) => saveAssociationTypeAction({ name })}
          onEdit={(id, name) => saveAssociationTypeAction({ id, name })}
          onDelete={(id) => {
            if (confirm("Delete this association type?"))
              startTransition(() => deleteAssociationTypeAction(id));
          }}
        />
      )}
    </div>
  );
}
