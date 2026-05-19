import { db } from "@/db";
import { tags, categories, progressStatuses, associationTypes } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MetadataManager } from "@/components/manage/metadata-manager";

export default async function MetadataPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // FedEx users are view-only — no management access
  if (session.user.affiliation === "fedex" && session.user.role !== "admin") {
    redirect("/");
  }

  const [allTags, allCategories, allStatuses, allAssocTypes] = await Promise.all([
    db.select().from(tags),
    db.select().from(categories),
    db.select().from(progressStatuses),
    db.select().from(associationTypes),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/manage" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Metadata</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage tags, categories, progress statuses, and association types.
          </p>
        </div>
      </div>
      <MetadataManager
        tags={allTags}
        categories={allCategories}
        statuses={allStatuses}
        associationTypes={allAssocTypes}
      />
    </div>
  );
}
