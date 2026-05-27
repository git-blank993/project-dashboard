"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Search, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_TITLE_LENGTH = 55;

function truncateTitle(title: string) {
  if (title.length > MAX_TITLE_LENGTH) {
    return title.substring(0, MAX_TITLE_LENGTH) + "...";
  }
  return title;
}

export function ProjectsTable({ projects }: { projects: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedVisibility, setSelectedVisibility] = useState("all");

  // Extract unique categories and statuses from the projects list
  const uniqueCategories = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => {
      if (p.category) {
        map.set(p.category.id, p.category);
      }
    });
    return Array.from(map.values()) as any[];
  }, [projects]);

  const uniqueStatuses = useMemo(() => {
    const map = new Map();
    projects.forEach((p) => {
      if (p.progressStatus) {
        map.set(p.progressStatus.id, p.progressStatus);
      }
    });
    return Array.from(map.values()) as any[];
  }, [projects]);

  // Compute filtered list of projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchLower) ||
        (project.shortDesc && project.shortDesc.toLowerCase().includes(searchLower)) ||
        (project.category?.name && project.category.name.toLowerCase().includes(searchLower)) ||
        (project.progressStatus?.statusName && project.progressStatus.statusName.toLowerCase().includes(searchLower));

      // 2. Category filter
      const matchesCategory =
        selectedCategory === "all" || project.categoryId === selectedCategory;

      // 3. Status filter
      const matchesStatus =
        selectedStatus === "all" || project.progressId === selectedStatus;

      // 4. Visibility filter
      const matchesVisibility =
        selectedVisibility === "all" ||
        (selectedVisibility === "published" && project.isPublished) ||
        (selectedVisibility === "draft" && !project.isPublished);

      return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus, selectedVisibility]);

  const hasActiveFilters =
    !!searchTerm ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    selectedVisibility !== "all";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedVisibility("all");
  };

  return (
    <div className="space-y-6">
      {/* ── Search & Filters Row ── */}
      <div className="rounded-2xl border border-border/70 bg-card shadow-sm overflow-hidden">
        {/* Top purple/violet accent strip matching the main dashboard filter */}
        <div className="h-0.5 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

        <div className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="project-search"
                placeholder="Search by keyword, title, category or status…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-9 bg-muted/40 border-border/60 focus-visible:bg-background transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Separator */}
            <div className="hidden sm:block h-8 w-px bg-border/60 shrink-0" />

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val || "all")}>
              <SelectTrigger
                id="category-filter"
                className="w-full sm:w-[180px] bg-muted/40 border-border/60 shrink-0"
              >
                <SelectValue>
                  {selectedCategory !== "all"
                    ? uniqueCategories.find((c) => c.id === selectedCategory)?.name ?? "Categories"
                    : "Categories"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="min-w-[200px]">
                <SelectItem value="all">Categories</SelectItem>
                {uniqueCategories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Select */}
            <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val || "all")}>
              <SelectTrigger
                id="status-filter"
                className="w-full sm:w-[160px] bg-muted/40 border-border/60 shrink-0"
              >
                <SelectValue>
                  {selectedStatus !== "all"
                    ? uniqueStatuses.find((s) => s.id === selectedStatus)?.statusName ?? "Status"
                    : "Status"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                {uniqueStatuses.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.statusName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Visibility Select */}
            <Select value={selectedVisibility} onValueChange={(val) => setSelectedVisibility(val || "all")}>
              <SelectTrigger
                id="visibility-filter"
                className="w-full sm:w-[150px] bg-muted/40 border-border/60 shrink-0"
              >
                <SelectValue>
                  {selectedVisibility !== "all"
                    ? (selectedVisibility === "published" ? "Published" : "Draft")
                    : "Visibility"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Visibility</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filter Stats and Reset Button */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""} found
              </span>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/75 transition-colors"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Projects Table ── */}
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  {hasActiveFilters ? "No projects match your active filters." : "No projects found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="font-medium max-w-[400px] truncate"
                    title={project.title}
                  >
                    {truncateTitle(project.title)}
                  </TableCell>
                  <TableCell>{project.category?.name || "None"}</TableCell>
                  <TableCell>
                    {project.progressStatus?.statusName || "None"}
                  </TableCell>
                  <TableCell>
                    {project.isPublished ? (
                      <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 dark:text-green-400">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 p-0 rounded-md hover:bg-accent hover:text-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring inline-flex items-center justify-center">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Link href={`/projects/${project.id}`} className="flex w-full items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              View Public
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={`/manage/projects/${project.id}/edit`} className="flex w-full items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Project
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
