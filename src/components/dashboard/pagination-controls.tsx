"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          router.push(`${pathname}?${createQueryString("page", String(currentPage - 1))}`);
        }}
        disabled={currentPage <= 1}
        className="bg-card hover:bg-muted/50 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      <div className="text-sm text-muted-foreground mx-4">
        Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          router.push(`${pathname}?${createQueryString("page", String(currentPage + 1))}`);
        }}
        disabled={currentPage >= totalPages}
        className="bg-card hover:bg-muted/50 transition-colors"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
