"use client";

import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })
import {usePathname} from "next/navigation"

const routes = [{
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500'
},
{
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500'
},
{
    label: 'Generate Image',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700'
},
{
    label: 'Generate Video',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700'
},
{
    label: 'Generate Music',
    icon: MusicIcon,
    href: '/music',
    color: 'text-emarald-700'
},
{
    label: 'Generate Code',
    icon: CodeIcon,
    href: '/code',
    color: 'text-green-700'
},{
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings'
}]
const Sidebar = () => {

    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">

            <div className="px-3 px-2 flex-1">
                
                <Link href="/dashboard" className="flex items-center pl-3 md-14">
                    <div className="rlative w-8 h8 mr-4">

                        {/* <Image fill alt="logo" src="/logo.png" /> */}
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>

                        miscAI
                    </h1>
                </Link>

                <div className="space-y-1 mt-10">

                    {routes.map((route) => (
                        <Link href={route.href} key={route.href} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathname == route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex item-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Sidebar;