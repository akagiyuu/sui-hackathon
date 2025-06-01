import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { LogOut, Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const TOKEN_KEY = 'token';

async function logout() {
    document.cookie = TOKEN_KEY + '=; Max-Age=-99999999;';
    location.reload();
}

export function Account() {
    const { data: account, status } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.auth.me(),
    });

    if (status === 'pending' || status === 'error')
        return (
            <Button
                className="h-9 px-4 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105 group"
                variant="ghost"
            >
                <Link to="/login">Login</Link>
            </Button>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer h-8 w-8 rounded-lg">
                    <AvatarFallback className="bg-red-400 font-bold rounded-full">
                        {account.name[0]}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="dark w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="hover:cursor-pointer h-8 w-8 rounded-lg">
                            <AvatarFallback className="bg-red-400 font-bold rounded-full">
                                {account.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {account.name}
                            </span>
                            <span className="text-muted-foreground truncate text-xs">
                                {account.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link className="flex flex-cols gap-5" to="/profile">
                            <User />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link className="flex flex-cols gap-5" to="/upload">
                            <Upload />
                            Upload new video
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <div className="flex flex-cols gap-5">
                        <LogOut />
                        Log out
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
