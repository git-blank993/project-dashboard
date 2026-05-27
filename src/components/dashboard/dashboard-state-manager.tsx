"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function DashboardStateManager() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    const currentQuery = searchParams.toString();
    
    if (!hasMounted.current) {
      hasMounted.current = true;
      const savedQuery = localStorage.getItem("fedex_dashboard_state");
      
      // If there are no query parameters in the URL right now, but we have a saved state
      // it means the user visited the root URL cleanly. Let's restore their state.
      if (currentQuery === "" && savedQuery) {
        router.replace(`${pathname}?${savedQuery}`);
        return; // Return early so we don't immediately overwrite local storage with ""
      }
    }

    // On subsequent renders, keep local storage in sync with whatever the URL is.
    // If the user clears all filters, currentQuery will be "", which will save as "" and effectively clear the persistence.
    localStorage.setItem("fedex_dashboard_state", currentQuery);
  }, [searchParams, pathname, router]);

  return null;
}
