"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "./ui/badge";
import { Check, CodeIcon, ImageIcon, MessageSquareIcon, MusicIcon, VideoIcon, Zap } from 'lucide-react'
import { map } from "zod";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [{
    lable: "Conversation",
    icon: MessageSquareIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",


}, {
    lable: "Generate Music",
    icon: MusicIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",


}, {
    lable: "Generate Image",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",


}, {
    lable: "Generate Video",
    icon: VideoIcon,
    color: "text-emerald-700",
    bgColor: "bg-orange-700/10",


}, {
    lable: "Generate Video",
    icon: CodeIcon,
    color: "text-green-700",
    bgColor: "bg-green-700/10",


}]

export const ProModal = () => {


    const proModal = useProModal();



    return (

        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Upgrade to pro
                                <Badge variant='upgrade' className="uppercase text-sm py-1">
                                    Pro
                                </Badge>
                            </div>

                        </DialogTitle>

                        <DialogDescription className="text-centre pt-2 space-y-2 text-zinc-900 font-medium">
                            {tools.map((tool) => (
                                <Card key={tool.lable} className="p-3 border-black/5 flex items-center justify-between ">
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6", tool.bgColor)} />

                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.lable}
                                        </div>
                                    </div>

                                    <Check className="text-primary w-5 h-5"/>
                                </Card>

                            ))}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button size="lg"
                        variant="upgrade"
                        className="w-full"
                        >
                            Upgrade
                            <Zap className="w-4 g-4 ml-2 fill-white"/>
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )

}