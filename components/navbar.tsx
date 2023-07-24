import { Button } from "@/components/ui/button";

import { UserButton } from '@clerk/nextjs';
import { getLimitCount } from "@/lib/api-limits";import MobileSidebar from "@/components/mobile-sidebar";

interface apiLimitCount {
    count: number
}
const Navbar = async ({count}:apiLimitCount) => {




    return (
        <div className="flex item-center p-4">
            <MobileSidebar count={count}/>
            <div className="flex w-full  justify-end">
                <UserButton afterSignOutUrl="/" />
            </div></div>
    )
}
export default Navbar;