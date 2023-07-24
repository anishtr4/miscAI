"use client"

import * as z from "zod"
import { Heading } from "@/components/heading";
import { CodeIcon, Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { amountOptions, resolutionOptions, formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { currentUser } from "@clerk/nextjs/dist/types/server-helpers.server";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
// import { Select, SelectContent, SelectItem } from "@radix-ui/react-select";
const ImagePage = () => {
    const router = useRouter();

    // const [message, setMessages] = useState<ChatCompletionRequestMessage[]>([])
    const [images, setImages] = useState<string[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {

            setImages([]);
            const response = await axios.post("/api/image", values)


            const urls = response.data.map((image: { url: string }) => image.url)
            setImages(urls);

            // setMessages((current) => [...current, userMessage, response.data])
            form.reset();
        } catch (error: any) {
            // TODO pro feature
            console.log(error)
        }
        finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Heading title="Image Generation" description="Generate a image usign prompt" icon={ImageIcon} iconColor="text-pink-700" bgColor="bg-pink-700/10" />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >


                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Image of iorn man"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"

                                render={({ field }) => (

                                    <FormItem className="col-span-12 lg:col-span-2 w-full">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}

                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}>

                                                    </SelectValue>
                                                </SelectTrigger>


                                            </FormControl>

                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.lable}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"

                                render={({ field }) => (

                                    <FormItem className="col-span-12 lg:col-span-2 w-full">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}

                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}>

                                                    </SelectValue>
                                                </SelectTrigger>


                                            </FormControl>

                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.lable}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>

                                )}
                            />

                            <Button type="submit" className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>

                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )

                    }
                    {images.length === 0 && !isLoading &&

                        <Empty label='No Images' />
                    }
                    <div className="grid grid-col- md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
               

                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image alt="image" fill src={src} />

                                </div>
                                <CardFooter className="p-2">
                                    <Button variant="secondary" className="w-full" onClick={() => window.open(src)}>
                                        <Download className="h-4 w-4 mr-2">
                                            Download
                                        </Download>
                                    </Button>
                                </CardFooter>


                            </Card>
                        ))

                        }
                    </div>
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
                                            <code className="bg-black/10 rounded-lg p-1" {...props}/>

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
export default ImagePage;