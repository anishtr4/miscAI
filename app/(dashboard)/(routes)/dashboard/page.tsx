"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, CodeIcon, ImageIcon, MessageSquareIcon, MusicIcon, VideoIcon } from 'lucide-react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'


const DashboardPage = () => {

    const tools = [{
        lable: "Conversation",
        icon: MessageSquareIcon,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"

    }, {
        lable: "Generate Music",
        icon: MusicIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/music"

    }, {
        lable: "Generate Image",
        icon: ImageIcon,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        href: "/image"

    }, {
        lable: "Generate Video",
        icon: VideoIcon,
        color: "text-emerald-700",
        bgColor: "bg-orange-700/10",
        href: "/video"

    }, {
        lable: "Generate Video",
        icon: CodeIcon,
        color: "text-green-700",
        bgColor: "bg-green-700/10",
        href: "/code"

    }]
const router = useRouter();
    return (

        <div>
            <div className='mb-8 sapce-y-4'>
                <h2 className='text-2xl md:text-4xl font-bold text-center'> Explore miscAI</h2>
                <p className='text-muted-foreground text-center font-light text-sm md:text-lg '> Chat with smart ai</p>

            </div>
            <div className='mx-4 md:px-32 lg:px-32 space-y-4'>

                {tools.map((tool) => (
                    <Card key={tool.href} className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer" onClick={()=> router.push(tool.href)}>

                        <div className='flex items-center gap-x-4'>
                            <div className={cn("p-2 e-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h8", tool.color)} />


                            </div>
                            <div className='font-semibold'>
                                {tool.lable}
                            </div>
                        </div>
                        <ArrowRight className='w-5 h-5' />
                    </Card>
                ))}
            </div>
        </div>
    )


}

export default DashboardPage;
