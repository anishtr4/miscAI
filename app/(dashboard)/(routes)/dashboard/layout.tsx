import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
const layout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full relative">


            <div className="hidden h-full md:flex md:w-82 md:flex-col md:fixed mnd:inset-y-0 z-[80] bg-gray-900">
                <div>
                  <Sidebar/>
                </div>


            </div>
            <main className="md:pl-82">
                <Navbar />
                {children}
            </main>
        </div>
    )
}
export default layout;