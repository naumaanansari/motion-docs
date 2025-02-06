"use client"

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top"
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";



export const Navbar = () => {
    const { isAuthenticated, isLoading }= useConvexAuth();
    const scrolled = useScrollTop();
  return (
    <div className={cn("z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
        <Logo/>
        <div className="md:ml-auto md:justify-end justify-around w-full flex items-center gap-x-2 ">
            {isLoading && (
              <Spinner></Spinner>
            )}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </SignInButton>

                <SignInButton mode="modal">
                  <Button size="sm">
                    Get Motion Free
                  </Button>
                </SignInButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
              <Button variant="ghost" size="sm" asChild>
                    <Link href="/documents">Enter Motion</Link>
              </Button>
              <UserButton afterSignOutUrl="/"/> 
          </>
            )}
            <ModeToggle></ModeToggle>
        </div>
    </div>
  )
}
