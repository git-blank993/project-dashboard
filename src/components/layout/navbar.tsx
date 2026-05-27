import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Boxes } from "lucide-react";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center px-4 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
            <Boxes className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2} />
          </div>
          <span className="hidden font-bold text-base sm:inline-block tracking-tight">
            IIT-FedEx <span className="text-primary">Projects</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 text-sm font-medium flex-1">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-md transition-colors hover:bg-accent text-foreground/65 hover:text-foreground"
          >
            Dashboard
          </Link>
          {(user?.role === "admin" || user?.role === "manager") && (
            <Link
              href="/manage"
              className="px-3 py-1.5 rounded-md transition-colors hover:bg-accent text-foreground/65 hover:text-foreground"
            >
              Manage Projects
            </Link>
          )}
        </nav>

        {/* Right side */}
        <nav className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 transition-all hover:ring-primary/50">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60" align="end" sideOffset={8}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col gap-0.5 py-0.5">
                      <p className="text-sm font-semibold leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {(user.role === "admin" || user.role === "manager") && (
                  <DropdownMenuItem>
                    <Link href="/manage" className="w-full cursor-pointer">Manager Portal</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Link href="/register" className="w-full cursor-pointer">Register New User</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form action={logoutAction} className="w-full">
                    <button className="w-full text-left text-sm" type="submit">Log out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

