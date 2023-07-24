import Image from "next/image"




const Loader = () => {
    return (
        <div className="h-gull flex felx-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
            <Image alt="Empty" fill src="/logo.png"/>
                </div>
        </div>
    )
}

export { Loader }