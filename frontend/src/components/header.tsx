import { Link } from 'react-router';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, User } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 sticky top-0 z-50 animate-slide-down">
            <div className="mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/">
                        <Logo />
                    </Link>

                    <div className="flex-1 max-w-2xl mx-8">
                        <div className="relative group">
                            <div className="relative">
                                <Input
                                    placeholder="Search videos, channels, or topics..."
                                    className="w-full h-10 pl-4 pr-12 bg-neutral-800 border-neutral-700 rounded-full text-white placeholder-neutral-400 focus:bg-neutral-750 focus:border-neutral-600 focus:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/5"
                                />
                                <Button
                                    size="sm"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full hover:scale-110 transition-all duration-300"
                                >
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Link to="/upload">
                            <Button
                                variant="ghost"
                                className="h-9 px-4 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105 group"
                            >
                                <Upload className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                Upload
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="h-9 w-9 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
                        >
                            <User className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
