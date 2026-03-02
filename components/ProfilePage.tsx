"use client"

import { useEffect, useState } from "react";
import { useLogout } from "@/app/util/service/logoutAPI";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ERROR_MESSAGE } from "@/app/util/constant";
import { LogOut } from "lucide-react";
import { ROUTE } from "@/app/util/pageRoutes";

function ProfilePage() {
    const logout = useLogout();
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(ROUTE.API.USER);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error(ERROR_MESSAGE.FAILED_TO_FETCH_USER, error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return (
        <div className="flex items-center justify-center min-h-[75vh] p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-24 w-24 rounded-full" />

                    <div className="space-y-2 w-full flex flex-col items-center">
                        <Skeleton className="h-8 w-[50%]" />

                        <Skeleton className="h-4 w-[65%]" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator />
                    <div className="grid gap-2 py-2">
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-32" />

                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-[75vh] p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24 border-2 border-primary/10">
                        <AvatarImage src={user.image} alt={user.username} />

                    </Avatar>
                    <div className="text-center">
                        <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Separator />
                    <div className="grid gap-2 py-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">User ID</span>
                            <span className="font-mono text-xs">{user.id || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Full Name</span>
                            <span className="text-gray-700">{user.firstName + " " + user.lastName || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Account Status</span>

                            <span className="font-medium text-green-600">Active</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Gender</span>

                            <span className="font-medium text-gray-700">{user.gender || "-"}</span>
                        </div>


                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        variant="destructive"
                        className="w-full  gap-2"
                        onClick={logout}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ProfilePage;