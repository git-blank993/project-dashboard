import { db } from "@/db";
import { people } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PeopleManager } from "@/components/manage/people-manager";
import { eq } from "drizzle-orm";

// Maps user affiliation → institution value stored in the people table
const AFFILIATION_TO_INSTITUTION = {
  iitb: "IIT Bombay",
  iitm: "IIT Madras",
} as const;

export default async function PeoplePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { role, affiliation } = session.user;

  // FedEx users are view-only — no management access
  if (affiliation === "fedex" && role !== "admin") {
    redirect("/");
  }

  // Admins see all people; institution managers only see their own
  const allPeople =
    role === "admin"
      ? await db.select().from(people)
      : await db
          .select()
          .from(people)
          .where(
            eq(
              people.institution,
              AFFILIATION_TO_INSTITUTION[
                affiliation as keyof typeof AFFILIATION_TO_INSTITUTION
              ] ?? "IIT Bombay"
            )
          );

  // The institution this manager is allowed to create/edit people for
  const ownedInstitution =
    role === "admin"
      ? null // admin can pick any institution
      : AFFILIATION_TO_INSTITUTION[
          affiliation as keyof typeof AFFILIATION_TO_INSTITUTION
        ] ?? null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/manage" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage People</h1>
          <p className="text-muted-foreground mt-1">
            {role === "admin"
              ? "All institutions — create and manage researchers, professors and staff."
              : `Managing people from ${ownedInstitution}. You can only add or edit people from your own institution.`}
          </p>
        </div>
      </div>
      <PeopleManager people={allPeople} ownedInstitution={ownedInstitution} />
    </div>
  );
}
