import { Header } from '@/components/header';
import { Outlet } from 'react-router';

export function MainLayout() {
    return (
        <div>
            <Header></Header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
