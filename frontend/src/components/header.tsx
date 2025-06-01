import { Link } from 'react-router';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Bell, Search, Upload } from 'lucide-react';
import { Account } from './account';
import { useState } from 'react';

export function Header() {
    const [query, setQuery] = useState('');
    const onSearch = () => {
        window.location.replace(`/?query=${query}`);
    };

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
                                    className="peer pe-9 ps-9"
                                    placeholder="Search Videos..."
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') onSearch();
                                    }}
                                />
                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                    <Search
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>
                                <button
                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Submit search"
                                    onClick={onSearch}
                                >
                                    <ArrowRight
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <Link to="/upload">
                            <Button
                                variant="ghost"
                                className="h-9 px-4 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-300 hover:scale-105 group"
                            >
                                <Upload className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                Upload
                            </Button>
                        </Link>
                        <Bell className="w-5 h-5 hover:cursor-pointer" />
                        <Account />
                    </div>
                </div>
            </div>
        </header>
    );
}
