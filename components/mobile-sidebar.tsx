"use client";

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Sidebar from "@/components/sidebar"
const MobileSidebar = () => {

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true));

    if (!hasMounted) return null;

    return (
        <Sheet>
            <SheetTrigger asChild>

                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />

                </Button>

            </SheetTrigger>
            <SheetContent side='left' className="p-0"> 
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
export default MobileSidebar;