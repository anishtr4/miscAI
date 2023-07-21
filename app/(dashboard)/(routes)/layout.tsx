
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
const DashboardLayout = ({

    children

}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed mnd:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:ml-64">
                <Navbar />
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout;