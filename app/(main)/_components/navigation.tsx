"use client"

import { cn } from "@/lib/utils"
import {  ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import {useMediaQuery} from "usehooks-ts"
import { UserItem } from "./user-item"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Item } from "./item"
import { toast } from "sonner"
import { DocumentList } from "./document-list"


export const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.documents.create); // specify the API function for mutation

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef <"aside">>(null);
    const navbarRef = useRef<ElementRef <"div">>(null);  
    const [isResetting, setResetting] = useState(false);
    const [isCollapsed, setCollapsed] = useState(true);


    useEffect(() => {
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    useEffect(() => {
        if(isMobile){
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) =>{
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event:MouseEvent)=>{
        if(!isResizingRef.current) return;
        let newWidth = event.clientX;
        
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);

        }
    };

    const handleMouseUp = () =>{
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }


    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current){
            setCollapsed(false);
            setResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0":"calc(100%-240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%":"240px"
            );
            setTimeout(() => setResetting(false), 300);
        }
    };


    const collapse = () => {
        if(sidebarRef.current && navbarRef.current){
            setCollapsed(true);
            setResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setResetting(false), 300);
        };
    };
    const handleCreate = () => {
        const promise = create({title: "Untitled"});

        toast.promise(promise,{
            loading: "Creating A New Note...",
            success: "New Note Created :)",
            error:"Failed To Create A New Note :|"
        });
    };
    

  return (<>
    <aside ref={sidebarRef} className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
    isResetting && "transition-all ease-in-out duration-300",
    isMobile && "w-0 "
    ) }>
        <div className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
        )} role="button"  onClick={collapse}>
            <ChevronsLeft className="h-6 w-6"/>
        </div>
        <div className="">
            <UserItem/>
            <Item
                label="Search"
                icon={Search}
                isSearch
                onClick={()=>{}}
            />
            <Item
                label="Settings"
                icon={Settings}
                onClick={()=>{}}
            />  
            <Item 
                onClick={handleCreate} 
                label="New Page" 
                icon={PlusCircle}
            />
        </div>
        <div className="mt-4">
            <DocumentList/>
        </div>
        <div 
        onMouseDown={handleMouseDown}
        onClick={resetWidth}
        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"

        />

        
    </aside>
    <div className={cn(
        "absolute top-0 z-[99999] left-60 w-[100%-244px]",
        isResetting && "transition-all ease-in-out duration-300",
        isMobile && "left-0 w-full"
    )} ref={navbarRef}>
        <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon className="h-6 w-6 text-muted-foreground " role="button"  onClick={resetWidth}/> }
        </nav>
    </div>
  </>
    
  )
}
