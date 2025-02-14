"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const DocumentsPage = () => {
    const {user} = useUser();
    return ( <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image src="black-no-answer.svg" height="300" width="300" alt="Empty" className="dark:hidden" />
        <Image src="white-no-answer.svg" height="300" width="300" alt="Empty" className="hidden dark:block" />
        <h2 className="text-lg font-medium">
            Welcome To {user?.firstName}&apos;s Motion
        </h2>
        <Button>
            <PlusCircle className="h-4 w-4 mr-1"/>Create A Note
        </Button>
    </div> );
}
 
export default DocumentsPage;