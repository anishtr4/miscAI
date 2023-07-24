import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


const UserAvatar = () => {


    const { user } = useUser();
    return (
        <div>
            <Avatar className="h8 w-8">
                <AvatarImage src={user?.profileImageUrl} className="h-8 w-8 rounded-full" />
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default UserAvatar;