import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { MarkdownPreview } from "@/components/dashboard/markdown-preview";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const project = await db.query.projects.findFirst({
    where: eq(projects.id, params.id),
    with: {
      category: true,
      progressStatus: true,
      tags: {
        with: { tag: true },
      },
      contributors: {
        with: {
          person: true,
          associationType: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  // Group contributors
  const leadProfs = project.contributors.filter(c => c.associationType?.name === "Lead Professor");
  const researchers = project.contributors.filter(c => c.associationType?.name === "Researcher" || c.associationType?.name === "Student");

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {project.category?.name || "Uncategorized"}
          </Badge>
          <Badge variant="outline" className="text-sm border-primary/20 text-primary">
            {project.progressStatus?.statusName || "Unknown"}
          </Badge>
          <span className="text-sm text-muted-foreground ml-auto uppercase tracking-wider font-medium">
            {project.labOrigin === "iit_bombay_fedex_alfa" ? "IIT Bombay FedEx Alfa" : "IIT Madras FedEx Smart Center"}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-xl text-muted-foreground">{project.shortDesc}</p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map(t => (
              <Badge key={t.tag.id} variant="secondary" className="bg-secondary/50">
                {t.tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {project.titleCardImage && (
        <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-12 shadow-lg">
          <img
            src={project.titleCardImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="w-full">
            <MarkdownPreview source={project.detailedInfoMarkdown || ""} />
          </div>
        </div>

        <div className="space-y-8">
          {leadProfs.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-muted-foreground border-b pb-2">Project Leadership</h3>
              <div className="space-y-4">
                {leadProfs.map(c => (
                  <Card key={c.person.id} className="border-border shadow-sm">
                    <CardContent className="p-4 flex items-start space-x-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={c.person.profileImageUrl || undefined} />
                        <AvatarFallback>{c.person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{c.person.name}</p>
                        <p className="text-sm text-muted-foreground">{c.person.institution}</p>
                        {c.person.department && (
                          <p className="text-xs text-muted-foreground mt-1">{c.person.department}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {researchers.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-muted-foreground border-b pb-2">Research Team</h3>
              <div className="grid grid-cols-1 gap-3">
                {researchers.map(c => (
                  <div key={c.person.id} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={c.person.profileImageUrl || undefined} />
                      <AvatarFallback className="text-xs">{c.person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{c.person.name}</p>
                      <p className="text-xs text-muted-foreground">{c.associationType?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If there were projectLinks, we would map them here */}
        </div>
      </div>
    </div>
  );
}
