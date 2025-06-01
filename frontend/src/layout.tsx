import { Header } from '@/components/header';
import { Outlet } from 'react-router';
import { Toaster } from './components/ui/sonner';

export function MainLayout() {
    return (
        <div className="min-h-screen dark bg-neutral-950 text-white">
            <Header></Header>
            <main>
                <Outlet />
                <Toaster richColors />
            </main>
        </div>
    );
}
