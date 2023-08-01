"use client"

import * as z from "zod"
import { Heading } from "@/components/heading";
import { CodeIcon, MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { currentUser } from "@clerk/nextjs/dist/types/server-helpers.server";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
const MusicPage = () => {
    const proModal = useProModal();

    const router = useRouter();

    // const [message, setMessages] = useState<ChatCompletionRequestMessage[]>([])
    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {

            setMusic(undefined);


            const response = await axios.post("/api/music", values)

            setMusic(response.data.audio)
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
        }
        finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Heading title="Music Generation" description="Get your desired music using prompt" icon={MusicIcon} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >


                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Guitar peak"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>

                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )

                    }
                    {!music && !isLoading &&

                        <Empty label='No Music' />
                    }

                    {music && (
                        <audio
                            controls
                            className="w-full mt-8"
                            src={music}>

                        </audio>
                    )}


                    {/* <div className="flex flex-col-reverse gap-y-4">
                        {message.map((message) => (
                            <div
                                key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role == "user" ? "bg-white border border-black/10" : "bg-muted")}
                            >{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}


                                <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className="bg-black/10 rounded-lg p-1" {...props} />

                                        )

                                    }}
                                    className="text-sm overflow-hidden leading-7">
                                    {message.content || ""}
                                </ReactMarkdown>



                            </div>
                        ))}
                    </div> */}


                </div>

            </div>
        </div>
    )
}
export default MusicPage;