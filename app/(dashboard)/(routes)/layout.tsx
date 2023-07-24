
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getLimitCount } from "@/lib/api-limits";
const DashboardLayout = async ({

    children

}: {
    children: React.ReactNode
}) => {

    const apiLimitCount = await getLimitCount();
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed mnd:inset-y-0 z-[80] bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount}/>
            </div>
            <main className="md:ml-64">
                <Navbar count={apiLimitCount}/>
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout;