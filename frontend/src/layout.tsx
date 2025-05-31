import { Header } from '@/components/header';
import { Outlet } from 'react-router';

export function MainLayout() {
    return (
        <div className="min-h-screen dark bg-neutral-950 text-white">
            <Header></Header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
